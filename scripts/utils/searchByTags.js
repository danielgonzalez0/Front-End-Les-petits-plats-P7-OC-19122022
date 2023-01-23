//tags functions

/**
 * filter a tag table according to tag user input
 * @param {string} userTag keywords enter by the user
 * @param {object} tagsArray updated table with all tags
 * @returns an array with the search result
 */
export const searchByTags = (userTag, tagsArray) => {
  let result = tagsArray.filter((tag) =>
    tag.toLowerCase().includes(userTag.toLowerCase())
  );
  return result;
};

/**
 *filter a list of recipes according to tags selected by users
 * @param {object} ingredientsList array with all ingredients selected by the user
 * @param {object} appliancesList array with all appliances selected by the user
 * @param {object} ustensilsList array with all ustensils selected by the user
 * @param {object} recipesArray list of recipes to filter
 * @returns
 */
export const advancedSearchByTags = async (
  ingredientsList,
  appliancesList,
  ustensilsList,
  recipesArray
) => {
  if (recipesArray.length > 0) {
    loopRecipes: for (let i = recipesArray.length - 1; i >= 0; i--) {
      //search by ingredients
      //check if ingredient is included in a recipe
      if (ingredientsList.length > 0) {
        for (let j = 0; j < ingredientsList.length; j++) {
          let countIngredientValid = 0;
          recipesArray[i].ingredients.forEach((ingredient) => {
            if (
              ingredient.ingredient
                .toLowerCase()
                .includes(ingredientsList[j].name.toLowerCase())
            ) {
              countIngredientValid++;
            }
          });
          if (countIngredientValid === 0) {
            recipesArray.splice(i, 1);
            continue loopRecipes;
          }
        }
      }
      //search by appliances
      //check if apppliance is included in a recipe
      if (appliancesList.length > 0) {
        let countAppliancesValid = 0;
        appliancesList.forEach((applianceTag) => {
          countAppliancesValid = 0;
          if (
            recipesArray[i].appliance
              .toLowerCase()
              .includes(applianceTag.name.toLowerCase())
          ) {
            countAppliancesValid++;
          }
        });
        if (countAppliancesValid === 0) {
          recipesArray.splice(i, 1);
          continue loopRecipes;
        }
      }
      //search by ustensils
      //check if ustensil is included in a recipe
      if (ustensilsList.length > 0) {
        for (let j = 0; j < ustensilsList.length; j++) {
          let countUstensilsValid = 0;
          recipesArray[i].ustensils.forEach((ustensil) => {
            if (
              ustensil
                .toLowerCase()
                .includes(ustensilsList[j].name.toLowerCase())
            ) {
              countUstensilsValid++;
            }
          });
          if (countUstensilsValid === 0) {
            recipesArray.splice(i, 1);
            continue loopRecipes;
          }
        }
      }
    } //end loop recipesArray
  }
  return recipesArray;
};
