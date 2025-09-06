import { 
  users, crops, diseases, feedback,
  type User, type InsertUser, 
  type Crop, type InsertCrop,
  type Disease, type InsertDisease,
  type Feedback, type InsertFeedback
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByPhone(phoneNumber: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Crop methods
  getAllCrops(): Promise<Crop[]>;
  getCrop(id: string): Promise<Crop | undefined>;
  createCrop(crop: InsertCrop): Promise<Crop>;
  updateCrop(id: string, crop: Partial<InsertCrop>): Promise<Crop>;
  deleteCrop(id: string): Promise<void>;
  
  // Disease methods
  getDiseasesByCrop(cropId: string): Promise<Disease[]>;
  getDisease(id: string): Promise<Disease | undefined>;
  createDisease(disease: InsertDisease): Promise<Disease>;
  updateDisease(id: string, disease: Partial<InsertDisease>): Promise<Disease>;
  deleteDisease(id: string): Promise<void>;
  
  // Feedback methods
  createFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getFeedbackByCrop(cropId: string): Promise<Feedback[]>;
  getFeedbackByDisease(diseaseId: string): Promise<Feedback[]>;
  getAllFeedback(): Promise<Feedback[]>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByPhone(phoneNumber: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.phoneNumber, phoneNumber));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Crop methods
  async getAllCrops(): Promise<Crop[]> {
    return await db.select().from(crops).orderBy(crops.nameHindi);
  }

  async getCrop(id: string): Promise<Crop | undefined> {
    const [crop] = await db.select().from(crops).where(eq(crops.id, id));
    return crop || undefined;
  }

  async createCrop(insertCrop: InsertCrop): Promise<Crop> {
    const [crop] = await db.insert(crops).values(insertCrop).returning();
    return crop;
  }

  async updateCrop(id: string, updateCrop: Partial<InsertCrop>): Promise<Crop> {
    const [crop] = await db.update(crops)
      .set(updateCrop)
      .where(eq(crops.id, id))
      .returning();
    return crop;
  }

  async deleteCrop(id: string): Promise<void> {
    await db.delete(crops).where(eq(crops.id, id));
  }

  // Disease methods
  async getDiseasesByCrop(cropId: string): Promise<Disease[]> {
    return await db.select().from(diseases)
      .where(eq(diseases.cropId, cropId))
      .orderBy(diseases.nameHindi);
  }

  async getDisease(id: string): Promise<Disease | undefined> {
    const [disease] = await db.select().from(diseases).where(eq(diseases.id, id));
    return disease || undefined;
  }

  async createDisease(insertDisease: InsertDisease): Promise<Disease> {
    const [disease] = await db.insert(diseases).values(insertDisease).returning();
    return disease;
  }

  async updateDisease(id: string, updateDisease: Partial<InsertDisease>): Promise<Disease> {
    const [disease] = await db.update(diseases)
      .set(updateDisease)
      .where(eq(diseases.id, id))
      .returning();
    return disease;
  }

  async deleteDisease(id: string): Promise<void> {
    await db.delete(diseases).where(eq(diseases.id, id));
  }

  // Feedback methods
  async createFeedback(insertFeedback: InsertFeedback): Promise<Feedback> {
    const [feedbackRecord] = await db.insert(feedback).values(insertFeedback).returning();
    return feedbackRecord;
  }

  async getFeedbackByCrop(cropId: string): Promise<Feedback[]> {
    return await db.select().from(feedback)
      .where(eq(feedback.cropId, cropId))
      .orderBy(desc(feedback.createdAt));
  }

  async getFeedbackByDisease(diseaseId: string): Promise<Feedback[]> {
    return await db.select().from(feedback)
      .where(eq(feedback.diseaseId, diseaseId))
      .orderBy(desc(feedback.createdAt));
  }

  async getAllFeedback(): Promise<Feedback[]> {
    return await db.select().from(feedback)
      .orderBy(desc(feedback.createdAt));
  }
}

export const storage = new DatabaseStorage();
