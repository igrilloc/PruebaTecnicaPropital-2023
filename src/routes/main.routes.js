const { Router } = require("express");
const opportunityRouter = require("./opportunityRoutes/opportunity.routes");
const offerRouter = require("./offerRoutes/offer.routes");
const mainRouter = Router();

mainRouter.use("/api/", opportunityRouter);
mainRouter.use("/api/", offerRouter);

module.exports = mainRouter;
