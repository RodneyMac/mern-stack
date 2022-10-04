const Usuario = require("../models/userModel");
const mongoose = require("mongoose");

const getUsers = async (req, res) => {
  const users = await Usuario.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No se encontró el usuario" });
  }
  const user = await Usuario.findById(id);
  if (!user) {
    return res.status(404).json({ error: "No se encontró el usuario" });
  }
  res.status(200).json(user);
};

const createUser = async (req, res) => {
  const { username, email } = req.body;
  let emptyFileds = [];
  if (!username) {
    emptyFileds.push("username");
  }
  if (!email) {
    emptyFileds.push("email");
  }
  if (emptyFileds.length > 0) {
    return res
      .status(400)
      .json({ error: "Por favor, llene todos los campos", emptyFileds });
  }
  try {
    const user = await Usuario.create({ username, email });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No se encontró el usuario" });
  }
  const user = await Usuario.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "No se encontró el usuario" });
  }
  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No se encontró el usuario" });
  }
  const user = await Usuario.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(400).json({ error: "No se encontró el usuario" });
  }
  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
