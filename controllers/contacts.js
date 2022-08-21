const {HttpError} = require('../utils/utils');
const {Contact} = require('../models/contact');

/**
 * Return a list of all contacts from the database
 * @param {object} res - Response's object
 * @return {Array.<{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}>} all contacts
 */
const getAllContacts = async (_, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

/**
 * Return a contact from the database by id
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} selected contact, or 'null' if contact is not found
 */
const getContact = async (req, res) => {
  const {contactId} = req.params;
  const contact = await Contact.findById(contactId);

  if (!contact) {
    throw new HttpError(404, 'Not found');
  }

  res.json(contact);
};

/**
 * Add a new contact to the database
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}} added contact
 */
const addContact = async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.status(201).json(contact);
};

/**
 * Remove a contact from the database by id
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} removed contact, or 'null' if contact is not found
 */
const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);

  if (!removedContact) {
    throw new HttpError(404, 'Not found');
  }

  res.json({message: 'contact deleted'});
};

/**
 * Update a contact in the database
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} updated contact, or 'null' if contact is not found
 */
const updateContact = async (req, res) => {
  const {contactId} = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!updatedContact) {
    throw new HttpError(404, 'Not found');
  }

  res.json(updatedContact);
};

/**
 * Update field favorite in contact in the database
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} updated contact, or 'null' if contact is not found
 */
const updateContactFavotiteStatus = async (req, res) => {
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

module.exports = {
  getAllContacts,
  getContact,
  addContact,
  removeContact,
  updateContact,
  updateContactFavotiteStatus,
};
