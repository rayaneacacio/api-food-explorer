const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class NotesRepository {
  async insert({ user_id, title, category, price, description }) {
    await knex("notes").insert({ user_id, title, category, price, description });
  }

  async getAllNotes({ user_id }) {
    const notes = await knex("notes").where({ user_id });
    return notes;
  }

  async findByTitle({ user_id, title }) {
    const note = await knex("notes").where({ user_id }).whereLike("title", `%${ title }%`).first();
    return note;
  }

  async findById({ user_id, id }) {
    const note = await knex("notes").where({ user_id, id }).first();
    return note;
  }

  async update({ note, newTitle, newCategory, newPrice, newDescription }){
    await knex("notes").update({ title: newTitle, category: newCategory, price: newPrice, description: newDescription }).where(note);
  }

  async updateImg({ user_id, title, note, imgFilename }) {
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imgFilename);

    note.image = filename;
    await knex("notes").update(note).where({ user_id, title });
  }

  async delete({ user_id, id }) {
    await knex("notes").where({ user_id, id }).delete();
  }
}

module.exports = NotesRepository;