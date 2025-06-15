import { int, bigint, text, singlestoreTable, index } from "drizzle-orm/singlestore-core";


export const files = singlestoreTable("files_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  type: text("type"),
  size: bigint("size", { mode: "bigint" }),
  modified: bigint("modified", { mode: "bigint" }),
  owner: text("owner"),
  url: text("url").notNull(),
  parent: int("parent").notNull(),
}, (table) => {
  return [index("parent_index").on(table.parent)];
});

export const folders = singlestoreTable("folders_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name").notNull(),
  owner: text("owner"),
  parent: int("parent").notNull(),
  size: bigint("size", { mode: "bigint" }),
}, (table) => {
  return [index("parent_index").on(table.parent)];
});