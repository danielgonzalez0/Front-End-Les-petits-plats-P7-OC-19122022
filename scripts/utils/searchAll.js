//importation
import { fetchDataRecipes, recipesArray, searchBar } from '../pages/index.js';
import { searchRecipesByKeywords } from './searchByKeywords.js';
import { advancedSearchByTags } from './searchByTags.js';
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

  //search by tags

  advancedSearchByTags(
    ingredientSelected,
    appliancesSelected,
    ustensilsSelected,
    recipesResult
  );

  return recipesResult;
};
