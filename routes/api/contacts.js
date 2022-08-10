const express = require('express');
const contactApi = require('../../models/contacts');

const router = express.Router();

/**
 * It`s the route that sends a response with a list of all contacts from the database
 */
router.get('/', async (req, res, next) => {
  const contacts = await contactApi.listContacts();
  res.json({status: 200, data: contacts});
});

/**
 * It`s the route that finds a contact by Id in the database and sends a response with a found contact
 */
router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contact = await contactApi.getContactById(contactId);

  if (!contact) {
    res.status(404).json({message: 'Not found'});
    return;
  }

  res.json({status: 200, data: contact});
});

/**
 * It`s the route that adds a new contact in the database and sends an added contact
 */
router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({message: 'missing required name field'});
    return;
  }

  const newContact = await contactApi.addContact(req.body);
  res.status(201).json(newContact);
});

/**
 * It`s the route that removes a contact by Id in the database and sends a removed contact
 */
router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const removedContact = await contactApi.removeContact(contactId);

  if (!removedContact) {
    res.status(404).json({message: 'Not found'});
    return;
  }

  res.json({message: 'contact deleted'});
});

/**
 * It`s the route that updates a contact by Id and new data in the database and sends an updated contact
 */
router.put('/:contactId', async (req, res, next) => {
  if (!req.body) {
    res.status(400).json({message: 'missing fields'});
    return;
  }

  const {contactId} = req.params;
  const updatedContact = await contactApi.updateContact(contactId, req.body);
  console.log(updatedContact);

  if (!updatedContact) {
    res.status(404).json({message: 'Not found'});
    return;
  }

  res.json(updatedContact);
});

module.exports = router;
