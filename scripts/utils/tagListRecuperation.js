import {
  fetchDataRecipes,
  recipesArray,
  updatedRecipesArray,
} from '../pages/index.js';

export const selectedTagSection = document.querySelector('.tag-section');

/**
 * create a list of specific tag selected by user for the research
 */
export async function tagListRecuperationForSearchByTag() {
  let selectedIngredientTable = [];
  let newRecipesArray = [];
  await fetchDataRecipes();
  for (let i = 0; i < selectedTagSection.children.length; i++) {
    switch (selectedTagSection.children[i].dataset.tagtype) {
      case 'ingredients':
        selectedIngredientTable.push(
          selectedTagSection.children[i].dataset.tagname
        );
        break;
      //a completer avec les cas appareils et ustentils
    }
  }

  if (selectedIngredientTable.length > 0) {
    selectedIngredientTable.forEach(async (ingredient) => {
      console.log(ingredient);
      console.log(recipesArray);
      await deleteRecipesInArrayListWhenTagNotIncluded(
        recipesArray,
        ingredient
      );
    });
  }
  console.log(recipesArray);
  console.log(newRecipesArray);
}

/**
 * delete a recipe from a list when a specific tag is not included
 * @param {object} recipesList array with a list of recipes
 * @param {string} ingredientTag specific ingredient to check
 */
export async function deleteRecipesInArrayListWhenTagNotIncluded(
  recipesList,
  ingredientTag
) {
  for (let i = recipesList.length - 1; i >= 0; i--) {
    let ingredientIncluded = false;
    for (let j = 0; j < recipesList[i].ingredients.length; j++) {
      if (
        recipesList[i].ingredients[j].ingredient
          .toLowerCase()
          .includes(ingredientTag.toLowerCase())
      ) {
        ingredientIncluded = true;
      }
    }
    if (!ingredientIncluded) {
      recipesList.pop();
    }
  }
}
