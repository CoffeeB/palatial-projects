import emailjs from 'emailjs-com';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, phoneNumber, message } = req.body;

    // Retrieve EmailJS keys from environment variables
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const userID = process.env.EMAILJS_USER_ID;

    try {
      // Send email via EmailJS API
      const response = await emailjs.send(
        serviceID,
        templateID,
        { fullName, email, phoneNumber, message },
        userID
      );

      res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, message: 'Error sending message' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
