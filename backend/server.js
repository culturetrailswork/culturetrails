
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const pool = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

// -----------------------------------------
// CORS CONFIGURATION
// -----------------------------------------

const allowedOrigins = [
  "https://culturetrail.in",
  "https://www.culturetrail.in",
  "http://localhost:5173",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests without an Origin header, such as
    // server-to-server requests and local health checks.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origin not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Parse JSON after CORS middleware.
app.use(express.json());

// -----------------------------------------
// EMAIL TRANSPORTER
// -----------------------------------------

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

// -----------------------------------------
// TEST DATABASE CONNECTION
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
// TEST EMAIL CONNECTION
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
// HEALTH CHECK
// -----------------------------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Culture Trails backend is running",
  });
});

// -----------------------------------------
// SUBMIT ENQUIRY
// -----------------------------------------

app.post("/api/enquiries", async (req, res) => {
  console.log("📦 Enquiry request received");

  try {
    const {
      name,
      email,
      mobile,
      destination,
      travelDate,
      travellers,
      interests,
      message,
    } = req.body || {};

    // ---------------------------------------
    // VALIDATE REQUIRED FIELDS
    // ---------------------------------------

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof email !== "string" ||
      !email.trim() ||
      typeof mobile !== "string" ||
      !mobile.trim() ||
      typeof destination !== "string" ||
      !destination.trim() ||
      !travelDate ||
      travellers === undefined ||
      travellers === null ||
      travellers === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // ---------------------------------------
    // CLEAN INPUTS
    // ---------------------------------------

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMobile = mobile.trim();
    const cleanDestination = destination.trim();
    const cleanTravelDate = travelDate;
    const cleanTravellers = Number(travellers);

    const cleanMessage =
      typeof message === "string" ? message.trim() : "";

    if (
      !Number.isInteger(cleanTravellers) ||
      cleanTravellers < 1 ||
      cleanTravellers > 50
    ) {
      return res.status(400).json({
        success: false,
        message: "Travellers must be between 1 and 50.",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    // ---------------------------------------
    // FORMAT INTERESTS
    // ---------------------------------------

    let formattedInterests = "Not specified";

    if (Array.isArray(interests) && interests.length > 0) {
      formattedInterests = interests
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean)
        .join(", ") || "Not specified";
    } else if (
      typeof interests === "string" &&
      interests.trim()
    ) {
      formattedInterests = interests.trim();
    }

    // ---------------------------------------
    // SAVE ENQUIRY TO MYSQL
    // ---------------------------------------

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

    const enquiryId = result.insertId;

    console.log(`✅ Enquiry #${enquiryId} saved to MySQL`);

    // ---------------------------------------
    // SEND NOTIFICATION EMAIL
    // ---------------------------------------

    const subject =
      `New Culture Trails Enquiry — ${cleanName} — ${cleanDestination}`;

    try {
      await transporter.sendMail({
        // Authenticated sender must remain EMAIL_USER.
        from: {
          name: `New Enquiry — ${cleanName}`,
          address: process.env.EMAIL_USER,
        },

        to: process.env.ENQUIRY_RECEIVER,

        // Replies go to the customer.
        replyTo: {
          name: cleanName,
          address: cleanEmail,
        },

        subject,

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
              <p><strong>Name:</strong> ${escapeHtml(cleanName)}</p>
              <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
              <p><strong>Mobile:</strong> ${escapeHtml(cleanMobile)}</p>

              <hr />

              <h2>Journey</h2>
              <p><strong>Destination:</strong> ${escapeHtml(cleanDestination)}</p>
              <p><strong>Travel Date:</strong> ${escapeHtml(String(cleanTravelDate))}</p>
              <p><strong>Travellers:</strong> ${cleanTravellers}</p>
              <p><strong>Interests:</strong> ${escapeHtml(formattedInterests)}</p>

              <hr />

              <h2>Message</h2>
              <p style="
                background: #f5f1e8;
                padding: 20px;
                line-height: 1.6;
                white-space: pre-wrap;
              ">${escapeHtml(cleanMessage || "No additional message provided.")}</p>

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

      console.log(`📧 Enquiry #${enquiryId} email sent successfully`);

      return res.status(200).json({
        success: true,
        message: "Your enquiry has been received successfully.",
        enquiryId,
        emailSent: true,
      });
    } catch (emailError) {
      // The enquiry is already stored, so don't lose it
      // or tell the customer that the database insert failed.
      console.error(
        `⚠️ Enquiry #${enquiryId} saved, but email failed:`,
        emailError.message
      );

      return res.status(200).json({
        success: true,
        message:
          "Your enquiry has been saved, but the notification email could not be sent.",
        enquiryId,
        emailSent: false,
      });
    }
  } catch (error) {
    console.error("❌ Enquiry submission error:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Unable to process your enquiry. Please try again.",
    });
  }
});

// -----------------------------------------
// CORS ERROR HANDLER
// -----------------------------------------

app.use((error, req, res, next) => {
  if (error.message === "Origin not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "This website origin is not allowed.",
    });
  }

  console.error("❌ Server error:", error);

  return res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

// -----------------------------------------
// HTML ESCAPING
// -----------------------------------------

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// -----------------------------------------
// START SERVER
// -----------------------------------------

app.listen(PORT, async () => {
  console.log(`🚀 Culture Trails backend running on port ${PORT}`);

  await testDatabaseConnection();
  await testEmailConnection();
});