const express = require('express');

const contactApi = require('../../models/contacts');
const validateContentFields = require('../../middlewares/contactFieldsValidation');
const catchDBQueryError = require('../../middlewares/dbCatchError');

const router = express.Router();

/**
 * It`s the route that sends a response with a list of all contacts from the database
 */
router.get(
  '/',
  catchDBQueryError(async () => await contactApi.listContacts()),
  (req, res) => {
    res.json({status: 200, data: req.dbQueryResult});
  }
);

/**
 * It`s the route that finds a contact by Id in the database and sends a response with a found contact
 */
router.get(
  '/:contactId',
  catchDBQueryError(async (req) => {
    const {contactId} = req.params;
    const contact = await contactApi.getContactById(contactId);
    return contact;
  }),
  (req, res) => {
    if (!req.dbQueryResult) {
      res.status(404).json({message: 'Not found'});
      return;
    }

    res.json({status: 200, data: req.dbQueryResult});
  }
);

/**
 * It`s the route that adds a new contact in the database and sends an added contact
 */
router.post(
  '/',
  validateContentFields,
  catchDBQueryError(async (req) => await contactApi.addContact(req.body)),
  (req, res) => {
    res.status(201).json(req.dbQueryResult);
  }
);

/**
 * It`s the route that removes a contact by Id in the database and sends a removed contact
 */
router.delete(
  '/:contactId',
  catchDBQueryError(async (req) => {
    const {contactId} = req.params;
    const removedContact = await contactApi.removeContact(contactId);
    return removedContact;
  }),
  (req, res) => {
    if (!req.dbQueryResult) {
      res.status(404).json({message: 'Not found'});
      return;
    }

    res.json({message: 'contact deleted'});
  }
);

/**
 * It`s the route that updates a contact by Id and new data in the database and sends an updated contact
 */
router.put(
  '/:contactId',
  validateContentFields,
  catchDBQueryError(async (req) => {
    const {contactId} = req.params;
    const updatedContact = await contactApi.updateContact(contactId, req.body);
    return updatedContact;
  }),
  (req, res) => {
    if (!req.dbQueryResult) {
      res.status(404).json({message: 'Not found'});
      return;
    }

    res.json(req.dbQueryResult);
  }
);

module.exports = router;
