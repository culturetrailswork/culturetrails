const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const pool = require("./db");

const app = express();

const PORT = process.env.PORT || 5000;

// -----------------------------------------
// Middleware
// -----------------------------------------

app.use(
  cors({
    origin:["https://culturetrail.in",
      "https://www.culturetrail.in",
       "http://localhost:5173",
    ],
    
  })
);

app.use(express.json());

// -----------------------------------------
// Email transporter
// -----------------------------------------

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// -----------------------------------------
// Test database connection
// -----------------------------------------

async function testDatabaseConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ MySQL database connected");

    connection.release();
  } catch (error) {
    console.error("❌ MySQL connection failed:");
    console.error(error.message);
  }
}

// -----------------------------------------
// Test email connection
// -----------------------------------------

async function testEmailConnection() {
  try {
    await transporter.verify();

    console.log("✅ Email server is ready");
  } catch (error) {
    console.error("❌ Email configuration error:");
    console.error(error.message);
  }
}

// -----------------------------------------
// Test route
// -----------------------------------------

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Culture Trails backend is running",
  });
});

// -----------------------------------------
// Enquiry route
// -----------------------------------------

app.post("/api/enquiries", async (req, res) => {
  console.log("📦 DATA RECEIVED FROM FRONTEND:");
  console.log(req.body);

  try {
    // -----------------------------------------
    // Get data from frontend
    // -----------------------------------------

    const {
      name,
      email,
      mobile,
      destination,
      travelDate,
      travellers,
      interests,
      message,
    } = req.body;

    // -----------------------------------------
    // Validate required fields
    // -----------------------------------------

    if (
      !name ||
      !email ||
      !mobile ||
      !destination ||
      !travelDate ||
      !travellers
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // -----------------------------------------
    // Format interests
    // -----------------------------------------

    let formattedInterests = "Not specified";

    if (Array.isArray(interests) && interests.length > 0) {
      formattedInterests = interests.join(", ");
    } else if (
      typeof interests === "string" &&
      interests.trim()
    ) {
      formattedInterests = interests.trim();
    }

    // -----------------------------------------
    // Clean / prepare values
    // -----------------------------------------

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMobile = mobile.trim();
    const cleanDestination = destination.trim();

    const cleanTravelDate = travelDate;

    const cleanTravellers = Number(travellers);

    const cleanMessage =
      typeof message === "string"
        ? message.trim()
        : "";

    // -----------------------------------------
    // Validate travellers
    // -----------------------------------------

    if (
      !Number.isInteger(cleanTravellers) ||
      cleanTravellers < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Number of travellers must be at least 1.",
      });
    }

    // -----------------------------------------
    // SAVE ENQUIRY TO MYSQL
    // -----------------------------------------

    const [result] = await pool.execute(
      `
        INSERT INTO enquiries
        (
          name,
          email,
          mobile,
          destination,
          travel_date,
          travellers,
          interests,
          message
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        cleanName,
        cleanEmail,
        cleanMobile,
        cleanDestination,
        cleanTravelDate,
        cleanTravellers,
        formattedInterests,
        cleanMessage || null,
      ]
    );

    // -----------------------------------------
    // Get newly created enquiry ID
    // -----------------------------------------

    const enquiryId = result.insertId;

    console.log(
      `✅ Enquiry #${enquiryId} saved to MySQL`
    );

    // -----------------------------------------
    // Email subject
    // -----------------------------------------

    const subject =
      `New Culture Trails Enquiry — ${cleanDestination}`;

    // -----------------------------------------
    // Send email
    // -----------------------------------------

  
try {
  await transporter.sendMail({
  from: {
    name: `New Enquiry — ${cleanName}`,
    address: process.env.EMAIL_USER,
  },

  to: process.env.ENQUIRY_RECEIVER,

  replyTo: {
    name: cleanName,
    address: cleanEmail,
  },

  subject: `New enquiry from ${cleanName} | ${cleanDestination}`,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 650px;
        margin: auto;
        color: #2f2a24;
      ">
        <div style="
          background: #2f2a24;
          color: white;
          padding: 30px;
        ">
          <h1 style="margin: 0;">Culture Trails</h1>
          <p style="margin-bottom: 0;">New Trail Enquiry</p>
        </div>

        <div style="padding: 30px;">
          <p><strong>Enquiry ID:</strong> #${enquiryId}</p>

          <hr />

          <h2>Traveller</h2>
          <p><strong>Name:</strong> ${cleanName}</p>
          <p><strong>Email:</strong> ${cleanEmail}</p>
          <p><strong>Mobile:</strong> ${cleanMobile}</p>

          <hr />

          <h2>Journey</h2>
          <p><strong>Destination:</strong> ${cleanDestination}</p>
          <p><strong>Travel Date:</strong> ${cleanTravelDate}</p>
          <p><strong>Travellers:</strong> ${cleanTravellers}</p>
          <p><strong>Interests:</strong> ${formattedInterests}</p>

          <hr />

          <h2>Message</h2>
          <p style="
            background: #f5f1e8;
            padding: 20px;
            line-height: 1.6;
          ">
            ${cleanMessage || "No additional message provided."}
          </p>

          <hr />

          <p style="font-size: 13px; color: #777;">
            This enquiry has been saved to the Culture Trails database.
          </p>
        </div>
      </div>
    `,

    text: `
NEW CULTURE TRAILS ENQUIRY

Enquiry ID: #${enquiryId}

TRAVELLER
Name: ${cleanName}
Email: ${cleanEmail}
Mobile: ${cleanMobile}

JOURNEY
Destination: ${cleanDestination}
Travel Date: ${cleanTravelDate}
Travellers: ${cleanTravellers}
Interests: ${formattedInterests}

MESSAGE
${cleanMessage || "No additional message provided."}

This enquiry has been saved to the Culture Trails database.
    `,
  });

  console.log(
    `📧 Enquiry #${enquiryId} email sent successfully`
  );

} catch (emailError) {
  console.error(
    `❌ Failed to send email for enquiry #${enquiryId}:`,
    emailError
  );

  throw emailError;
}

    // -----------------------------------------
    // Success response
    // -----------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Your enquiry has been sent successfully.",
      enquiryId,
      emailSent: true,
    });

  } catch (error) {

    // -----------------------------------------
    // Database / server error
    // -----------------------------------------

    console.error("❌ Enquiry submission error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message:
        "Unable to process your enquiry. Please try again.",
    });
  }
});

// -----------------------------------------
// Start server
// -----------------------------------------

app.listen(PORT, async () => {

  console.log(
    `🚀 Culture Trails backend running on port ${PORT}`
  );

  console.log(
    `http://localhost:${PORT}`
  );

  await testDatabaseConnection();

  await testEmailConnection();
});