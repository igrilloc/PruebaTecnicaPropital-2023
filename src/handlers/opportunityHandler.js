const {
  createOpportunityDB,
  getOpportunityByIdDB,
  updateOpportunityDB,
  getAllOpportunitiesDB,
} = require("../controllers/opportunityController");

const getOpportunityByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getOpportunityByIdDB(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOpportunityHandler = async (req, res) => {
  const {
    nameOpportunity,
    address,
    image,
    location,
    typeOfProperty,
    city,
    details,
    area,
    latitude,
    length,
    state,
  } = req.body;

  try {
    const response = await createOpportunityDB(
      nameOpportunity,
      address,
      image,
      location,
      typeOfProperty,
      city,
      details,
      area,
      latitude,
      length,
      state
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOpportunityHandler = async (req, res) => {
  const { id } = req.params;
  const {
    nameOpportunity,
    address,
    image,
    location,
    typeOfProperty,
    city,
    details,
    area,
    latitude,
    length,
    state,
    stateOffer,
  } = req.body;

  try {
    const response = await updateOpportunityDB(
      id,
      nameOpportunity,
      address,
      image,
      location,
      typeOfProperty,
      city,
      details,
      area,
      latitude,
      length,
      state,
      stateOffer
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOpportunitiesHandler = async (req, res) => {
  const validFilters = ["city", "location", "typeOfProperty", "state"];

  try {
    const filters = {};
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key) && validFilters.includes(key)) {
        filters[key] = req.query[key];
      }
    }

    if (Object.keys(filters).length > 0) {
      const response = await getAllOpportunitiesDB(filters);
      res.status(200).json(response);
    } else {
      const response = await getAllOpportunitiesDB();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOpportunityByIdHandler,
  createOpportunityHandler,
  updateOpportunityHandler,
  getAllOpportunitiesHandler,
};
