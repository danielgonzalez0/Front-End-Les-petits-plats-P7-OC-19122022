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
    // for (let i = recipesArray.length - 1; i >= 0; i--) {
    // //declaration counter to check if tag is valid
    // let countAppliancesValid = 0;
    // let countIngredientValid = 0;
    // let countUstentilsValid = 0;
    //search by ingredients
    //check if ingredient is included in a recipe

    // recipesArray.forEach((recipe) => {
    for (let i = recipesArray.length - 1; i >= 0; i--) {
      //declaration counter to check if tag is valid
      let countAppliancesValid = 0;
      let countIngredientValid = 0;
      let countUstensilsValid = 0;
      let ingredientsListLength = ingredientsList.length;
      //search by ingredients
      //check if ingredient is included in a recipe
      if (ingredientsList.length > 0) {
        ingredientsList.forEach((ingredientTag) => {
          recipesArray[i].ingredients.forEach((ingredient) => {
            if (
              ingredient.ingredient
                .toLowerCase()
                .includes(ingredientTag.name.toLowerCase())
            ) {
              countIngredientValid++;
            }
          });
        });
      } else {
        countIngredientValid = 1;
      }
      //search by appliances
      //check if apppliance is included in a recipe
      if (appliancesList.length > 0) {
        appliancesList.forEach((applianceTag) => {
          if (
            recipesArray[i].appliance
              .toLowerCase()
              .includes(applianceTag.name.toLowerCase())
          ) {
            countAppliancesValid++;
          }
        });
      } else {
        countAppliancesValid = 1;
      }
      //search by ustensils
      //check if ustensil is included in a recipe
      if (ustensilsList.length > 0) {
        ustensilsList.forEach((ustensilTag) => {
          recipesArray[i].ustensils.forEach((ustensil) => {
            if (
              ustensil.toLowerCase().includes(ustensilTag.name.toLowerCase())
            ) {
              countUstensilsValid++;
            }
          });
        });
      } else {
        countUstensilsValid = 1;
      }
      //delete recipe if one counter = 0
      if (
        (ingredientsList.length > 0 &&
          countIngredientValid != ingredientsList.length) ||
        (appliancesList.length > 0 &&
          countAppliancesValid != appliancesList.length) ||
        (ustensilsList.length > 0 &&
          countUstensilsValid != ustensilsList.length)
      ) {
        recipesArray.splice(i, 1);
      }
    } //end loop recipesArray
  }
  return recipesArray;
};
