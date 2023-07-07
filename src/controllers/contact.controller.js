const Contact = require("../models/contact.mongo");

const httpContactUs = async (req, res) => {
  const { fullName, email, phoneNo, message } = req.body;
  console.log(req.body);
  const newContact = new Contact({
    fullName,
    email,
    phoneNo,
    message,
  });

  newContact.save((err) => {
    if (err) {
      //   if (err.code === 11000) {
      //     // Duplicate key error (identifier field is not unique)
      //     return res.status(409).json({ error: 'Duplicate document' });
      //   }
      // Other error occurred
      return res.status(500).json({ error: "Failed to save document" });
    }
  });

  res.send({
    msg: "Contact query sent",
  });
};

module.exports = {
  httpContactUs,
};
