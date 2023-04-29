const crypto = require("crypto");
const { faker } = require("@faker-js/faker");

const mockProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.word.noun(),
        thumbnails: faker.image.abstract(),
        stock: faker.random.numeric(1),
        price: faker.commerce.price(100, 1500, 2, "$"),
        code: crypto.randomUUID(),
        status: true,
    }
}

module.exports = mockProduct;