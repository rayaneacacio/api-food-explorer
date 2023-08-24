const knex = require("../database/knex");

class TagsRepository {
  async insert({ user_id, note_id, tags }) {
    const tagsInsert = tags.map(tag => {
      return {
        user_id,
        note_id,
        title: tag
      }
    })

    await knex("tags").insert(tagsInsert);
  }

  async getAllTags({ note_id }) {
    const tags = await knex("tags").where({ note_id });
    return tags;
  }

  async findByTitle({ title }) {
    const tags = await knex("tags").whereLike("title", `%${ title }%`);

    const uniqueNotes = [];

    await Promise.all(tags.map(async(tag) => {
      const note = await knex("notes").where({ id: tag.note_id });
      if(!uniqueNotes[tag.note_id]) {
        uniqueNotes[tag.note_id] = note;
      }

    }));

    const response = Object.values(uniqueNotes);

    const notes = response.map(note => {
      return note[0];
    });

    return notes;
  }

  async delete({ note_id }) {
    await knex("tags").where({ note_id }).delete();
  }
}

module.exports = TagsRepository;