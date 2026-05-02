import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import cors from "cors";

let __filename: string;
let __dirname: string;

try {
  __filename = fileURLToPath(import.meta.url);
  __dirname = path.dirname(__filename);
} catch (e) {
  // In CJS, __filename and __dirname are already globally available
  // We use this fallback for the bundled output
  __filename = (global as any).__filename || "";
  __dirname = (global as any).__dirname || "";
}

const DATA_FILE = path.join(process.cwd(), "data.json");

// Helper for sending emails
function getEmailTemplate(title: string, content: string) {
  return `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 4px solid #000; overflow: hidden; background: #fff;">
      <div style="background: #001; padding: 40px 24px; text-align: center; border-bottom: 8px solid #ffda00;">
        <h1 style="color: #ffda00; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: 4px; text-transform: uppercase;">OUTTREACH</h1>
        <p style="color: #fff; font-size: 10px; letter-spacing: 2px; margin-top: 8px; opacity: 0.6; text-transform: uppercase;">Growth Acceleration System</p>
      </div>
      <div style="padding: 40px; background: #fff;">
        <div style="text-transform: uppercase; font-size: 12px; font-weight: bold; color: #ffda00; letter-spacing: 2px; margin-bottom: 8px;">System Alert</div>
        <h2 style="color: #000; margin: 0; font-size: 24px; font-weight: 900; line-height: 1.2;">${title}</h2>
        
        <div style="margin-top: 32px; font-size: 14px; line-height: 1.6; color: #333;">
          ${content}
        </div>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
          <a href="https://ais-dev-khgmqbw4bbq6ocmjyufxlq-742407896160.asia-southeast1.run.app" style="display:inline-block; background: #000; color: #fff; text-decoration: none; padding: 12px 24px; font-weight: bold; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Access Admin Panel</a>
        </div>
      </div>
      <div style="background: #000; padding: 24px; text-align: center; color: rgba(255,255,255,0.4); font-size: 10px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px;">
        This is an automated system notification. Silence Out. Spotlight In.
      </div>
    </div>
  `;
}

async function sendEmailNotification(subject: string, html: string) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RECEIVER_EMAIL } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("Email credentials missing (SMTP_USER/SMTP_PASS). Skipping email notification.");
    return;
  }

  const host = SMTP_HOST || "smtp.gmail.com";
  const port = parseInt(SMTP_PORT || "465");

  console.log(`System: Attempting to send email via ${host}:${port}...`);

  const transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: port === 465, // Use SSL for 465, STARTTLS for others
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Outtreach Intel" <${SMTP_USER}>`,
      to: RECEIVER_EMAIL || SMTP_USER,
      subject: subject,
      html: html,
    });
    console.log("Email sent successfully:", subject);
  } catch (error: any) {
    console.error("Critical Email Error:");
    console.error(`- Host: ${host}`);
    console.error(`- User: ${SMTP_USER}`);
    console.error(`- Error: ${error.message}`);
    
    if (error.code === 'EAI_AGAIN' || error.code === 'ENOTFOUND') {
      console.error("TIP: Your SMTP_HOST appears to be incorrect. For Gmail, use 'smtp.gmail.com'. Check your environment variables.");
    }
  }
}

// Initialize data file if it doesn't exist
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ requests: [], comments: [], bookings: [], insights: [] }, null, 2));
}

function getData() {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  if (!data.insights) data.insights = [];
  if (!data.reviews) data.reviews = [];
  return data;
}

function saveData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Trust the first proxy in Google Cloud Run to allow express-rate-limit to get the correct user IP
  app.set("trust proxy", 1);

  // Security Middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disabled for Vite Dev Server compatibility
  }));
  app.use(cors());

  // Rate Limiting
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true, 
    legacyHeaders: false, 
  });
  
  const formLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Limit each IP to 10 form submissions per hour
    message: "Too many form submissions. Please try again later.",
  });

  app.use(express.json({ limit: '10kb' })); // Limit JSON footprint to prevent DOS

  // API Routes
  app.use("/api/", apiLimiter);

  app.get("/api/data", (req, res) => {
    const passcode = req.query.passcode;
    const data = getData();
    
    // Allow website to see public content without full admin access
    if (passcode === "public") {
      return res.json({ requests: [], comments: data.comments, insights: data.insights, reviews: data.reviews });
    }

    if (passcode !== "Outtreachversion7791@rise11") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    res.json(data);
  });

  app.post("/api/bookings", formLimiter, async (req, res) => {
    const data = getData();
    const { name, businessName, phone, email, brandDescription, problem } = req.body;
    
    if (!name || !email || !businessName || !phone) {
       return res.status(400).json({ error: "Missing required fields" });
    }

    const newBooking = {
      id: Date.now().toString(),
      type: 'booking',
      name: String(name).slice(0, 100),
      businessName: String(businessName).slice(0, 100),
      phone: String(phone).slice(0, 20),
      email: String(email).slice(0, 100),
      brandDescription: String(brandDescription).slice(0, 1000),
      problem: String(problem).slice(0, 1000),
      createdAt: new Date().toISOString()
    };
    if (!data.bookings) data.bookings = [];
    data.bookings.push(newBooking);
    saveData(data);
    
    // Send email notification
    const emailHtml = getEmailTemplate(
      "High-Intent 1:1 Booking Request",
      `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 140px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Name</div>
          <div style="color: #555;">${newBooking.name}</div>
        </div>
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 140px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Business Name</div>
          <div style="color: #000; font-weight: bold;">${newBooking.businessName}</div>
        </div>
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 140px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Phone</div>
          <div style="color: #555;">${newBooking.phone}</div>
        </div>
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 140px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Email</div>
          <div style="color: #555;">${newBooking.email}</div>
        </div>
      </div>
      
      <div style="background: #fcfcfc; padding: 24px; border-left: 4px solid #ffda00; margin-bottom: 16px;">
        <div style="font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px; margin-bottom: 12px;">Brand Description</div>
        <div style="color: #333;">${newBooking.brandDescription}</div>
      </div>

      <div style="background: #fff0f0; padding: 24px; border-left: 4px solid #ff0000;">
        <div style="font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px; margin-bottom: 12px;">Core Problem/Pain Point</div>
        <div style="color: #333;">${newBooking.problem}</div>
      </div>
      
      <div style="margin-top: 32px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
        Received at: ${new Date(newBooking.createdAt).toLocaleString()}
      </div>
      `
    );

    await sendEmailNotification(
      `BOOKING: 1:1 Call with ${newBooking.name} (${newBooking.businessName})`,
      emailHtml
    );
    
    res.status(201).json(newBooking);
  });

  app.post("/api/requests", formLimiter, async (req, res) => {
    const data = getData();
    const { fullName, email, brand, goals } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newRequest = {
      id: Date.now().toString(),
      fullName: String(fullName).slice(0, 100),
      email: String(email).slice(0, 100),
      brand: String(brand).slice(0, 100),
      goals: String(goals).slice(0, 1000),
      createdAt: new Date().toISOString()
    };
    data.requests.push(newRequest);
    saveData(data);
    
    // Send email notification
    const emailHtml = getEmailTemplate(
      "Direct Lead Manifested",
      `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 100px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Client Name</div>
          <div style="color: #555;">${newRequest.fullName}</div>
        </div>
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 100px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Email</div>
          <div style="color: #000; font-weight: bold;">${newRequest.email}</div>
        </div>
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 100px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Brand</div>
          <div style="color: #555;">${newRequest.brand}</div>
        </div>
      </div>
      
      <div style="background: #fcfcfc; padding: 24px; border-left: 4px solid #ffda00;">
        <div style="font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px; margin-bottom: 12px;">Growth Objectives</div>
        <div style="color: #333; font-style: italic;">"${newRequest.goals}"</div>
      </div>
      
      <div style="margin-top: 32px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
        Received at: ${new Date(newRequest.createdAt).toLocaleString()}
      </div>
      `
    );

    await sendEmailNotification(
      `LEAD: ${newRequest.fullName} (${newRequest.brand})`,
      emailHtml
    );
    
    res.status(201).json(newRequest);
  });

  app.post("/api/comments", apiLimiter, async (req, res) => {
    const data = getData();
    const { postId, name, text, date } = req.body;
    
    if (!postId || !name || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = {
      id: Date.now().toString(),
      postId: String(postId).slice(0, 50),
      name: String(name).slice(0, 100),
      text: String(text).slice(0, 500),
      date: String(date).slice(0, 50),
      createdAt: new Date().toISOString()
    };
    data.comments.push(newComment);
    saveData(data);

    // Send email notification
    const emailHtml = getEmailTemplate(
      "Social Interaction Logged",
      `
      <div style="margin-bottom: 24px;">
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 100px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">User</div>
          <div style="color: #555;">${newComment.name}</div>
        </div>
        <div style="display: flex; margin-bottom: 8px;">
          <div style="width: 100px; font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px;">Insight Page</div>
          <div style="color: #000; font-weight: bold; text-transform: uppercase;">${newComment.postId}</div>
        </div>
      </div>
      
      <div style="background: #fcfcfc; padding: 24px; border-left: 4px solid #000;">
        <div style="font-weight: 800; color: #000; text-transform: uppercase; font-size: 11px; margin-bottom: 12px;">Comment Content</div>
        <div style="color: #333;">${newComment.text}</div>
      </div>
      
      <div style="margin-top: 32px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">
        Timestamp: ${newComment.date}
      </div>
      `
    );

    await sendEmailNotification(
      `ENGAGEMENT: New comment on ${newComment.postId.toUpperCase()} Page`,
      emailHtml
    );

    res.status(201).json(newComment);
  });

  app.post("/api/insights", async (req, res) => {
    const passcode = req.query.passcode;
    if (passcode !== "Outtreachversion7791@rise11") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const data = getData();
    const newInsight = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    data.insights.push(newInsight);
    saveData(data);
    res.status(201).json(newInsight);
  });

  app.post("/api/reviews", async (req, res) => {
    const data = getData();
    const newReview = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    data.reviews.push(newReview);
    saveData(data);
    res.status(201).json(newReview);
  });

  app.delete("/api/data/:type/:id", (req, res) => {
    const { type, id } = req.params;
    const passcode = req.query.passcode;
    if (passcode !== "Outtreachversion7791@rise11") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const data = getData();
    if (["requests", "comments", "bookings", "insights", "reviews"].includes(type)) {
      data[type] = data[type].filter((item: any) => item.id !== id);
      saveData(data);
      res.json({ success: true });
    } else {
      res.status(400).json({ error: "Invalid type" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
