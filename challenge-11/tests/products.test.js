const chai = require("chai");
const supertest = require("supertest");

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

const product_types = {
    id: "string",
    title: "string",
    description: "string",
    category: "string",
    thumbnails: "array",
    stock: "number",
    price: "number",
    code: "string",
    status: "boolean",
    owner: "string"
};

const mock = {
    title: "title",
    description: "description",
    category: "category",
    thumbnails: ["thumbnails"],
    stock: 0,
    price: 0,
    code: "code",
    status: true
};

const user = { email: "janedoe@gmail.com", password: "janedoe123" }

describe("testing products endpoints", () => {
    it("get /api/products must return status code 200 and an array of objects", async () => {
        const response = await requester.get("/api/products");
        const { _body } = response;

        expect(_body.status).to.be.equal(200);
        expect(_body.response).to.be.an("array");

        for(let i=0; i < _body.response.length; i++){
            for(const key in mock) {
                expect(_body.response[i][key]).to.be.a(product_types[key]);
            }
        }
    })

    it("get /api/products/:id must return status code 200 and product found", async () => {
        const response = await requester.get("/api/products/d611ebe8-352c-4c15-a74d-52a7dd45a8a2")
        const { _body } = response;

        expect(_body.status).to.be.equal(200);

        for(const key in mock) {
            expect(_body.response[key]).to.be.a(product_types[key]);
        }
    })

    it("post /api/products must return status code 201 and \"product created\"", async () => {
        const login = await requester.post("/api/auth/login").send(user);

        const response = await requester
            .post("/api/products")
            .set("Cookie", `token=${login._body.token}`)
            .send(mock);

        const { _body, created } = response;

        expect(_body.status).to.be.equal(201);
        expect(created).to.be.true;
        expect(_body.response).to.be.equal("Product created.");
    })
})