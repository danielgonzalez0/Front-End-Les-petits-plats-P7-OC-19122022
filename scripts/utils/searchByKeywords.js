/**
 * search the recipes that match with the keywords registered by the user
 * @param {string} keyword keywords enter by the user
 * @param {object} recipesArray array with all the recipes come from the API 
 * @returns an array with the search result
 */

export function searchRecipesByKeywords(keyword, recipesArray) {
  if (keyword.length >= 3) {
    let resultSearchArray = [];
    for (let i = 0; i < recipesArray.length; i++) {
      if (recipesArray[i].name.toLowerCase().includes(keyword.toLowerCase())) {
        resultSearchArray.push(recipesArray[i]);
      } else if (
        recipesArray[i].description
          .toLowerCase()
          .includes(keyword.toLowerCase())
      ) {
        resultSearchArray.push(recipesArray[i]);
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
