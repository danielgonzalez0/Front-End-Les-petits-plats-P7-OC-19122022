import { TagArrayAdaptater } from '../adaptaters/tagArrayAdaptater.js';
import { RecipesApi } from '../api/api.js';
import { RecipesFactory } from '../factories/recipesFactory.js';
import { RecipesCard } from '../templates/recipesCard.js';
import {
  searchByIngredients,
  searchByTags,
  searchRecipesByKeywords,
} from '../utils/searchByKeywords.js';
import { closeTagList, openTagList, tagInit } from '../utils/tagForm.js';
import { userSelectTagInTagList } from '../utils/tagListFunctions.js';

export let recipesArray = [];
export let ingredientsArray = [];
export let appliancesArray = [];
export let ustensilsArray = [];
let updatedRecipesArray = []
export const ingredientsTagList = document.getElementById('ingredientsList');
export const appliancesTagList = document.getElementById('appliancesList');
export const ustensilsTagList = document.getElementById('ustensilsList');
const ingredientsTagInput = document.getElementById('keyWordsIngredients');
const appliancesTagInput = document.getElementById('keyWordsAppliances');
const ustentilsTagInput = document.getElementById('keyWordsUstensils');
const recipesSection = document.querySelector('.recipes-section');
const searchBar = document.getElementById('searchbar');

export const fetchDataRecipes = async () => {
  const recipes = new RecipesApi('./assets/data/recipes.json');
  recipesArray = await recipes.getRecipesData();
};

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
  await fetchDataRecipes();
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
searchBar.addEventListener('input', async (e) => {
  e.preventDefault();

  await fetchDataRecipes();

  let result = searchRecipesByKeywords(e.target.value, recipesArray);
  //remove all recipes card & tags list
  recipesSection.innerHTML = '';
  ingredientsTagList.innerHTML = '';
  appliancesTagList.innerHTML = '';
  ustensilsTagList.innerHTML = '';
  //check if result is empty or undefined
  if (e.target.value.length < 3) {
    result = recipesArray;
  }
  if ((result && result.length === 0) || !result) {
    const errorMessage = ` Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.
`;
    recipesSection.innerHTML = `<p class="error-message"> ${errorMessage}</p>
  `;
  }
  displayRecipesCard(result);
  tagsArrayUpdate(result);
  tagInit(ingredientsArray, ingredientsTagList);
  tagInit(appliancesArray, appliancesTagList);
  tagInit(ustensilsArray, ustensilsTagList);
  userSelectTagInTagList(ingredientsTagList);
  userSelectTagInTagList(appliancesTagList);
  userSelectTagInTagList(ustensilsTagList);
  recipesArray = result;
});

searchBar.addEventListener('keydown', (e) => {
  if (searchBar.value !== '' && e.keyCode === 13) {
    e.preventDefault();
    console.log(recipesArray);
  }
});

//tag
ingredientsTagInput.addEventListener('input', async (e) => {
  //remove all recipes card & tags list
    recipesSection.innerHTML = '';
  ingredientsTagList.innerHTML = '';
  appliancesTagList.innerHTML = '';
  ustensilsTagList.innerHTML = '';
  //variables
  let userTag = e.target.value;
  let tagListResult = [];
  //update tag list
  tagListResult = searchByTags(userTag, ingredientsArray);
  tagInit(tagListResult, ingredientsTagList);
  userSelectTagInTagList(ingredientsTagList);
  //search with the tag list result
  updatedRecipesArray  = searchByIngredients(userTag, tagListResult, recipesArray);

  displayRecipesCard(updatedRecipesArray);
  tagsArrayUpdate(updatedRecipesArray);
  tagInit(appliancesArray, appliancesTagList);
  tagInit(ustensilsArray, ustensilsTagList);
  userSelectTagInTagList(appliancesTagList);
  userSelectTagInTagList(ustensilsTagList);
});
