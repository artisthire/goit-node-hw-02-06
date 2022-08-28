const express = require("express");

const { contactsController } = require("../../controllers");
const { joiContactSchemas } = require("../../models/contact");
const {
  validateJoiSchema,
  controllerCatchErrors,
  validateIdParam,
  authenticateUser,
} = require("../../middlewares");

const router = express.Router();
const idName = "contactId";

router.use(authenticateUser);

router.get("/", controllerCatchErrors(contactsController.getAll));

router.get(
  `/:${idName}`,
  validateIdParam(idName),
  controllerCatchErrors(contactsController.get)
);

router.post(
  "/",
  validateJoiSchema(
    joiContactSchemas.contactAdd,
    "missing required name field"
  ),
  controllerCatchErrors(contactsController.add)
);

router.delete("/:contactId", controllerCatchErrors(contactsController.remove));

router.put(
  `/:${idName}`,
  validateIdParam(idName),
  validateJoiSchema(joiContactSchemas.contactAdd, "missing fields"),
  controllerCatchErrors(contactsController.update)
);

router.patch(
  `/:${idName}/favorite`,
  validateIdParam(idName),
  validateJoiSchema(joiContactSchemas.updateFavorite, "wrong field favorite"),
  controllerCatchErrors(contactsController.updateFavoriteStatus)
);

module.exports = router;
