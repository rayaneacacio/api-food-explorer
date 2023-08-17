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

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesController.create);
notesRoutes.get("/", notesController.index);
notesRoutes.post("/show", notesController.show);
notesRoutes.put("/", notesController.put);
notesRoutes.patch("/patch_image", upload.single("image"), filesController.patchImage);
notesRoutes.post("/delete", notesController.delete);

module.exports = notesRoutes;