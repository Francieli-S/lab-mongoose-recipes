const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://127.0.0.1:27017/recipe-app";

// Iteration 2 - Create a Recipes
const addRecipe = {
  title: "Pizza",
  level: "Amateur Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs",
  ],
  cuisine: "Asian",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 40,
  creator: "Chef LePapu",
};

// Connection to the database "recipe-app"
// mongoose
//   .connect(MONGODB_URI)
//   .then((x) => {
//     console.log(`Connected to the database: "${x.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany();
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//     // Iteration 2 - a new recipe will be created in ou r DB
//     return Recipe.create(addRecipe);
//   })
//   .then((result) => {
//     console.log(`recipe added: ${result.title}`);
//     // Iteration 3
//     return Recipe.insertMany(data);
//   })
//   .then((result) => {
//     result.forEach((recipe) =>
//       console.log(`recipe for ${recipe.title} inserted successfullly`)
//     );
//     const filter = { title: "Rigatoni alla Genovese" };
//     const update = { duration: 100 };
//     // Iteration 4
//     return Recipe.findOneAndUpdate(filter, update, { new: true });
//   })
//   .then((result) => {
//     console.log(`The recipe ${result.title} is updated`);
//     // Iteration 5
//     return Recipe.findOneAndDelete({ title: "Carrot Cake" });
//   })
//   .then((result) => {
//     console.log(`The recipe ${result.title} was deleted`);
//     // Iteration 6
//     return mongoose.connection.close();
//   })
//   .then(() => console.log("Mongoose connection closed"))
//   .catch((error) => console.error("Error connecting to the database", error));

// With async/await
async function dataBaseManage() {
  try {
    let x = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${x.connection.name}"`);

    await Recipe.deleteMany();

    let createRecipe = await Recipe.create(addRecipe);
    console.log(createRecipe.title);

    let insertRecipes = await Recipe.insertMany(data);
    insertRecipes.forEach((recipe) =>
      console.log(`recipe for ${recipe.title} inserted successfully`)
    );

    let updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(`The recipe ${updatedRecipe.title} is updated`);

    let deletedRecipe = await Recipe.findOneAndDelete({ title: "Carrot Cake" });
    console.log(`The recipe ${deletedRecipe.title} is deleted`);

    await mongoose.connection.close();
    console.log(`connection closed`);
  } catch (error) {
    console.log(error);
  }
}

dataBaseManage();
