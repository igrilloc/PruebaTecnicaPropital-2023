const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);
const expect = chai.expect;

describe("/POST /api/opportunity/newOpportunity", () => {
  it("should create opportunities", (done) => {
    let opportunities = {
      nameOpportunity: "Casa en La Serena",
      address: "Calle Los Alamos 678",
      image: [
        "https://example.com/images/property7_1.jpg",
        "https://example.com/images/property7_2.jpg",
      ],
      location: "La Serena",
      typeOfProperty: "Casa",
      city: "La Serena",
      details: "Casa de playa cerca del centro",
      area: 220,
      latitude: -29.9028,
      length: -71.2525,
      state: "available",
    };

    chai
      .request(app)
      .post("/api/opportunity/newOpportunity")
      .send(opportunities)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("GET /api/opportunity/opportunities", () => {
  it("should get all opportunities", (done) => {
    chai
      .request(app)
      .get("/api/opportunity/opportunities")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET /api/opportunity/:id", () => {
  it("should get a single opportunity by ID", (done) => {
    const opportunityId = "ac0cf611-a065-4b54-977a-a47617ad8427";
    chai
      .request(app)
      .get(`/api/opportunity/${opportunityId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.nameOpportunity).to.equal(
          "Casa en La Serena Actualizada"
        );
        done();
      });
  });
});

describe("/POST /api/offer/newOffer", () => {
  it("should create offers", (done) => {
    let offers = {
      title: "Offer 1",
      description: "Detalles de la oferta de alquiler",
      category: "rent",
      price: 1500,
      expiration: "2023-12-31",
      stateOffer: "active",
      opportunityId: "adb94e2f-a7ac-482e-ab5e-4b3dccdce3fa",
    };

    chai
      .request(app)
      .post("/api/offer/newOffer")
      .send(offers)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

describe("GET /api/offer/offers", () => {
  it("should get all opportunities", (done) => {
    chai
      .request(app)
      .get("/api/offer/offers")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET /api/offer/:id", () => {
  it("should get a single opportunity by ID", (done) => {
    const id = "1df9db71-e81c-4f83-8494-9647f29af98f";
    chai
      .request(app)
      .get(`/api/offer/${id}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body.title).to.equal("Super promo Offer 2");
        done();
      });
  });
});
