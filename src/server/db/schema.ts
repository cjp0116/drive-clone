import {  bigint, text, index, timestamp, singlestoreTableCreator } from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `drive-clone_${name}`,
)

export const files = createTable("files", {
  id: bigint("id", { mode: "number", unsigned: true }).primaryKey().autoincrement(),
  ownerId: text("owner_id").notNull(),
  name: text("name").notNull(),
  type: text("type"),
  size: bigint("size", { mode: "bigint" }).notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  parent: bigint("parent", { mode: "number", unsigned: true }).notNull(),
}, (table) => {
  return [
    index("parent_index").on(table.parent),
    index("owner_id_index").on(table.ownerId)
  ];
});

export const DB_FileType = typeof files.$inferSelect;

export const folders = createTable("folders", {
  id: bigint("id", { mode: "number", unsigned: true })
    .primaryKey()
    .autoincrement(),
  ownerId: text("owner_id").notNull(),
  size: bigint("size", { mode: "bigint" }).notNull(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number", unsigned: true }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (table) => {
  return [
    index("parent_index").on(table.parent),
    index("owner_id_index").on(table.ownerId)
  ];
});

export const DB_FolderType = typeof folders.$inferSelect;