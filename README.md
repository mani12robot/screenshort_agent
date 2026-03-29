#screenshort_agent

 📸 Job Screenshot Agent

📌 Overview
This project is an automation tool that reads job URLs from an Excel file, opens each link using Puppeteer, takes full-page screenshots, and sends them via email.

---

 🚀 Features
- Read URLs from Excel file
- Open links automatically
- Take screenshots
- Handle errors without stopping
- Send screenshots via email

---

 🛠️ Tech Stack
- Node.js
- Puppeteer
- XLSX
- Nodemailer

---

 ⚙️ Setup

 1. Install dependencies
npm install puppeteer xlsx nodemailer

 2. Add Excel file
File name: option1_job_links.xlsx  
Column: URL

3. Run project
node index.js

---

📊 How It Works
1. Read URLs from Excel  
2. Open each URL in browser  
3. Take screenshot  
4. Save screenshot  
5. Send email with attachments  

---

⚠️ Notes
- Skips empty or invalid URLs  
- Logs errors and continues  
- Sends only available screenshots  

---

 📧 Email Setup
Use Gmail App Password (not normal password)

Example:
EMAIL_USER=your_email@gmail.com  
EMAIL_PASS=your_app_password  

---

 🎥 Demo Video
(Add your video link here)

---

## 👨‍💻 Author
Your Name
