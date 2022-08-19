const {Contact} = require('../models/contact');

/**
 * Return a list of all contacts from the database
 * @return {Array.<{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}>} all contacts
 */
async function listContacts() {
  const contacts = await Contact.find();
  return contacts;
}

/**
 * Return a contact from the database by id
 * @param {string} contactId - contact's id
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} selected contact, or 'null' if contact is not found
 */
async function getContactById(contactId) {
  const contact = await Contact.findById(contactId);
  return contact;
}

/**
 * Remove a contact from the database by id
 * @param {string} contactId - contact's id
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} removed contact, or 'null' if contact is not found
 */
async function removeContact(contactId) {
  const contact = await Contact.findByIdAndRemove(contactId);
  return contact;
}

/**
 * Add a new contact to the database
 * @param {{name: String, email: String, phone: String, favorite: boolean}} body - object with contact's data
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean}} added contact
 */
async function addContact(body) {
  const contact = new Contact(body);
  contact.save();

  return contact;
}

/**
 * Update a contact in the database
 * @param {string} contactId - contact's id
 * @param {{name: String, email: String, phone: String, favorite: boolean}} body - object with contact's data
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} updated contact, or 'null' if contact is not found
 */
const updateContact = async (contactId, body) => {
  const contact = await Contact.findByIdAndUpdate(contactId, body, {new: true});
  return contact;
};

/**
 * Update field favorite in contact in the database
 * @param {string} contactId - contact's id
 * @param {{favorite: boolean}} body - object with the new status of field favorite
 * @return {{_id: ObjectId, name: String, email: String, phone: String, favorite: boolean} | null} updated contact, or 'null' if contact is not found
 */
const updateContactFavotiteStatus = async (contactId, {favorite}) => {
  const contact = await Contact.findByIdAndUpdate(
    contactId,
    {favorite},
    {new: true}
  );
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactFavotiteStatus,
};
