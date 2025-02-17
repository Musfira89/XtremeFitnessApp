const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
  });
  
  export const sendRenewalEmail = async (email, name, planName, checkoutUrl) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
      subject: "Exclusive Renewal Discount - 10% Off Your Next Plan!",
      html: `
        <p>Hi ${name},</p>
        <p>Your ${planName} plan is expiring soon! Renew now and get <b>10% off</b> your next cycle.</p>
        <p><a href="${checkoutUrl}">Click here to renew now</a></p>
        <p>Don't miss this limited-time offer!</p>
      `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Renewal email sent to ${email}`);
    } catch (error) {
      console.error("Error sending renewal email:", error);
    }
  };
  