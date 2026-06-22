const Contact = require("../models/Contact");

const sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message Sent Successfully"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Server Error"
    });

  }
};

module.exports = { sendMessage };