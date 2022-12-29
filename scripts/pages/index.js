import { TagArrayAdaptater } from '../adaptaters/tagArrayAdaptater.js';
import { RecipesApi } from '../api/api.js';
import { RecipesFactory } from '../factories/recipesFactory.js';
import { RecipesCard } from '../templates/recipesCard.js';
import { searchRecipesByKeywords } from '../utils/searchByKeywords.js';
import { closeTagList, openTagList, tagInit } from '../utils/tagForm.js';
import { userSelectTagInTagList } from '../utils/tagListFunctions.js';

export let recipesArray = [];
export let ingredientsArray = [];
export let appliancesArray = [];
export let ustensilsArray = [];
export const ingredientsTagList = document.getElementById('ingredientsList');
export const appliancesTagList = document.getElementById('appliancesList');
export const ustensilsTagList = document.getElementById('ustensilsList');
const recipesSection = document.querySelector('.recipes-section');
const searchBar = document.getElementById('searchbar');

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
 * fill all tag arrays according to the list of recipes
 * @param {object} array array with the list of recipes
 */

async function tagsArrayUpdate(array) {
  ingredientsArray = await new TagArrayAdaptater(
    array,
    'ingredients'
  ).getAlltagsAdaptater();
  appliancesArray = await new TagArrayAdaptater(
    array,
    'appliances'
  ).getAlltagsAdaptater();
  ustensilsArray = await new TagArrayAdaptater(
    array,
    'ustentils'
  ).getAlltagsAdaptater();
}

async function displayRecipesCard(array) {
  array.forEach((recipeData) => {
    const recipeCard = new RecipesCard(recipeData).createRecipeCard();
    recipesSection.appendChild(recipeCard);
  });
}

/**
 * initialization of index page
 */

async function init() {
  const recipes = new RecipesApi('./assets/data/recipes.json');
  const recipesData = await recipes.getRecipesData();

  recipesArray = await arrayCreation(recipesData);
  await tagsArrayUpdate(recipesArray);
  await displayRecipesCard(recipesArray);

  //tag initialization
  await openTagList();
  await closeTagList();
  await tagInit(ingredientsArray, ingredientsTagList);
  await tagInit(appliancesArray, appliancesTagList);
  await tagInit(ustensilsArray, ustensilsTagList);

  await userSelectTagInTagList(ingredientsTagList);
  await userSelectTagInTagList(appliancesTagList);
  await userSelectTagInTagList(ustensilsTagList);
}

init();

//event listener

//searchbar
searchBar.addEventListener('input', (e) => {
  e.preventDefault();
  let result = searchRecipesByKeywords(e.target.value, recipesArray);
  //remove all recipes card & tags list
  recipesSection.innerHTML = '';
  ingredientsTagList.innerHTML = '';
  appliancesTagList.innerHTML = '';
  ustensilsTagList.innerHTML = '';
  //check if result is empty or undefined
  if ((result && result.length === 0) || !result) {
    const errorMessage = ` Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.
`;
    recipesSection.innerHTML = `<p class="error-message"> ${errorMessage}</p>
  `;
  } else {
    displayRecipesCard(result);
    tagsArrayUpdate(result);
    tagInit(ingredientsArray, ingredientsTagList);
    tagInit(appliancesArray, appliancesTagList);
    tagInit(ustensilsArray, ustensilsTagList);
    recipesArray = result;
  }
});

searchBar.addEventListener('keydown', (e) => {
  if (searchBar.value !== '' && e.keyCode === 13) {
    e.preventDefault();
    console.log(recipesArray);
  }
});


