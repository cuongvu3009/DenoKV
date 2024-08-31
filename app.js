import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedbackStore from "./feedbacks.js";

const app = new Hono();

// Handler for GET requests to retrieve feedback count
app.get("/feedbacks/:type", async (c) => {
  const feedbackType = c.req.param("type");
  if (!["1", "2", "3"].includes(feedbackType)) {
    return c.text("Invalid feedback type", 400);
  }
  const count = await feedbackStore.getFeedbackCount(feedbackType);
  return c.text(`Feedback ${feedbackType}: ${count}`);
});

// Handler for POST requests to increment feedback count
app.post("/feedbacks/:type", async (c) => {
  const feedbackType = c.req.param("type");
  if (!["1", "2", "3"].includes(feedbackType)) {
    return c.text("Invalid feedback type", 400);
  }
  await feedbackStore.incrementFeedback(feedbackType);
  const count = await feedbackStore.getFeedbackCount(feedbackType);
  return c.text(`Feedback ${feedbackType}: ${count}`);
});

export default app;
