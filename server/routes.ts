import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCropSchema, insertDiseaseSchema, insertFeedbackSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crops routes
  app.get("/api/crops", async (req, res) => {
    try {
      const crops = await storage.getAllCrops();
      res.json(crops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch crops" });
    }
  });

  app.get("/api/crops/:id", async (req, res) => {
    try {
      const crop = await storage.getCrop(req.params.id);
      if (!crop) {
        return res.status(404).json({ message: "Crop not found" });
      }
      res.json(crop);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch crop" });
    }
  });

  app.post("/api/crops", async (req, res) => {
    try {
      const validatedData = insertCropSchema.parse(req.body);
      const crop = await storage.createCrop(validatedData);
      res.status(201).json(crop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create crop" });
    }
  });

  app.put("/api/crops/:id", async (req, res) => {
    try {
      const validatedData = insertCropSchema.partial().parse(req.body);
      const crop = await storage.updateCrop(req.params.id, validatedData);
      res.json(crop);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update crop" });
    }
  });

  app.delete("/api/crops/:id", async (req, res) => {
    try {
      await storage.deleteCrop(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete crop" });
    }
  });

  // Diseases routes
  app.get("/api/crops/:cropId/diseases", async (req, res) => {
    try {
      const diseases = await storage.getDiseasesByCrop(req.params.cropId);
      res.json(diseases);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch diseases" });
    }
  });

  app.get("/api/diseases/:id", async (req, res) => {
    try {
      const disease = await storage.getDisease(req.params.id);
      if (!disease) {
        return res.status(404).json({ message: "Disease not found" });
      }
      res.json(disease);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch disease" });
    }
  });

  app.post("/api/diseases", async (req, res) => {
    try {
      const validatedData = insertDiseaseSchema.parse(req.body);
      const disease = await storage.createDisease(validatedData);
      res.status(201).json(disease);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create disease" });
    }
  });

  app.put("/api/diseases/:id", async (req, res) => {
    try {
      const validatedData = insertDiseaseSchema.partial().parse(req.body);
      const disease = await storage.updateDisease(req.params.id, validatedData);
      res.json(disease);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update disease" });
    }
  });

  app.delete("/api/diseases/:id", async (req, res) => {
    try {
      await storage.deleteDisease(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete disease" });
    }
  });

  // Feedback routes
  app.post("/api/feedback", async (req, res) => {
    try {
      const validatedData = insertFeedbackSchema.parse(req.body);
      const feedback = await storage.createFeedback(validatedData);
      res.status(201).json(feedback);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create feedback" });
    }
  });

  app.get("/api/crops/:cropId/feedback", async (req, res) => {
    try {
      const feedback = await storage.getFeedbackByCrop(req.params.cropId);
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  app.get("/api/diseases/:diseaseId/feedback", async (req, res) => {
    try {
      const feedback = await storage.getFeedbackByDisease(req.params.diseaseId);
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  app.get("/api/feedback", async (req, res) => {
    try {
      const feedback = await storage.getAllFeedback();
      res.json(feedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/users/phone/:phoneNumber", async (req, res) => {
    try {
      const user = await storage.getUserByPhone(req.params.phoneNumber);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
