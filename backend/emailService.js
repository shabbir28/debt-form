import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Create transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send debt relief form submission email to owner
 * @param {Object} formData - The form submission data
 * @returns {Promise} - Resolves when email is sent
 */
export const sendFormSubmissionEmail = async (formData) => {
  const {
    fullName,
    email,
    phone,
    totalDebt,
    creditCardDebt,
    personalLoanDebt,
    otherDebt,
    employed,
    bankruptcy,
    monthlyIncome,
    state,
  } = formData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.OWNER_EMAIL,
    subject: "New Debt Relief Submission",
    html: `
      <h2>New Debt Relief Form Submission</h2>
      <hr>
      <h3>Contact Information</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>State:</strong> ${state}</p>
      
      <h3>Debt Information</h3>
      <p><strong>Total Unsecured Debt:</strong> $${totalDebt}</p>
      <p><strong>Credit Card Debt:</strong> $${creditCardDebt}</p>
      <p><strong>Personal Loan Debt:</strong> $${personalLoanDebt}</p>
      <p><strong>Other Debt:</strong> $${otherDebt}</p>
      
      <h3>Financial Status</h3>
      <p><strong>Employment Status:</strong> ${
        employed === "yes" ? "Yes" : "No"
      }</p>
      <p><strong>Bankruptcy in Last 7 Years:</strong> ${
        bankruptcy === "yes" ? "Yes" : "No"
      }</p>
      <p><strong>Monthly Income:</strong> $${monthlyIncome}</p>
      
      <hr>
      <p><em>Submitted on ${new Date().toLocaleString()}</em></p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
