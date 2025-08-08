import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; // adjust the type to your user shape
    }
  }
}
