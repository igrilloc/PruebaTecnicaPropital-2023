const { Router } = require("express");
const opportunityRouter = require("./opportunityRoutes/opportunity.routes");
const offerRouter = require("./offerRoutes/offer.routes");
const mainRouter = Router();

mainRouter.use("/api/opportunity", opportunityRouter);
mainRouter.use("/api/offer", offerRouter);

module.exports = mainRouter;
