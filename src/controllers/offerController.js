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
    return `${existingOffer.title} ya existe!`;
  } else if (
    opportunityId === null ||
    opportunityId === undefined ||
    opportunityId === typeof "string"
  ) {
    return "No se pueden crear ofertas sin asosociar a una oportunidad!";
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
  if (id === null || id === undefined || id !== typeof "string") {
    return "El id de la oferta no existe.";
  }
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
