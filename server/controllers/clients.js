import express from "express";
import mongoose from "mongoose";

import ClientModel from "../models/ClientModel.js";
import UserModel from "../models/userModel.js";

// export const getClients = async (req, res) => {
//     const userId = req.body

//     try {
//         const allClients = await ClientModel.find({userId: userId}).sort({_id:-1})
//         //find({}).sort({_id:-1}) to sort according to date of creation

//         res.status(200).json(allClients)

//     } catch (error) {
//         res.status(409).json(error.message)

//     }

// }
export const getusers = async (req, res) => {
  try {
    const users = await UserModel.find({ status: 1 });
    res.json({ data: users });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getClient = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await ClientModel.findById(id);

    res.status(200).json(client);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getClients = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await ClientModel.countDocuments({});
    const clients = await ClientModel.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: clients,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createClient = async (req, res) => {
  const client = req.body;

  const newClient = new ClientModel({
    ...client,
    createdAt: new Date().toISOString(),
    status: 1,
  });

  try {
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    res.status(409).json(error.message);
  }
};

export const updateClient = async (req, res) => {
  const { id: _id } = req.params;
  const client = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No client with that id");

  const updatedClient = await ClientModel.findByIdAndUpdate(
    _id,
    { ...client, _id },
    { new: true }
  );

  res.json(updatedClient);
};

export const updateUser = async (req, res) => {
  const { id: _id } = req.params;
  const client = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No client with that id");

  const updatedClient = await UserModel.findByIdAndUpdate(
    _id,
    { ...client, _id },
    { new: true }
  );

  res.json(updatedClient);
};
export const deleteClient = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Client with that id");
  }

  try {
    await ClientModel.findByIdAndUpdate(id, { status: 0 });
    res.json({ message: "Client status updated to 0 successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("No Client with that id");
  }

  try {
    await UserModel.findByIdAndUpdate(id, { status: 0 });
    res.json({ message: "Client status updated to 0 successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getClientsByUser = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const clients = await ClientModel.find({ status: 1 });

    res.json({ data: clients });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
