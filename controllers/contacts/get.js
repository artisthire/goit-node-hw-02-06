const { HttpError } = require("../../utils");
const { Contact } = require("../../models/contact");

/**
 * Return a contact from the database by id
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} selected contact, or 'null' if contact is not found
 */
const get = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const contact = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({ path: "owner", select: "email subscription" });

  if (!contact) {
    throw new HttpError(404, "Not found");
  }

  res.json(contact);
};

module.exports = get;
