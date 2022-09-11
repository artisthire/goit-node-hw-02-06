const express = require("express");

const { authController, usersController } = require("../../controllers");
const { joiUserSchemas } = require("../../models/user");
const {
  validateJoiSchema,
  controllerCatchErrors,
  authenticateUser,
  uploadFile,
} = require("../../middlewares");

const router = express.Router();

router.post(
  "/signup",
  validateJoiSchema(joiUserSchemas.add, "missing required fields"),
  controllerCatchErrors(authController.singup)
);

router.post(
  "/login",
  validateJoiSchema(joiUserSchemas.add, "missing required fields"),
  controllerCatchErrors(authController.login)
);

router.get(
  "/logout",
  authenticateUser,
  controllerCatchErrors(authController.logout)
);

router.get(
  "/current",
  authenticateUser,
  controllerCatchErrors(usersController.get)
);

router.get(
  "/verify/:verificationToken",
  controllerCatchErrors(authController.verifyEmail)
);

router.post(
  "/verify",
  validateJoiSchema(
    joiUserSchemas.verifyEmail,
    `missing required field 'email'`
  ),
  controllerCatchErrors(authController.reverifyEmail)
);

router.patch(
  "/",
  validateJoiSchema(
    joiUserSchemas.updateSubscription,
    `missing or wrong field 'subscription'`
  ),
  authenticateUser,
  controllerCatchErrors(usersController.updateSubscription)
);

router.patch(
  "/avatars",
  authenticateUser,
  uploadFile.single("avatar"),
  controllerCatchErrors(usersController.updateAvatar)
);

module.exports = router;
