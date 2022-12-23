import { TagArrayAdaptater } from '../adaptaters/tagArrayAdaptater.js';
import { RecipesApi } from '../api/api.js';
import { RecipesFactory } from '../factories/recipesFactory.js';
import { closeTagList, openTagList, tagInit } from '../utils/tagForm.js';

export let recipesArray = [];
export let ingredientsArray = [];
export let appliancesArray = [];
export let ustensilsArray = [];
const ingredientsTagList = document.getElementById('ingredientsList');
const appliancesTagList = document.getElementById('appliancesList');
const ustensilsTagList = document.getElementById('ustensilsList');

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
 * create an array with all the appliances
 * @param {array} array with the recipes datas from the API
 * @returns an array with all the appliances
 */

async function getAllAppliances(array) {
  let appliancesList = [];
  array.forEach((index) => {
    if (!appliancesList.includes(index.appliance)) {
      appliancesList.push(index.appliance);
    }
  });
  return appliancesList;
}

async function getAllUstentils(array) {
  let ustensilList = [];
  array.forEach((index) => {
    index.ustensils.forEach((ustentil) => {
      if (!ustensilList.includes(ustentil)) {
        ustensilList.push(ustentil);
      }
    });
  });
  return ustensilList;
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

  ingredientsArray = await new TagArrayAdaptater(
    recipesData,
    'ingredients'
  ).getAlltagsAdaptater();
  appliancesArray = await new TagArrayAdaptater(
    recipesData,
    'appliances'
  ).getAlltagsAdaptater();
  ustensilsArray = await new TagArrayAdaptater(
    recipesData,
    'ustentils'
  ).getAlltagsAdaptater();

  //test
  console.log(`Array created with all ustentils: `);
  console.log(ustensilsArray);

  //tag initialization
  await openTagList();
  await closeTagList();
  await tagInit(ingredientsArray, ingredientsTagList);
  await tagInit(appliancesArray, appliancesTagList);
  await tagInit(ustensilsArray, ustensilsTagList);
}

init();
