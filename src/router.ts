import express from "express";
import { addUser, deleteUser, getUsers, updateUser } from "./controller";
const router = express.Router();

router.get("/users", async (req, res) => {
  const { status, message } = await getUsers();
  res.status(status).end(message);
});

router.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const { status, message } = await addUser(username, password);
  res.status(status).end(message);
});

router.put("/users", async (req, res) => {
  const { username, password, newPassword } = req.body;
  const { status, message } = await updateUser(username, password, newPassword);
  res.status(status).end(message);
});

router.delete("/users", async (req, res) => {
  const { username, password } = req.query;
  const { status, message } = await deleteUser(username, password);
  res.status(status).end(message);
});

export default router;
