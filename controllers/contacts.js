const {HttpError} = require('../utils/utils');
const contactApi = require('../services/contacts');

/**
 * Sends a response with a list of all contacts
 * @param {object} res - Response's object
 */
const getAllContacts = async (_, res) => {
  const contacts = await contactApi.listContacts();
  res.json(contacts);
};

/**
 * Sends a response with a contact by id
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 */
const getContact = async (req, res) => {
  const {contactId} = req.params;
  const contact = await contactApi.getContactById(contactId);

  if (!contact) {
    throw new HttpError(404, 'Not found');
  }

  res.json(contact);
};

/**
 * Adds a contact in the DB and sends a response with an added contact
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 */
const addContact = async (req, res) => {
  const contact = await contactApi.addContact(req.body);
  res.status(201).json(contact);
};

/**
 * Removes a contact by id in the DB and sends a response with a message that the contact was deleted
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 */
const removeContact = async (req, res) => {
  const {contactId} = req.params;
  const removedContact = await contactApi.removeContact(contactId);

  if (!removedContact) {
    throw new HttpError(404, 'Not found');
  }

  res.json({message: 'contact deleted'});
};

/**
 * Update a contact by id in the DB and sends a response with an updated contact
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 */
const updateContact = async (req, res) => {
  const {contactId} = req.params;
  const updatedContact = await contactApi.updateContact(contactId, req.body);

  if (!updatedContact) {
    throw new HttpError(404, 'Not found');
  }

  res.json(updatedContact);
};

/**
 * Update field favorite in contact in the database and sends a response with an updated contact
 * @param {object} req - Request's object
 * @param {object} res - Response's object
 */
const updateContactFavotiteStatus = async (req, res) => {
  const {contactId} = req.params;
  const updatedContact = await contactApi.updateContactFavotiteStatus(
    contactId,
    req.body
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
