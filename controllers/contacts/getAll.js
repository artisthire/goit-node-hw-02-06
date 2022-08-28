const {Contact} = require('../../models/contact');

/**
 * Return a list of all contacts from the database
 * @param {object} res - Response's object
 * @return {Array.<{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}>} all contacts
 */
const getAll = async (req, res) => {
  const {_id: userId} = req.user;
  const contacts = await Contact.find({owner: userId});
  res.json(contacts);
};

module.exports = getAll;
