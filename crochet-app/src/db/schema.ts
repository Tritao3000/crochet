import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { blob, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

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

// Patterns table
export const patterns = sqliteTable("patterns", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  patternData: blob("pattern_data").notNull(), // Store JSON as blob
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at"),
});

// Projects table
export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  patternId: text("pattern_id").references(() => patterns.id), // Optional
  name: text("name").notNull(),
  status: text("status").notNull(), // e.g., "In Progress", "Completed"
  startDate: text("start_date"),
  endDate: text("end_date"),
  progress: real("progress").default(0.0).notNull(), // Progress percentage
  notes: text("notes"),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

// Yarn Inventory table
export const yarnInventory = sqliteTable("yarn_inventory", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  name: text("name").notNull(), // Yarn name
  color: text("color"),
  weight: text("weight"), // e.g., "DK", "Worsted"
  quantity: real("quantity").notNull(),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at"),
});

// Project Tracking table
export const projectTracking = sqliteTable("project_tracking", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id),
  timeSpent: real("time_spent"), // Time in hours
  cost: real("cost"), // Cost in currency
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

// Finished Projects table
export const finishedProjects = sqliteTable("finished_projects", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => projects.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  finalNotes: text("final_notes"),
  photos: blob("photos"), // JSON array of photo URLs/metadata
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
