const {Contact} = require('../../models/contact');

/**
 * Add a new contact to the database
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}} added contact
 */
const add = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
};

module.exports = add;
