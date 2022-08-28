const { HttpError } = require("../../utils");
const { Contact } = require("../../models/contact");

/**
 * Remove a contact from the database by id
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} removed contact, or 'null' if contact is not found
 */
const remove = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const removedContact = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  });

  if (!removedContact) {
    throw new HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
};

module.exports = remove;
