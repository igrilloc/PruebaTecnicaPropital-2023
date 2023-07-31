const { Opportunity } = require("../database.config");

const createOpportunityDB = async (
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
) => {
  const existingOpportunity = await Opportunity.findOne({
    where: { nameOpportunity },
  });

  if (existingOpportunity) {
    return `${existingOpportunity.nameOpportunity} ya existe!`;
  } else {
    const createdOpportunity = await Opportunity.create({
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
    });

    return createdOpportunity;
  }
};

const getOpportunityByIdDB = async (id) => {
  if (id === null || id === undefined || id !== typeof "string") {
    return "El id de la oportunidad no existe.";
  }
  return await Opportunity.findByPk(id, {
    include: "offers",
  });
};

const getAllOpportunitiesDB = async (filters = {}) => {
  const whereClause = {};

  for (const key in filters) {
    if (
      filters.hasOwnProperty(key) &&
      Opportunity.rawAttributes.hasOwnProperty(key)
    ) {
      whereClause[key] = filters[key];
    }
  }

  const opportunities = await Opportunity.findAll({
    where: whereClause,
    include: "offers",
  });

  return opportunities;
};

const updateOpportunityDB = async (
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
) => {
  const sequelize = Opportunity.sequelize;
  const TstateOffer = await sequelize.transaction();

  let opportunityToUpdate = await Opportunity.findByPk(id, {
    include: "offers",
    transaction: TstateOffer,
  });

  if (!opportunityToUpdate) {
    throw new Error("Opportunity not found");
  }

  // Update the opportunity fields
  opportunityToUpdate.nameOpportunity = nameOpportunity;
  opportunityToUpdate.address = address;
  opportunityToUpdate.image = image;
  opportunityToUpdate.location = location;
  opportunityToUpdate.typeOfProperty = typeOfProperty;
  opportunityToUpdate.city = city;
  opportunityToUpdate.details = details;
  opportunityToUpdate.area = area;
  opportunityToUpdate.latitude = latitude;
  opportunityToUpdate.length = length;
  opportunityToUpdate.state = state;

  // Update the associated offers' stateOffer values
  if (opportunityToUpdate.offers) {
    opportunityToUpdate.offers.forEach((offer) => {
      offer.stateOffer = stateOffer;
    });
  }

  // Save the updated opportunity and associated offers
  await opportunityToUpdate.save({ transaction: TstateOffer });

  if (opportunityToUpdate.offers) {
    for (const offer of opportunityToUpdate.offers) {
      await offer.save({ transaction: TstateOffer });
    }
  }

  await TstateOffer.commit();

  return opportunityToUpdate;
};

module.exports = {
  createOpportunityDB,
  getOpportunityByIdDB,
  getAllOpportunitiesDB,
  updateOpportunityDB,
};
