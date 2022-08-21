const express = require('express');

const {contactsController} = require('../../controllers');
const {
  contactAddJoiSchema,
  updateFavoriteJoiSchema,
} = require('../../models/contact');
const validateJoiSchema = require('../../middlewares/validateJoiSchema');
const controllerCatchErrors = require('../../middlewares/controllerCatchErrors');

const router = express.Router();

router.get('/', controllerCatchErrors(contactsController.getAll));

router.get('/:contactId', controllerCatchErrors(contactsController.get));

router.post(
  '/',
  validateJoiSchema(contactAddJoiSchema, 'missing required name field'),
  controllerCatchErrors(contactsController.add)
);

router.delete('/:contactId', controllerCatchErrors(contactsController.remove));

router.put(
  '/:contactId',
  validateJoiSchema(contactAddJoiSchema, 'missing fields'),
  controllerCatchErrors(contactsController.update)
);

router.patch(
  '/:contactId/favorite',
  validateJoiSchema(updateFavoriteJoiSchema, 'missing field favorite'),
  controllerCatchErrors(contactsController.updateFavoriteStatus)
);

module.exports = router;
