const https = require('https');
const fs = require('fs');

function download(url, dest) {
  https.get(url, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 303) {
      download(res.headers.location, dest);
    } else {
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded to', dest, 'Size:', fs.statSync(dest).size);
      });
    }
  }).on('error', (err) => {
    console.error('Error:', err);
  });
}

download('https://drive.google.com/uc?export=download&id=1hBpdobTGgekI5lVIS7Uf82QYEYoo0kPX', 'src/assets/anubhav_singh.jpg');
download('https://drive.google.com/uc?export=download&id=15OeeOpS-o-knj0lgSiKclDxg_UJVNSat', 'src/assets/prashant_yadav.jpg');
