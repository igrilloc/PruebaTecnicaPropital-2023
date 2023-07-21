const { Router } = require("express");
const {
  createOfferHandler,
  getAllOffersHandler,
  getOfferByIdHandler,
  updateOfferHandler,
} = require("../../handlers/offerHandler");

const offerRouter = Router();

offerRouter.get("/offers", getAllOffersHandler);
offerRouter.get("/offer/:id", getOfferByIdHandler);
offerRouter.post("/offer", createOfferHandler);
offerRouter.put("/offer/:id", updateOfferHandler);

module.exports = offerRouter;
