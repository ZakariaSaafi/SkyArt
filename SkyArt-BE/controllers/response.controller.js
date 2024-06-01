
import Response from '../models/Response.js';
import { validationResult } from 'express-validator';

export const createResponse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { feedbackId, userId, text } = req.body;

  try {
    const response = new Response({ feedbackId, userId, text });
    await response.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const getResponses = async (req, res) => {
  try {
    const responses = await Response.find().populate('userId').populate('feedbackId');
    res.status(200).json(responses);
  } catch (error) {
    res.status (500).send('Server Error');
  }
};

export const updateResponse = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { text } = req.body;

  try {
    const response = await Response.findByIdAndUpdate(id, { text }, { new: true });
    if (!response) {
      return res.status(404).send('Response not found');
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const deleteResponse = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await Response.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send('Response not found');
    }
    res.status(200).send('Response deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};