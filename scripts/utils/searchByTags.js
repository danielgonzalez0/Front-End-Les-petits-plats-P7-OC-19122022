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
 * filter a list of recipes according to a list of ingredients
 * @param {object} ingredientsList array with all the selected ingredients for the research
 * @param {object} recipesArray list of recipes to filter
 */
export const searchByIngredients = async (ingredientsList, recipesArray) => {
  if (ingredientsList.length > 0) {
    ingredientsList.forEach((ingredientTag) => {
      recipesArray = recipesArray.filter((recipe) => {
        return recipe.ingredients.some((ingredient) =>
          ingredient.ingredient
            .toLowerCase()
            .includes(ingredientTag.name.toLowerCase())
        );
      }); //end filter
    });
    return recipesArray;
  } else {
    return recipesArray;
  }
};

/**
 * filter a list of recipes according to a list of appliances
 * @param {object} appliancesList array with all the selected appliances for the research
 * @param {object} recipesArray list of recipes to filter
 */
export const searchByAppliances = async (appliancesList, recipesArray) => {
  if (appliancesList.length > 0) {
    appliancesList.forEach((applianceTag) => {
      recipesArray = recipesArray.filter((recipe) => {
        return recipe.appliance
          .toLowerCase()
          .includes(applianceTag.name.toLowerCase());
      }); //end filter
    });
    return recipesArray;
  } else {
    return recipesArray;
  }
};

/**
 * filter a list of recipes according to a list of ustensils
 * @param {object} ustensilsList array with all the selected ustensils for the research
 * @param {object} recipesArray list of recipes to filter
 */
export const searchByUstensils = async (ustensilsList, recipesArray) => {
  if (ustensilsList.length > 0) {
    ustensilsList.forEach((ustensilTag) => {
      recipesArray = recipesArray.filter((recipe) => {
        return recipe.ustensils.some((ustensil) =>
          ustensil.toLowerCase().includes(ustensilTag.name.toLowerCase())
        );
      }); //end filter
    });
    return recipesArray;
  } else {
    return recipesArray;
  }
};
