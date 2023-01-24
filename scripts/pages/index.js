import { TagArrayAdaptater } from '../adaptaters/tagArrayAdaptater.js';
import { TagCardAdaptater } from '../adaptaters/tagCardAdaptater.js';
import { RecipesApi } from '../api/api.js';
import { RecipesCard } from '../templates/recipesCard.js';
import { searchAll } from '../utils/searchAll.js';
import { searchByTags } from '../utils/searchByTags.js';
import { closeTagList, openTagList, tagInit } from '../utils/tagForm.js';
import {
  closeTaginTagSelection,
  tagSection,
  userSelectTagInTagList,
} from '../utils/tagListFunctions.js';
import { tagListRecuperationForSearchByTag } from '../utils/tagListRecuperation.js';

export let recipesArray = [];
export let ingredientsArray = [];
export let appliancesArray = [];
export let ustensilsArray = [];
export let updatedRecipesArray = [];
export const ingredientsTagList = document.getElementById('ingredientsList');
export const appliancesTagList = document.getElementById('appliancesList');
export const ustensilsTagList = document.getElementById('ustensilsList');
export const ingredientsTagInput = document.getElementById(
  'keyWordsIngredients'
);
export const appliancesTagInput = document.getElementById('keyWordsAppliances');
export const ustensilsTagInput = document.getElementById('keyWordsUstensils');
export const recipesSection = document.querySelector('.recipes-section');
export const searchBar = document.getElementById('searchbar');

export const fetchDataRecipes = async () => {
  const recipes = new RecipesApi('./assets/data/recipes.json');
  recipesArray = await recipes.getRecipesData();
};

/**
 * fill all tag arrays according to the list of recipes
 * @param {object} array array with the list of recipes
 */
export async function tagsArrayUpdate(array) {
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

/**
 * display on the DOM all the recipes from an array of recipes
 * @param {object} arrayRecipes array with the list of recipes to show
 */
export async function displayRecipesCard(arrayRecipes) {
  arrayRecipes.forEach((recipeData) => {
    const recipeCard = new RecipesCard(recipeData).createRecipeCard();
    recipesSection.appendChild(recipeCard);
  });
}

/**
 * creates an array of tags based on the list of recipes and manages the tag display functions in the DOM
 * @param {object} arrayRecipes array with the list of recipes to show
 */
export async function displayTagsCard(arrayRecipes) {
  await tagsArrayUpdate(arrayRecipes);
  await tagInit(ingredientsArray, ingredientsTagList);
  await tagInit(appliancesArray, appliancesTagList);
  await tagInit(ustensilsArray, ustensilsTagList);
  await userSelectTagInTagList(ingredientsTagList);
  await userSelectTagInTagList(appliancesTagList);
  await userSelectTagInTagList(ustensilsTagList);
}

/**
 * remove all recipes card & tags list from the DOM
 */
export function removeDOMElements() {
  //remove all recipes card & tags list
  recipesSection.innerHTML = '';
  ingredientsTagList.innerHTML = '';
  appliancesTagList.innerHTML = '';
  ustensilsTagList.innerHTML = '';
}

/**
 * display an error message on DOM if the recipes array is empty
 * @param {object} recipesArray array with the list of recipes to show
 */
export function displayErrorMessageWhenNoRecipes(recipesArray) {
  if ((recipesArray && recipesArray.length === 0) || !recipesArray) {
    const errorMessage = ` Aucune recette ne correspond à votre critère… vous pouvez
chercher « tarte aux pommes », « poisson », etc.
`;
    recipesSection.innerHTML = `<p class="error-message"> ${errorMessage}</p>
  `;
  }
}

/**
 * initialization of index page
 */
async function init() {
  await fetchDataRecipes();
  await displayRecipesCard(recipesArray);

  //tag initialization
  await openTagList();
  await closeTagList();
  await displayTagsCard(recipesArray);
}

init();

//event listener

//searchbar
searchBar.addEventListener('input', async (e) => {
  e.preventDefault();
  if (e.target.value.length >= 3) {
    // result = recipesArray;
    await fetchDataRecipes();
    recipesArray = await searchAll();
    //remove all recipes card & tags list
    if (recipesArray.length > 0) {
      removeDOMElements();
      await displayRecipesCard(recipesArray);
      await displayTagsCard(recipesArray);
    } else {
      removeDOMElements();
      await displayErrorMessageWhenNoRecipes(recipesArray);
    }
  } else {
    await fetchDataRecipes();
    let resultIfTagsSelected = await searchAll();
    removeDOMElements();
    await displayRecipesCard(resultIfTagsSelected);
    await displayTagsCard(resultIfTagsSelected);
  }
});

searchBar.addEventListener('keydown', (e) => {
  if (searchBar.value !== '' && e.keyCode === 13) {
    e.preventDefault();
    console.log(recipesArray);
  }
});

//ingredient tag input
ingredientsTagInput.addEventListener('input', async (e) => {
  //remove  tags in ingredient list
  ingredientsTagList.innerHTML = '';
  //variables
  let userTag = e.target.value;
  let tagListResult = [];
  //update tag ingredient tag list
  tagListResult = searchByTags(userTag, ingredientsArray);
  if (tagListResult.length === 0) {
    const errorMessage = `Aucun ingrédient correspondant`;
    ingredientsTagList.innerHTML = `<span>${errorMessage}</span>
  `;
  } else {
    tagInit(tagListResult, ingredientsTagList);
    userSelectTagInTagList(ingredientsTagList);
  }
});

ingredientsTagInput.addEventListener('keydown', async (e) => {
  if (ingredientsTagInput.value !== '' && e.keyCode === 13) {
    //variables
    let userTag = e.target.value;
    let tagListResult = [];
    //update tag ingredient tag list
    tagListResult = searchByTags(userTag, appliancesArray);
    if (tagListResult.length !== 0) {
      // tag creation
      const tagElement = new TagCardAdaptater(
        e.target.value,
        'ingredientsList'
      ).createTagCardbyType();
      tagSection.appendChild(tagElement);

      let tagsSelectedArray = await tagListRecuperationForSearchByTag();
      console.log(tagsSelectedArray);

      //listener in case user close the selected tag
      closeTaginTagSelection();

      //update search
      let resultIfTagsSelected = await searchAll();
      removeDOMElements();
      await displayRecipesCard(resultIfTagsSelected);
      await displayTagsCard(resultIfTagsSelected);
      //close tag list
      e.target.closest('.keyWords').firstElementChild.children[0].value = '';
      e.target.closest('.keyWords').classList.toggle('hidden');
      e.target
        .closest('.filter-container')
        .firstElementChild.classList.toggle('hidden');
      e.target.value = '';
    }
  }
});

//appliances tag input
appliancesTagInput.addEventListener('input', async (e) => {
  //remove  tags in ingredient list
  appliancesTagList.innerHTML = '';
  //variables
  let userTag = e.target.value;
  let tagListResult = [];
  //update tag ingredient tag list
  tagListResult = searchByTags(userTag, appliancesArray);
  if (tagListResult.length === 0) {
    const errorMessage = `Aucun appareil correspondant`;
    appliancesTagList.innerHTML = `<span>${errorMessage}</span>
  `;
  } else {
    tagInit(tagListResult, appliancesTagList);
    userSelectTagInTagList(appliancesTagList);
  }
});

appliancesTagInput.addEventListener('keydown', async (e) => {
  if (appliancesTagInput.value !== '' && e.keyCode === 13) {
    //variables
    let userTag = e.target.value;
    let tagListResult = [];
    //update tag ingredient tag list
    tagListResult = searchByTags(userTag, appliancesArray);
    if (tagListResult.length !== 0) {
      // tag creation
      const tagElement = new TagCardAdaptater(
        e.target.value,
        'appliancesList'
      ).createTagCardbyType();
      tagSection.appendChild(tagElement);

      let tagsSelectedArray = await tagListRecuperationForSearchByTag();
      console.log(tagsSelectedArray);

      //listener in case user close the selected tag
      closeTaginTagSelection();

      //update search
      let resultIfTagsSelected = await searchAll();
      removeDOMElements();
      await displayRecipesCard(resultIfTagsSelected);
      await displayTagsCard(resultIfTagsSelected);
      //close tag list
      e.target.closest('.keyWords').firstElementChild.children[0].value = '';
      e.target.closest('.keyWords').classList.toggle('hidden');
      e.target
        .closest('.filter-container')
        .firstElementChild.classList.toggle('hidden');
      e.target.value = '';
    }
  }
});

//ustensils tag input
ustensilsTagInput.addEventListener('input', async (e) => {
  //remove  tags in ingredient list
  ustensilsTagList.innerHTML = '';
  //variables
  let userTag = e.target.value;
  let tagListResult = [];
  //update tag ingredient tag list
  tagListResult = searchByTags(userTag, ustensilsArray);
  if (tagListResult.length === 0) {
    const errorMessage = `Aucun ustensile correspondant`;
    ustensilsTagList.innerHTML = `<span>${errorMessage}</span>
  `;
  } else {
    tagInit(tagListResult, ustensilsTagList);
    userSelectTagInTagList(ustensilsTagList);
  }
});

ustensilsTagInput.addEventListener('keydown', async (e) => {
  if (ustensilsTagInput.value !== '' && e.keyCode === 13) {
    //variables
    let userTag = e.target.value;
    let tagListResult = [];
    //update tag ingredient tag list
    tagListResult = searchByTags(userTag, ustensilsArray);
    if (tagListResult.length !== 0) {
      // tag creation
      const tagElement = new TagCardAdaptater(
        e.target.value,
        'ustensilsList'
      ).createTagCardbyType();
      tagSection.appendChild(tagElement);
      let tagsSelectedArray = await tagListRecuperationForSearchByTag();
      console.log(tagsSelectedArray);

      //listener in case user close the selected tag
      closeTaginTagSelection();

      //update search
      let resultIfTagsSelected = await searchAll();
      removeDOMElements();
      await displayRecipesCard(resultIfTagsSelected);
      await displayTagsCard(resultIfTagsSelected);
      //close tag list
      e.target.closest('.keyWords').firstElementChild.children[0].value = '';
      e.target.closest('.keyWords').classList.toggle('hidden');
      e.target
        .closest('.filter-container')
        .firstElementChild.classList.toggle('hidden');
      e.target.value = '';
    }
  }
});

arr.forEach((i) => {
  if (
    i.includes('a') ||
    i.includes('b') ||
    i.includes('c') ||
    i.includes('d') ||
    i.includes('e') ||
    i.includes('f') ||
    i.includes('g')
  ) {
    a.push(i);
  }
});
