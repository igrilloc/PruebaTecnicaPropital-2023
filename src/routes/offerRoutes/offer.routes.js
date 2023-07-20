const { Router } = require("express");
const {
  createOfferHandler,
  getAllOffersHandler,
  getOfferByIdHandler,
  updateOfferHandler,
} = require("../../handlers/offerHandler");

const offerRouter = Router();

offerRouter.get("/offers", getAllOffersHandler);
offerRouter.get("/:id", getOfferByIdHandler);
offerRouter.post("/newOffer", createOfferHandler);
offerRouter.put("/updateOffer/:id", updateOfferHandler);

module.exports = offerRouter;
