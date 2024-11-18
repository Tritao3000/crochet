import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text()
    .primaryKey()
    .unique()
    .$defaultFn(() => createId()),
  externalId: text("external_id").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("created_at").$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
});
