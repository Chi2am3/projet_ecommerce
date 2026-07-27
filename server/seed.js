const { sequelize, User, Product } = require("./models");

async function seed() {
  await Product.bulkCreate([
    {
      name: "Colombie Supremo",
      variety: "Arabica",
      roast: "Moyenne",
      origin: "Colombie",
      description:
        "Un café doux et équilibré, notes de caramel et de noisette.",
      price: 12.5,
      weight: 250,
      stock: 30,
      image: "colombie.jpg",
    },
    {
      name: "Éthiopie Yirgacheffe",
      variety: "Arabica",
      roast: "Claire",
      origin: "Éthiopie",
      description:
        "Notes florales et fruitées, acidité vive typique des cafés éthiopiens.",
      price: 14.0,
      weight: 250,
      stock: 20,
      image: "ethiopie.jpg",
    },
    {
      name: "Sumatra Mandheling",
      variety: "Arabica",
      roast: "Foncée",
      origin: "Indonésie",
      description: "Corps épais, faible acidité, notes terreuses et épicées.",
      price: 13.0,
      weight: 500,
      stock: 15,
      image: "sumatra.jpg",
    },
  ]);

  await User.create({
    firstName: "Test",
    lastName: "User",
    email: "test@test.com",
    password: "test123",
  });
}

seed();
