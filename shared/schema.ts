import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  phoneNumber: varchar("phone_number", { length: 15 }).notNull().unique(),
  name: text("name"),
  isAdmin: boolean("is_admin").default(false),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const crops = pgTable("crops", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  nameHindi: text("name_hindi").notNull(),
  nameEnglish: text("name_english").notNull(),
  scientificName: text("scientific_name"),
  category: text("category"), // "rabi", "kharif", "cash_crop", etc.
  sowingTime: text("sowing_time"),
  temperature: text("temperature"),
  waterRequirement: text("water_requirement"),
  careInstructions: jsonb("care_instructions"), // { hindi: string, english: string }
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const diseases = pgTable("diseases", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  cropId: varchar("crop_id").references(() => crops.id),
  nameHindi: text("name_hindi").notNull(),
  nameEnglish: text("name_english").notNull(),
  scientificName: text("scientific_name"),
  severity: text("severity"), // "low", "medium", "high", "critical"
  type: text("type"), // "fungal", "bacterial", "viral", "pest"
  symptoms: jsonb("symptoms"), // { hindi: string[], english: string[] }
  causes: jsonb("causes"), // { hindi: string[], english: string[] }
  treatment: jsonb("treatment"), // { hindi: string[], english: string[] }
  prevention: jsonb("prevention"), // { hindi: string[], english: string[] }
  images: jsonb("images"), // string[] - array of image URLs
  createdAt: timestamp("created_at").default(sql`now()`),
});

export const feedback = pgTable("feedback", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  cropId: varchar("crop_id").references(() => crops.id),
  diseaseId: varchar("disease_id").references(() => diseases.id),
  name: text("name"),
  phoneNumber: varchar("phone_number", { length: 15 }),
  rating: integer("rating"), // 1-5 stars
  comment: text("comment"),
  type: text("type"), // "crop", "disease", "general"
  createdAt: timestamp("created_at").default(sql`now()`),
});

// Relations
export const cropsRelations = relations(crops, ({ many }) => ({
  diseases: many(diseases),
  feedback: many(feedback),
}));

export const diseasesRelations = relations(diseases, ({ one, many }) => ({
  crop: one(crops, { fields: [diseases.cropId], references: [crops.id] }),
  feedback: many(feedback),
}));

export const usersRelations = relations(users, ({ many }) => ({
  feedback: many(feedback),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  user: one(users, { fields: [feedback.userId], references: [users.id] }),
  crop: one(crops, { fields: [feedback.cropId], references: [crops.id] }),
  disease: one(diseases, { fields: [feedback.diseaseId], references: [diseases.id] }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCropSchema = createInsertSchema(crops).omit({
  id: true,
  createdAt: true,
});

export const insertDiseaseSchema = createInsertSchema(diseases).omit({
  id: true,
  createdAt: true,
});

export const insertFeedbackSchema = createInsertSchema(feedback).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Crop = typeof crops.$inferSelect;
export type InsertCrop = z.infer<typeof insertCropSchema>;

export type Disease = typeof diseases.$inferSelect;
export type InsertDisease = z.infer<typeof insertDiseaseSchema>;

export type Feedback = typeof feedback.$inferSelect;
export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
