import { TagArrayAdaptater } from '../adaptaters/tagArrayAdaptater.js';
import { RecipesApi } from '../api/api.js';
import { RecipesFactory } from '../factories/recipesFactory.js';
import { RecipesCard } from '../templates/recipesCard.js';
import { closeTagList, openTagList, tagInit } from '../utils/tagForm.js';

export let recipesArray = [];
export let ingredientsArray = [];
export let appliancesArray = [];
export let ustensilsArray = [];
const ingredientsTagList = document.getElementById('ingredientsList');
const appliancesTagList = document.getElementById('appliancesList');
const ustensilsTagList = document.getElementById('ustensilsList');
const recipesSection = document.querySelector('.recipes-section');

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

async function displayRecipesCard(array) {
  array.forEach((recipeData) => {
    const recipeCard = new RecipesCard(recipeData).createRecipeCard();
    console.log(recipeCard);
    recipesSection.appendChild(recipeCard);
  });
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
  console.log(recipesArray);

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
  await displayRecipesCard(recipesArray);

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
