const puppeteer = require('puppeteer');
const XLSX = require('xlsx');
const nodemailer = require('nodemailer');
const fs = require('fs');

const workbook = XLSX.readFile('option1_job_links.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = XLSX.utils.sheet_to_json(sheet);

// 📧 Email function
async function sendEmail() {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'myneniyeswanthkumar@gmail.com',
        pass: 'sbwq fzjv mvco wdro'
      }
    });

    let attachments = [];

    // ✅ Attach only existing screenshots
    for (let i = 0; i < data.length; i++) {
      const filePath = `./screenshot_${i + 1}.png`;

      if (fs.existsSync(filePath)) {
        attachments.push({
          filename: `screenshot_${i + 1}.png`,
          path: filePath
        });
      }
    }

    let mailOptions = {
      from: 'myneniyeswanthkumar@gmail.com',
      to: 'myneniyeswanthkumar@gmail.com',
      subject: 'Job Screenshots',
      text: 'Attached are job screenshots',
      attachments: attachments
    };

    let info = await transporter.sendMail(mailOptions);

    console.log("📧 Email sent successfully!");
    console.log("Message ID:", info.messageId);

  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  for (let i = 0; i < data.length; i++) {
    const url = data[i].URL;

    // ✅ Skip empty rows
    if (!url) {
      console.log(`⚠️ Skipping empty row ${i}`);
      continue;
    }

    try {
      console.log(`Opening: ${url}`);

      await page.goto(url, {
        waitUntil: 'networkidle2',
        timeout: 15000
      });

      // ⏳ wait for page load
      await new Promise(resolve => setTimeout(resolve, 3000));

      await page.screenshot({
        path: `screenshot_${i + 1}.png`,
        fullPage: true
      });

      console.log(`✅ Screenshot taken for ${url}`);
    } catch (err) {
      console.log(`❌ Error for ${url}: ${err.message}`);
    }
  }

  await browser.close();

  // 📧 Send email after screenshots
  await sendEmail();
})();