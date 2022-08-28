const { HttpError } = require("../../utils");
const { Contact } = require("../../models/contact");

/**
 * Update a contact in the database
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} updated contact, or 'null' if contact is not found
 */
const update = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: userId },
    req.body,
    {
      new: true,
    }
  ).populate({ path: "owner", select: "email subscription" });

  if (!updatedContact) {
    throw new HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

module.exports = update;
