const NotesRepository = require("../repositories/notes-repository");

class NotesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { title, category, price, description } = request.body;
    
    const notesRepository = new NotesRepository();
    const note = await notesRepository.insert({ user_id, title, category, price, description });

    response.json(note);
  }

  async index(request, response) {
    const notesRepository = new NotesRepository();
    const notes = await notesRepository.getAllNotes();

    response.json(notes);
  }

  async show(request, response) {
    const { title } = request.body;

    const notesRepository = new NotesRepository();
    const note = await notesRepository.findByTitle({ title });

    response.json(note);
  }

  async put(request, response) {
    const { id, title, category, price, description } = request.body;

    const notesRepository = new NotesRepository();
    const note = await notesRepository.findById({ id });

    const newTitle = title ?? note.title;
    const newCategory = category ?? note.category;
    const newPrice = price ?? note.price;
    const newDescription = description ?? note.description;

    await notesRepository.update({ note, newTitle, newCategory, newPrice, newDescription });

    response.json();
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { id } = request.body;

    const notesRepository = new NotesRepository();
    await notesRepository.delete({ user_id, id });

    return response.json();
  }
}

module.exports = NotesController;