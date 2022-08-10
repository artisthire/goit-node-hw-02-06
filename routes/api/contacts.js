const express = require('express');
const contactApi = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  const contacts = await contactApi.listContacts();
  res.json({status: 200, data: contacts});
});

router.get('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const contact = await contactApi.getContactById(contactId);

  if (!contact) {
    res.status(404).json({message: 'Not found'});
    return;
  }

  res.json({status: 200, data: contact});
});

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body;

  if (!name || !email || !phone) {
    res.status(400).json({message: 'missing required name field'});
    return;
  }

  const newContact = await contactApi.addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const removedContact = await contactApi.removeContact(contactId);

  if (!removedContact) {
    res.status(404).json({message: 'Not found'});
    return;
  }

  res.json({message: 'contact deleted'});
});

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
