const { Router } = require("express");
const {
  createOpportunityHandler,
  getAllOpportunitiesHandler,
  getOpportunityByIdHandler,
  updateOpportunityHandler,
} = require("../../handlers/opportunityHandler");

const opportunityRouter = Router();

opportunityRouter.get("/opportunities", getAllOpportunitiesHandler);
opportunityRouter.get("/opportunity/:id", getOpportunityByIdHandler);
opportunityRouter.post("/opportunity", createOpportunityHandler);
opportunityRouter.put("/opportunity/:id", updateOpportunityHandler);

module.exports = opportunityRouter;
