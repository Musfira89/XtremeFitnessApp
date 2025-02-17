import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendRenewalEmail = async (email, name, planName, checkoutUrl) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Renew Your Fitness Coaching Plan for a Discount`,
    html: `
      <p>Dear ${name},</p>
      <p>We hope you’ve been enjoying your fitness coaching plan and making progress towards your fitness goals. We’re excited to offer you a one-time discounted rate to renew your ${planName} plan for another [length of time].</p>
      <p>With your renewal, you'll receive:</p>
      <ul>
        <li>Unlimited access to our online training library</li>
        <li>Personalized coaching sessions tailored to your fitness goals</li>
        <li>Weekly check-ins and progress tracking</li>
        <li>Supportive and motivational coaching</li>
      </ul>
      <p>Take advantage of this discounted rate and renew your plan today. Sign up now and get 10% off your plan. We’re excited to help you reach your goals and appreciate your dedication to staying healthy and fit.</p>
      <p><a href="${checkoutUrl}">Click here to renew now</a></p>
      <p>Thank you,</p>
      <p>Coach Xavier<br/>Xtreme Fitness Training</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Renewal email sent to ${email}`);
  } catch (error) {
    console.error('Error sending renewal email:', error);
  }
};
