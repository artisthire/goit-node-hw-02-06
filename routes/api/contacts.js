const express = require('express');

const contactsController = require('../../controllers/contacts');
const {
  contactAddJoiSchema,
  updateFavoriteJoiSchema,
} = require('../../models/contact');
const validate = require('../../middlewares/validation');
const catchError = require('../../middlewares/controllersErrorCatcher');

const router = express.Router();

router.get('/', catchError(contactsController.getAllContacts));

router.get('/:contactId', catchError(contactsController.getContact));

router.post(
  '/',
  validate(contactAddJoiSchema, 'missing required name field'),
  catchError(contactsController.addContact)
);

router.delete('/:contactId', catchError(contactsController.removeContact));

router.put(
  '/:contactId',
  validate(contactAddJoiSchema, 'missing fields'),
  catchError(contactsController.updateContact)
);

router.patch(
  '/:contactId/favorite',
  validate(updateFavoriteJoiSchema, 'missing field favorite'),
  catchError(contactsController.updateContactFavotiteStatus)
);

module.exports = router;
