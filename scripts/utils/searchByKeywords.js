/**
 * search the recipes that match with the keywords registered by the user
 * @param {string} keyword keywords enter by the user
 * @param {object} recipesArray array with all the recipes come from the API
 * @returns an array with the search result
 */
export async function searchRecipesByKeywords(keyword, recipesArray) {
  if (keyword.length >= 3) {
    let resultSearchArray = [];
    //search by name
    resultSearchArray = recipesArray.filter((recipe) => {
      return recipe.name.toLowerCase().includes(keyword.toLowerCase());
    });
    //search by description
    let resultSearchByDescription = recipesArray.filter((recipe) => {
      return recipe.description.toLowerCase().includes(keyword.toLowerCase());
    });
    resultSearchByDescription.forEach((recipe) => {
      if (!resultSearchArray.includes(recipe)) {
        resultSearchArray.push(recipe);
      }
    });
    //search by ingredients
    let resultSearchByIngredients = recipesArray.filter((recipe) => {
      return recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    resultSearchByIngredients.forEach((recipe) => {
      if (!resultSearchArray.includes(recipe)) {
        resultSearchArray.push(recipe);
      }
    });
    return resultSearchArray;
  }
}
