const knex = require("../database/knex");

class NotesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { title, category, price, description } = request.body;
    
    await knex("notes").insert({ user_id, title, category, price, description });

    response.json();
  }

  async index(request, response) {
    const user_id = request.user.id;

    const notes = await knex("notes").where({ user_id });

    response.json(notes);
  }

  async show(request, response) {
    const user_id = request.user.id;
    const { title } = request.body;

    const note = await knex("notes").where({ user_id }).whereLike("title", `%${ title }%`);

    response.json(note);
  }

  async put(request, response) {
    const user_id = request.user.id;
    const { id, title, category, price, description } = request.body;

    const note = await knex("notes").where({ user_id, id });

    const newTitle = title ?? note.id;
    const newCategory = category ?? note.category;
    const newPrice = price ?? note.price;
    const newDescription = description ?? note.description;

    await knex("notes").update({ title: newTitle, category: newCategory, price: newPrice, description: newDescription }).where({ user_id, id });

    response.json();
  }

  async delete(request, response) {
    const user_id = request.user.id;
    const { id } = request.body;

    await knex("notes").where({ user_id, id }).delete();

    return response.json();
  }
}

module.exports = NotesController;