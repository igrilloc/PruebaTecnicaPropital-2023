const { Router } = require("express");
const {
  createOpportunityHandler,
  getAllOpportunitiesHandler,
  getOpportunityByIdHandler,
  updateOpportunityHandler,
} = require("../../handlers/opportunityHandler");

const opportunityRouter = Router();

opportunityRouter.get("/opportunities", getAllOpportunitiesHandler);
opportunityRouter.get("/:id", getOpportunityByIdHandler);
opportunityRouter.post("/newOpportunity", createOpportunityHandler);
opportunityRouter.put("/updateOpportunity/:id", updateOpportunityHandler);

module.exports = opportunityRouter;
