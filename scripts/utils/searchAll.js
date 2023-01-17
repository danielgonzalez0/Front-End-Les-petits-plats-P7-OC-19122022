//importation
import { fetchDataRecipes, recipesArray, searchBar } from '../pages/index.js';
import { searchRecipesByKeywords } from './searchByKeywords.js';
import {
  advancedSearchByTags,
  searchByAppliances,
  searchByIngredients,
  searchByUstensils,
} from './searchByTags.js';
import { tagListRecuperationForSearchByTag } from './tagListRecuperation.js';

/**
 * combination of search by keywords and search by tags and return a list of recipes
 */
export const searchAll = async () => {
  //appel fetch + searchBykeywords
  await fetchDataRecipes();
  let recipesResult = [];
  if (searchBar.value.length < 3) {
    recipesResult = recipesArray;
  } else {
    recipesResult = await searchRecipesByKeywords(
      searchBar.value,
      recipesArray
    );
  }
  console.log('********fonction sort all**********');
  console.log('-----step 1: appel api + searchByKeywords-----');
  console.log(recipesResult);

  //tags recuperatation
  let tagsSelectedArray = await tagListRecuperationForSearchByTag();
  let ingredientSelected = tagsSelectedArray.filter(
    (ingredient) => ingredient.type === 'ingredient'
  );
  let appliancesSelected = tagsSelectedArray.filter(
    (appliance) => appliance.type === 'appliance'
  );
  let ustensilsSelected = tagsSelectedArray.filter(
    (ustensil) => ustensil.type === 'ustensil'
  );
  console.log('-----step 2: recuperation des tags par type (3 tableaux)-----');
  console.log(ingredientSelected);
  console.log(appliancesSelected);
  console.log(ustensilsSelected);

  //search by tags

  console.log('-----step 3: filtre par tags-----');

  // recipesResult = await searchByIngredients(ingredientSelected, recipesResult);

  // console.log('-----résultat par ingrédients-----');
  // console.log(recipesResult);

  // recipesResult = await searchByAppliances(appliancesSelected, recipesResult);
  // console.log('-----résultat par appareils-----');
  // console.log(recipesResult);

  // recipesResult = await searchByUstensils(ustensilsSelected, recipesResult);

  // console.log('-----résultat par ustensils-----');
  advancedSearchByTags(
    ingredientSelected,
    appliancesSelected,
    ustensilsSelected,
    recipesResult
  );
  console.log(recipesResult);

  return recipesResult;
};
