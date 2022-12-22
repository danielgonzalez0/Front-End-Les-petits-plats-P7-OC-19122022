import { RecipesApi } from '../api/api.js';
import { RecipesFactory } from '../factories/recipesFactory.js';
import { closeTagList, openTagList, tagUpdate } from '../utils/tagForm.js';

export let recipesArray = [];
export let ingredientsArray = [];

/**
 * create an array with all the recipes datas
 * @param {array} array with the recipes datas from the API
 * @returns an array with all the recipes datas
 */

async function arrayCreation(array) {
  let newArray = [];
  array.forEach((index) => {
    const recipesModel = new RecipesFactory(index, 'json');
    newArray.push(recipesModel);
  });
  return newArray;
}

/**
 * create an array with all the ingredients
 * @param {array} array with the recipes datas from the API
 * @returns an array with all the ingredients
 */

async function getAllIngredients(array) {
  let ingredientsList = [];
  array.forEach((index) => {
    index.ingredients.forEach((ingredient) => {
      if (!ingredientsList.includes(ingredient.ingredient)) {
        ingredientsList.push(ingredient.ingredient);
      }
    });
  });
  return ingredientsList;
}

/**
 * initialization of index page
 */

async function init() {
  const recipes = new RecipesApi('./assets/data/recipes.json');
  const recipesData = await recipes.getRecipesData();

  //test
  console.log(`data from Json file: `);
  console.log(recipesData);
  recipesArray = await arrayCreation(recipesData);

  //test
  console.log(`Array created with all recipes datas: `);
  console.log(recipesArray[35]);

  ingredientsArray = await getAllIngredients(recipesData);
  //test
  console.log(`Array created with all recipes datas: `);
  console.log(ingredientsArray);

  await openTagList();
  await closeTagList()
  await tagUpdate();
}

init();
