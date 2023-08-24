exports.up = knex => knex.schema.alterTable("users", table => {
  table.boolean("isAdmin");
});

exports.down = knex => knex.schema.alterTable("users", table => {
  table.dropColumn("isAdmin");
});