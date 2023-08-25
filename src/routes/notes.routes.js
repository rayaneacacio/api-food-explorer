const { Router } = require("express");
const multer = require("multer");

const NotesController = require("../controllers/notes-controller");
const FilesController = require("../controllers/notes.files-controller");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const uploadConfig = require("../configs/upload");

const notesRoutes = Router();
const notesController = new NotesController();
const filesController = new FilesController();
const upload = multer(uploadConfig.MULTER);

notesRoutes.post("/", ensureAuthenticated, notesController.create);
notesRoutes.get("/", notesController.index);
notesRoutes.post("/show", notesController.show);
notesRoutes.put("/", ensureAuthenticated, notesController.put);
notesRoutes.patch("/patch_image", ensureAuthenticated, upload.single("image"), filesController.patchImage);
notesRoutes.post("/delete", ensureAuthenticated, notesController.delete);

module.exports = notesRoutes;