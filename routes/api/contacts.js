const express = require('express');

const contactsController = require('../../controllers/contacts');
const {postScheme, putScheme} = require('../../schemas/contacts');
const validate = require('../../middlewares/validation');
const catchError = require('../../middlewares/controllersErrorCatcher');

const router = express.Router();

router.get('/', catchError(contactsController.getAllContacts));

router.get('/:contactId', catchError(contactsController.getContact));

router.post(
  '/',
  validate(postScheme, 'missing required name field'),
  catchError(contactsController.addContact)
);

router.delete('/:contactId', catchError(contactsController.removeContact));

router.put(
  '/:contactId',
  validate(putScheme, 'missing fields'),
  catchError(contactsController.updateContact)
);

module.exports = router;
