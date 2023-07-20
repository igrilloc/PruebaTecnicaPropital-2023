const {
  createOfferDB,
  getOfferByIdDB,
  updateOfferDB,
  getAllOffersDB
} = require("../controllers/offerController");

const getOfferByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await getOfferByIdDB(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createOfferHandler = async (req, res) => {
  const {
    title,
    description,
    category,
    price,
    expiration,
    stateOffer,
    opportunityId,
  } = req.body;

  try {
    const response = await createOfferDB(
      title,
      description,
      category,
      price,
      expiration,
      stateOffer,
      opportunityId
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateOfferHandler = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, price, expiration } = req.body;

  try {
    const response = await updateOfferDB(
      id,
      title,
      description,
      category,
      price,
      expiration
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOffersHandler = async (req, res) => {
  const validFilters = ["title", "category", "price", "stateOffer"];

  try {
    const filters = {};
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key) && validFilters.includes(key)) {
        filters[key] = req.query[key];
      }
    }

    if (Object.keys(filters).length > 0) {
      const response = await getAllOffersDB(filters);
      res.status(200).json(response);
    } else {
      const response = await getAllOffersDB();
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getOfferByIdHandler,
  createOfferHandler,
  updateOfferHandler,
  getAllOffersHandler,
};
