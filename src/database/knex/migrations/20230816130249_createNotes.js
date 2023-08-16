exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id"),
  table.integer("user_id").references("id").inTable("users").onDelete("CASCADE"),
  table.text("title"),
  table.text("avatar"),
  table.text("category"),
  table.text("price"),
  table.text("description"),
  table.timestamp("created_at").default(knex.fn.now()),
  table.timestamp("updated_at").default(knex.fn.now())
});

exports.down = knex => knex.schema.dropTable("notes");