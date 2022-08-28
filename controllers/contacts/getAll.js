const {Contact} = require('../../models/contact');

/**
 * Return a list of all contacts from the database
 * @param {object} res - Response's object
 * @return {Array.<{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}>} all contacts
 */
const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

module.exports = getAll;
