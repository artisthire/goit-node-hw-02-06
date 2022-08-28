const express = require('express');

const {authController, usersController} = require('../../controllers');
const {joiUserSchemas} = require('../../models/user');
const {
  validateJoiSchema,
  controllerCatchErrors,
  authenticateUser,
} = require('../../middlewares');

const router = express.Router();

router.post(
  '/signup',
  validateJoiSchema(joiUserSchemas.userAdd, 'missing required fields'),
  controllerCatchErrors(authController.singup)
);

router.post(
  '/login',
  validateJoiSchema(joiUserSchemas.userAdd, 'missing required fields'),
  controllerCatchErrors(authController.login)
);

router.get(
  '/logout',
  authenticateUser,
  controllerCatchErrors(authController.logout)
);

router.get(
  '/current',
  authenticateUser,
  controllerCatchErrors(usersController.get)
);

module.exports = router;
