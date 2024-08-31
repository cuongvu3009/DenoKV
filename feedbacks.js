const kv = await Deno.openKv();

export async function getFeedbackCount(feedbackType) {
  const key = ["feedback", feedbackType];
  const result = await kv.get(key);
  return result?.value ?? 0;
}

export async function incrementFeedback(feedbackType) {
  const key = ["feedback", feedbackType];
  const currentCount = await getFeedbackCount(feedbackType);
  await kv.set(key, currentCount + 1);
}
