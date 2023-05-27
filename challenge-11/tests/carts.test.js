const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("testing carts endpoints", () => {
    it("get /api/carts must return status code 200 and an array of objects", async () => {
        const response = await requester.get("/api/carts");
        const { _body } = response;

        expect(_body.status).to.be.equal(200);
        expect(_body.response).to.be.an("array");
        
        for(let i=0; i < _body.response.length; i++){
            expect(_body.response[i]).to.have.property("id");
            expect(_body.response[i]).to.have.property("products");
            expect(_body.response[i].products).to.be.an("array");
        }
    })

    it("get /api/carts/:id must return status code 200 and cart found", async () => {
        const response = await requester.get("/api/carts/65e88d68-e961-428b-8ca6-308021f5085b");
        const { _body } = response;

        expect(_body.status).to.be.equal(200);
        expect(_body.response).to.be.an("object");
        expect(_body.response).to.have.property("id");
        expect(_body.response).to.have.property("products");
        expect(_body.response.products).to.be.an("array");
            
        for(let i=0; i < _body.response.products.length; i++){
            expect(_body.response.products[i]).to.be.an("object");
            expect(_body.response.products[i]).to.have.property("product");
            expect(_body.response.products[i]).to.have.property("quantity");
        }
    })

    it("post /api/carts must return status code 201 and \"cart created\"", async () => {
        const response = await requester.post("/api/carts");
        const { _body } = response;

        expect(_body.status).to.be.equal(201);
        expect(_body.response).to.be.equal("Cart created.");
    })
})