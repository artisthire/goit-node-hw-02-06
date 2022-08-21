const express = require('express');

const {contactsController} = require('../../controllers');
const {
  contactAddJoiSchema,
  updateFavoriteJoiSchema,
} = require('../../models/contact');
const {
  validateJoiSchema,
  controllerCatchErrors,
  validateIdParam,
} = require('../../middlewares');

const router = express.Router();
const idParamName = 'contactId';

router.get('/', controllerCatchErrors(contactsController.getAll));

router.get(
  `/:${idParamName}`,
  validateIdParam(idParamName),
  controllerCatchErrors(contactsController.get)
);

router.post(
  '/',
  validateJoiSchema(contactAddJoiSchema, 'missing required name field'),
  controllerCatchErrors(contactsController.add)
);

router.delete('/:contactId', controllerCatchErrors(contactsController.remove));

router.put(
  `/:${idParamName}`,
  validateIdParam(idParamName),
  validateJoiSchema(contactAddJoiSchema, 'missing fields'),
  controllerCatchErrors(contactsController.update)
);

router.patch(
  `/:${idParamName}/favorite`,
  validateIdParam(idParamName),
  validateJoiSchema(updateFavoriteJoiSchema, 'missing field favorite'),
  controllerCatchErrors(contactsController.updateFavoriteStatus)
);

module.exports = router;
