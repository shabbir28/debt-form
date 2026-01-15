# Debt Relief Landing Page

A single-page React application with Node.js backend for debt relief qualification form submissions.

## Features

- **Hero Section**: Eye-catching landing with CTA button
- **Comprehensive Form**: All required debt and financial information fields
- **Client-Side Validation**: Real-time form validation
- **Email Notifications**: Automatic email to site owner with form submissions
- **Modern Design**: Premium fintech styling with gradients and animations
- **Mobile Responsive**: Works perfectly on all devices

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **Email**: Nodemailer
- **Styling**: CSS with modern fintech design

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies (already done):

   ```bash
   npm install
   ```

3. Configure environment variables in `.env`:

   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   OWNER_EMAIL=owner-email@example.com
   PORT=5000
   ```

   **Important**: For Gmail, you need to:

   - Enable 2-factor authentication
   - Generate an App Password (not your regular password)
   - Use the App Password in EMAIL_PASS

4. Start the backend server:

   ```bash
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies (if needed):

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   Frontend will run on `http://localhost:5173`

## Usage

1. Start both backend and frontend servers
2. Open browser to `http://localhost:5173`
3. Click "Check My Eligibility" to scroll to the form
4. Fill out all required fields
5. Submit the form
6. Check the owner email for the submission

## Form Fields

- Full Name (required)
- Email Address (required)
- Phone Number (required)
- Total Unsecured Debt (required)
- Credit Card Debt (required)
- Personal Loan Debt (required)
- Other Debt (required)
- Employment Status (required)
- Bankruptcy Status (required)
- Monthly Income (required)
- State/Location (required)
- Terms Agreement (required)

## Deployment

### Backend (Hostinger or similar)

1. Upload backend files to your server
2. Set environment variables in hosting panel
3. Install dependencies: `npm install`
4. Start server: `npm start` or use PM2 for production

### Frontend

1. Build the production version:
   ```bash
   npm run build
   ```
2. Upload the `dist` folder contents to your web hosting
3. Configure your web server to serve the static files

## Email Configuration

The application uses Nodemailer with Gmail SMTP. You can also configure it for other SMTP services by modifying `emailService.js`:

```javascript
const transporter = nodemailer.createTransport({
  host: "smtp.your-provider.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

## License

MIT
