/**
 * search the recipes that match with the keywords registered by the user
 * @param {string} keyword keywords enter by the user
 * @param {object} recipesArray array with all the recipes come from the API
 * @returns an array with the search result
 */

export function searchRecipesByKeywords(keyword, recipesArray) {
  if (keyword.length >= 3) {
    let resultSearchArray = [];
    //search by name
    for (let i = 0; i < recipesArray.length; i++) {
      if (recipesArray[i].name.toLowerCase().includes(keyword.toLowerCase())) {
        resultSearchArray.push(recipesArray[i]);
        //search by description
      } else if (
        recipesArray[i].description
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ) {
        resultSearchArray.push(recipesArray[i]);
        //search by ingredients
      } else {
        for (let j = 0; j < recipesArray[i].ingredients.length; j++) {
          if (
            recipesArray[i].ingredients[j].ingredient
              .toLowerCase()
              .includes(keyword.toLowerCase()) &&
            !resultSearchArray.includes(recipesArray[i])
          ) {
            resultSearchArray.push(recipesArray[i]);
          }
        }
      }
    } //end boucle for
    return resultSearchArray;
  }
}

//tags functions

/**
 * filter a tag table according to tag user input 
 * @param {string} userTag keywords enter by the user
 * @param {object} tagsArray updated table with all tags
 * @param {object} resultArray tags array updated with the search result
 * @returns an array with the search result
 */
export const searchByTags = (userTag, tagsArray) => {
  let result = tagsArray.filter((tag) =>
    tag.toLowerCase().includes(userTag.toLowerCase())
  );
  return result;
};


/**
 * search all recipes in a list of recipes containing the ingredients required by user
 * @param {string} userTag keywords enter by the user
 * @param {object} ingredientsList array with a list of ingredients
 * @param {object} recipesArray  array with a list of recipe
 * @returns a new recipe list containing the required ingredients
 */
export const searchByIngredients = (userTag, ingredientsList, recipesArray) => {
  let newRecipesArray = [];
  for (let i = 0; i < ingredientsList.length; i++) {
    recipesArray.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (
          ingredient.ingredient.toLowerCase().includes(userTag.toLowerCase()) &&
          !newRecipesArray.includes(recipe)
        ) {
          newRecipesArray.push(recipe);
        }
      });
    });
  }
  return newRecipesArray;
};
