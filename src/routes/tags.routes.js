const { Router } = require("express");

const TagsController = require("../controllers/tags-controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const tagsRoutes = Router();
const tagsController = new TagsController();

tagsRoutes.use(ensureAuthenticated);

tagsRoutes.post("/", tagsController.create);
tagsRoutes.post("/index", tagsController.index);
tagsRoutes.post("/show", tagsController.show);
tagsRoutes.post("/delete", tagsController.delete);

module.exports = tagsRoutes;