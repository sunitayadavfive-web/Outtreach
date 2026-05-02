import React, { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const PageTemplate = ({ title, children, onBack }: { title: string, children: React.ReactNode, onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white min-h-screen text-text-black font-sans"
    >
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-black/5 py-4 px-[5%] flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-2 font-bold uppercase text-sm hover:translate-x-[-4px] transition-transform">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
        <div className="bg-accent-yellow px-4 py-1 text-xl font-display font-bold uppercase">OUTTREACH</div>
      </header>

      <main className="pt-32 pb-24 px-[5%] max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-display mb-12">{title}</h1>
        <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-a:text-accent-yellow">
          {children}
        </div>
      </main>
    </motion.div>
  );
};

export const PrivacyPolicyPage = ({ onBack }: { onBack: () => void }) => (
  <PageTemplate title="Privacy Policy" onBack={onBack}>
    <p>At Outtreach, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard any information you provide while using our website.</p>
    
    <h3>Information We Collect</h3>
    <p>We may collect personal details such as your name, email address, phone number, business information, or any details you voluntarily submit through contact forms, inquiries, or service requests.</p>
    
    <h3>How We Use Your Information</h3>
    <p>We use the information collected to:</p>
    <ul>
      <li>Respond to your inquiries and provide support</li>
      <li>Deliver our services effectively</li>
      <li>Improve our website, content, and user experience</li>
      <li>Send important updates regarding our services</li>
      <li>Communicate offers or relevant business information (only when appropriate)</li>
    </ul>

    <h3>Data Protection</h3>
    <p>We take reasonable security measures to protect your personal information from unauthorized access, misuse, or disclosure. However, no online transmission or storage system can be guaranteed 100% secure.</p>

    <h3>Cookies & Analytics</h3>
    <p>Our website may use cookies or analytics tools to understand visitor behavior, improve performance, and enhance user experience.</p>

    <h3>Third-Party Services</h3>
    <p>We may use trusted third-party tools or platforms for hosting, analytics, forms, or communication. These providers may process data according to their own privacy policies.</p>

    <h3>Your Rights</h3>
    <p>You may request access, correction, or deletion of your personal information by contacting us.</p>

    <h3>Consent</h3>
    <p>By using this website, you consent to this Privacy Policy.</p>

    <h3>Contact Us</h3>
    <p>If you have any questions, concerns, or issues regarding your privacy, please contact us at: <strong>outtreachgrowth@gmail.com</strong></p>
  </PageTemplate>
);

export const DisclaimerPage = ({ onBack }: { onBack: () => void }) => (
  <PageTemplate title="Disclaimer" onBack={onBack}>
    <p>The information provided on this website by Outtreach is for general informational and business purposes only. While we strive to keep all content accurate, updated, and reliable, we make no guarantees of any kind regarding the completeness, accuracy, suitability, or availability of the information, services, or results mentioned on this website.</p>
    <p>Any action you take based on the information found on this website is strictly at your own discretion and risk. Outtreach will not be liable for any losses, damages, or business interruptions arising from the use of this website or our services.</p>
    <p>Our website may contain links to third-party websites or tools for convenience and reference. We do not control or take responsibility for the content, policies, or practices of any external websites.</p>
    <p>All branding, logos, designs, and content on this website are the intellectual property of Outtreach unless otherwise stated. Unauthorized use, reproduction, or distribution is prohibited.</p>
    <p>If you experience any issues, have concerns, or need assistance, please contact us at: <strong>outtreachgrowth@gmail.com</strong></p>
  </PageTemplate>
);

export const RefundPolicyPage = ({ onBack }: { onBack: () => void }) => (
  <PageTemplate title="Refund Policy" onBack={onBack}>
    <p>Due to the time, planning, strategy, digital work, and resource allocation involved in service delivery, payments are generally non-refundable once work has started.</p>
    <p>Refunds, credits, or partial adjustments may be considered only at our sole discretion in exceptional circumstances or where specifically agreed in writing.</p>
    <p>No refunds apply for:</p>
    <ul>
      <li>Change of mind</li>
      <li>Delayed client responses</li>
      <li>Client not using delivered work</li>
      <li>Results not matching unrealistic expectations</li>
      <li>Paused campaigns caused by client issues</li>
    </ul>
    <p>If you have any questions, please contact us at: <strong>outtreachgrowth@gmail.com</strong></p>
  </PageTemplate>
);

export const TermsAndConditionsPage = ({ onBack }: { onBack: () => void }) => (
  <PageTemplate title="Terms & Conditions" onBack={onBack}>
    <p>Welcome to Outtreach. These Terms & Conditions govern your use of our website, services, content, and any communication made with our team. By accessing this website or purchasing, requesting, or using any service provided by Outtreach, you agree to comply with and be bound by these Terms & Conditions. If you do not agree with any part of these terms, please discontinue use of our website and services.</p>

    <h3>1. About Our Services</h3>
    <p>Outtreach provides branding, digital marketing, content strategy, social media management, creator support, editing, advertising assistance, design, consulting, and related growth services. The scope of each service may vary depending on the package selected, written proposal, project brief, or custom agreement made between Outtreach and the client.</p>
    <p>We reserve the right to modify, improve, suspend, or discontinue any service at any time without prior notice.</p>

    <h3>2. Acceptance of Terms</h3>
    <p>By using this website, contacting us, submitting an inquiry, requesting a quotation, making payment, or engaging our services, you confirm that you have read, understood, and accepted these Terms & Conditions.</p>
    <p>If you are acting on behalf of a business, agency, or organization, you confirm that you have authority to bind that entity to these terms.</p>

    <h3>3. Client Responsibilities</h3>
    <p>To provide quality service efficiently, clients agree to:</p>
    <ul>
      <li>Provide accurate business information, requirements, and goals</li>
      <li>Share required files, brand assets, passwords, or access credentials when necessary</li>
      <li>Respond to requests, revisions, and approvals in a timely manner</li>
      <li>Ensure any materials supplied do not infringe copyright or violate laws</li>
      <li>Maintain respectful and professional communication</li>
    </ul>
    <p>Delays caused by missing information, slow responses, or incomplete approvals may affect delivery timelines.</p>

    <h3>4. No Guaranteed Results</h3>
    <p>While Outtreach uses professional strategies, tools, and best practices, we do not guarantee specific outcomes including but not limited to:</p>
    <ul>
      <li>Number of followers</li>
      <li>Virality of content</li>
      <li>Specific revenue targets</li>
      <li>Search engine rankings</li>
      <li>Leads or sales volume</li>
      <li>Engagement metrics</li>
      <li>Partnership deals</li>
      <li>Business growth timelines</li>
    </ul>
    <p>Marketing results depend on multiple external factors such as competition, pricing, market demand, product quality, budget, timing, customer behavior, platform algorithm changes, and client responsiveness.</p>
    <p>Any past case studies, examples, or projections are illustrative only and not promises of future results.</p>

    <h3>5. Payments & Billing</h3>
    <p>All fees, retainers, subscriptions, project costs, or custom pricing will be communicated before work begins.</p>
    <p>Unless otherwise agreed in writing:</p>
    <ul>
      <li>Payments must be made in advance or according to invoice terms</li>
      <li>Late payments may delay, pause, or cancel services</li>
      <li>Recurring services renew based on the agreed billing cycle</li>
      <li>Transaction charges, taxes, gateway fees, or currency conversion charges may apply depending on platform or region</li>
    </ul>
    <p>Outtreach reserves the right to revise pricing for future services with notice.</p>

    <h3>6. Refund Policy</h3>
    <p>Due to the time, planning, strategy, digital work, and resource allocation involved in service delivery, payments are generally non-refundable once work has started.</p>
    <p>Refunds, credits, or partial adjustments may be considered only at our sole discretion in exceptional circumstances or where specifically agreed in writing.</p>
    <p>No refunds apply for change of mind, delayed client responses, unused delivered work, results not matching unrealistic expectations, or paused campaigns caused by client issues.</p>

    <h3>7. Revisions & Approvals</h3>
    <p>Where revisions are included, reasonable changes may be requested within the agreed scope. Excessive revisions, repeated changes in direction, or requests beyond the original brief may incur additional charges.</p>
    <p>Once content, designs, campaigns, or deliverables are approved by the client, Outtreach is not responsible for issues later discovered after approval.</p>

    <h3>8. Timelines & Delivery</h3>
    <p>Estimated timelines are provided in good faith but may vary depending on project complexity, client responsiveness, platform delays, holidays, technical issues, or force majeure events.</p>
    <p>Outtreach is not liable for delays caused by third-party tools, hosting providers, social media platforms, ad account reviews, payment processors, or client-side delays.</p>

    <h3>9. Intellectual Property</h3>
    <p>Unless otherwise agreed:</p>
    <ul>
      <li>Outtreach retains ownership of internal systems, templates, processes, methods, drafts, and proprietary strategies</li>
      <li>Final paid deliverables intended for client use may be licensed or transferred upon full payment</li>
      <li>Unpaid work remains the property of Outtreach</li>
    </ul>
    <p>Clients confirm they own or have permission to use any logos, images, music, videos, trademarks, or assets supplied to us. We are not responsible for claims arising from materials provided by clients.</p>

    <h3>10. Use of Website Content</h3>
    <p>All content on this website including text, branding, visuals, graphics, layouts, logos, strategy frameworks, downloadable resources, and materials are protected by intellectual property laws.</p>
    <p>You may not copy, reproduce, republish, scrape, distribute, or commercially exploit any content without prior written permission from Outtreach.</p>

    <h3>11. Third-Party Platforms</h3>
    <p>Many services may involve third-party platforms such as Instagram, Facebook, YouTube, LinkedIn, Google, Canva, Meta Ads, hosting tools, analytics tools, payment processors, or communication software.</p>
    <p>Outtreach does not own or control these platforms and is not responsible for platform outages, policy changes, suspensions, bans, account restrictions, algorithm changes, feature removals, or payment gateway issues.</p>
    <p>Clients remain responsible for complying with platform rules.</p>

    <h3>12. Account Access & Security</h3>
    <p>If account access is required, clients should provide access securely through official methods whenever possible.</p>
    <p>Clients are responsible for maintaining password security, admin permissions, backups, and access control. We recommend changing passwords after project completion where relevant.</p>
    <p>Outtreach is not liable for breaches caused by weak client security practices, phishing, reused passwords, or unauthorized third-party access.</p>

    <h3>13. Limitation of Liability</h3>
    <p>To the fullest extent permitted by law, Outtreach shall not be liable for any indirect, incidental, special, consequential, punitive, or business losses including but not limited to:</p>
    <ul>
      <li>Lost revenue, profits, or opportunities</li>
      <li>Reputation loss</li>
      <li>Data loss</li>
      <li>Campaign underperformance</li>
      <li>Business interruption</li>
    </ul>
    <p>Our total liability for any claim shall not exceed the amount paid by the client for the specific service giving rise to the claim.</p>

    <h3>14. Indemnification</h3>
    <p>You agree to indemnify and hold harmless Outtreach, its owners, team members, contractors, and affiliates from claims, damages, liabilities, costs, or expenses arising from materials you provided, misleading claims in your business, legal violations by your business, unauthorized use of third-party content, or breach of these Terms & Conditions.</p>

    <h3>15. Right to Refuse or Terminate Service</h3>
    <p>Outtreach reserves the right to decline, suspend, or terminate services at any time where there is non-payment, fraud risk, harassment or abusive conduct, illegal or unethical requests, repeated scope abuse, misuse of our work, reputational risk, or breach of agreed terms.</p>

    <h3>16. Confidentiality</h3>
    <p>We value client confidentiality and will make reasonable efforts to protect non-public information shared with us. However, clients should avoid sending highly sensitive credentials or regulated information through insecure channels unless necessary.</p>

    <h3>17. Communication</h3>
    <p>Official communication may occur through email, website forms, messaging platforms, or agreed channels. Clients are responsible for monitoring messages and responding where action is required. Missed communication may impact timelines or campaign performance.</p>

    <h3>18. Testimonials & Portfolio Rights</h3>
    <p>Unless explicitly restricted in writing, Outtreach may reference completed public work, non-confidential deliverables, or client names/logos for portfolio, marketing, or case study purposes.</p>

    <h3>19. Force Majeure</h3>
    <p>Outtreach shall not be responsible for delays or failure caused by events beyond reasonable control including natural disasters, power failures, internet outages, war, strikes, epidemics, government actions, or major platform disruptions.</p>

    <h3>20. Changes to Terms</h3>
    <p>We may update these Terms & Conditions at any time. Updated versions become effective when published on the website. Continued use of our website or services after updates indicates acceptance of the revised terms.</p>

    <h3>21. Governing Principles</h3>
    <p>These Terms shall be interpreted in accordance with applicable laws. If any section is found unenforceable, the remaining sections shall remain in effect.</p>

    <h3>22. Contact Us</h3>
    <p>For questions, support, concerns, or legal notices, please contact:</p>
    <p>
      <strong>Outtreach</strong><br />
      📩 outtreachgrowth@gmail.com
    </p>

    <p>By using our website or services, you acknowledge that you have read, understood, and agreed to these Terms & Conditions.</p>
  </PageTemplate>
);
