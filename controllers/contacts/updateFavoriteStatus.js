const {HttpError} = require('../../utils/utils');
const {Contact} = require('../../models/contact');

/**
 * Update field favorite in contact in the database
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} updated contact, or 'null' if contact is not found
 */
const updateFavoriteStatus = async (req, res) => {
  const {contactId} = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    {favorite: req.body.favorite},
    {new: true}
  );

  if (!updatedContact) {
    throw new HttpError(404, 'Not found');
  }

  res.json(updatedContact);
};

module.exports = updateFavoriteStatus;
