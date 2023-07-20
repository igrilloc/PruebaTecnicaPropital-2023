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
    return existingOpportunity;
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
  const t = await sequelize.transaction();

  let opportunityToUpdate = await Opportunity.findByPk(id, {
    include: "offers",
    transaction: t,
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
  await opportunityToUpdate.save({ transaction: t });

  if (opportunityToUpdate.offers) {
    for (const offer of opportunityToUpdate.offers) {
      await offer.save({ transaction: t });
    }
  }

  await t.commit();

  return opportunityToUpdate;
};

module.exports = {
  createOpportunityDB,
  getOpportunityByIdDB,
  getAllOpportunitiesDB,
  updateOpportunityDB,
};
