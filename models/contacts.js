const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, './contacts.json');

/**
 * Return a list of all contacts from the database
 * @return {Array.<{id: String, name: String, email: String, phone: String}>} all contacts
 */
async function listContacts() {
  const contacts = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(contacts);
}

/**
 * Return a contact from the database by id
 * @param {string} contactId - contact's id
 * @return {{id: String, name: String, email: String, phone: String} | null} selected contact, or 'null' if contact is not found
 */
async function getContactById(contactId) {
  const contacts = await listContacts();
  const findedContact = contacts.find((contact) => contact.id === contactId);

  return findedContact || null;
}

/**
 * Remove a contact from the database by id
 * @param {string} contactId - contact's id
 * @return {{id: String, name: String, email: String, phone: String} | null} removed contact, or 'null' if contact is not found
 */
async function removeContact(contactId) {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [contact] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');

  return contact;
}

/**
 * Add a new contact to the database
 * @param {{name: String, email: String, phone: String}} body - object with contact's data
 * @return {{id: String, name: String, email: String, phone: String}} added contact
 */
async function addContact(body) {
  const contacts = await listContacts();
  const nextContactId = Number(contacts[contacts.length - 1].id) + 1;
  const newContact = {id: `${nextContactId}`, ...body};
  contacts.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}

/**
 * Update a contact in the database
 * @param {string} contactId - contact's id
 * @param {{name: String, email: String, phone: String}} body - object with contact's data
 * @return {{id: String, name: String, email: String, phone: String} | null} updated contact, or 'null' if contact is not found
 */
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const newContact = {...contacts[idx], ...body};
  contacts[idx] = newContact;

  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
