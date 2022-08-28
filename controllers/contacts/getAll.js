const { Contact } = require("../../models/contact");

/**
 * Return a list of all contacts from the database
 * @param {object} res - Response's object
 * @return {Array.<{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}>} all contacts
 */
const getAll = async (req, res) => {
  const { _id: userId } = req.user;
  const { favorite, page = 1, limit = 10 } = req.query;
  const contactsLimit = Math.min(10, Number(limit));
  const contactsSkip = (page - 1) * limit;
  const findQuery = favorite ? { owner: userId, favorite } : { owner: userId };

  const contacts = await Contact.find(findQuery)
    .skip(contactsSkip)
    .limit(contactsLimit)
    .populate({
      path: "owner",
      select: "email subscription",
    });
  res.json(contacts);
};

module.exports = getAll;
