const { Offer } = require("../database.config");

const createOfferDB = async (
  title,
  description,
  category,
  price,
  expiration,
  stateOffer,
  opportunityId
) => {
  const existingOffer = await Offer.findOne({
    where: { title },
  });

  if (existingOffer) {
    return existingOffer;
  } else {
    const createdOffer = await Offer.create({
      title,
      description,
      category,
      price,
      expiration,
      stateOffer,
    });

    await createdOffer.setOpportunity(opportunityId);

    return createdOffer;
  }
};

const getOfferByIdDB = async (id) => {
  return await Offer.findByPk(id);
};

const updateOfferDB = async (
  id,
  title,
  description,
  category,
  price,
  expiration
) => {
  let offerToUpdate = await Offer.findByPk(id);

  if (!offerToUpdate) {
    throw new Error("Opportunity not found");
  }

  // Update the offer fields
  offerToUpdate.title = title;
  offerToUpdate.description = description;
  offerToUpdate.category = category;
  offerToUpdate.price = price;
  offerToUpdate.expiration = expiration;

  await offerToUpdate.save();
  return offerToUpdate;
};

const getAllOffersDB = async (filters = {}) => {
  const whereClause = {};

  for (const key in filters) {
    if (
      filters.hasOwnProperty(key) &&
      Offer.rawAttributes.hasOwnProperty(key)
    ) {
      whereClause[key] = filters[key];
    }
  }

  const offers = await Offer.findAll({
    where: whereClause,
  });

  return offers;
};

module.exports = {
  createOfferDB,
  getOfferByIdDB,
  updateOfferDB,
  getAllOffersDB,
};
