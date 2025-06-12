const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to log IP on every visit
app.get('/', (req, res) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const userAgent = req.get('User-Agent');
  const log = `IP: ${ip} | Time: ${new Date().toISOString()} | User-Agent: ${userAgent}\n`;
  
  // Append to log file
  fs.appendFileSync('ip_log.txt', log);

  // Respond to user
  res.send(`<h1>Welcome!</h1><p>Your IP: ${ip}</p>`);
});

// Route to view logs
app.get('/logs', (req, res) => {
  const logs = fs.existsSync('ip_log.txt') ? fs.readFileSync('ip_log.txt', 'utf8') : 'No logs yet.';
  res.type('text').send(logs);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});