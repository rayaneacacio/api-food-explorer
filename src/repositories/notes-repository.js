const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class NotesRepository {
  async insert({ user_id, title, category, price, description }) {
    const note = await knex("notes").insert({ user_id, title, category, price, description }).returning("*");
    return note;
  }

  async getAllNotes() {
    const notes = await knex("notes");
    return notes;
  }

  async findByTitle({ title }) {
    const note = await knex("notes").whereLike("title", `%${ title }%`);
    return note;
  }

  async findById({ id }) {
    const note = await knex("notes").where({ id }).first();
    return note;
  }

  async update({ note, newTitle, newCategory, newPrice, newDescription }){
    await knex("notes").update({ title: newTitle, category: newCategory, price: newPrice, description: newDescription }).where(note);
  }

  async updateImg({ note, imgFilename }) {
    const diskStorage = new DiskStorage();
    const filename = await diskStorage.saveFile(imgFilename);

    note.image = filename;
    await knex("notes").update(note).where({ id: note.id });
  }

  async delete({ user_id, id }) {
    await knex("notes").where({ user_id, id }).delete();
  }
}

module.exports = NotesRepository;