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
 * filter a list of recipes according to tags selected by users
 * @param {object} ingredientsList array with all ingredients selected by the user
 * @param {object} appliancesList array with all appliances selected by the user
 * @param {object} ustensilsList array with all ustensils selected by the user
 * @param {object} recipesArray list of recipes to filter
 * @returns an array with the search result
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
          for (let k = 0; k < recipesArray[i].ingredients.length; k++) {
            if (
              recipesArray[i].ingredients[k].ingredient
                .toLowerCase()
                .includes(ingredientsList[j].name.toLowerCase())
            ) {
              countIngredientValid++;
            }
          } //end loop ingredients
          if (countIngredientValid === 0) {
            recipesArray.splice(i, 1);
            continue loopRecipes;
          }
        }
      } //end loop ingredients tag list

      //search by appliances
      //check if apppliance is included in a recipe
      if (appliancesList.length > 0) {
        let countAppliancesValid = 0;
        for (let j = 0; j < appliancesList.length; j++) {
          if (
            recipesArray[i].appliance
              .toLowerCase()
              .includes(appliancesList[j].name.toLowerCase())
          ) {
            countAppliancesValid++;
          }
        }
        if (countAppliancesValid === 0) {
          recipesArray.splice(i, 1);
          continue loopRecipes;
        }
      } //end loop appliances tags

      //search by ustensils
      if (ustensilsList.length > 0) {
        for (let j = 0; j < ustensilsList.length; j++) {
          let countUstentilsValid = 0;
          for (let k = 0; k < recipesArray[i].ustensils.length; k++) {
            if (
              recipesArray[i].ustensils[k]
                .toLowerCase()
                .includes(ustensilsList[j].name.toLowerCase())
            ) {
              countUstentilsValid++;
            }
          } //end loop ustensils
          if (countUstentilsValid === 0) {
            recipesArray.splice(i, 1);
            continue loopRecipes;
          }
        }
      } //end loop ustentils tag
    } //end loop recipes
  }
  return recipesArray;
};

// /**
//  * filter a list of recipes according to a list of ingredients
//  * @param {object} ingredientsList array with all the selected ingredients for the research
//  * @param {object} recipesArray list of recipes to filter
//  */
// export const searchByIngredients = async (ingredientsList, recipesArray) => {
//   if (ingredientsList.length > 0) {
//     ingredientsList.forEach((ingredientTag) => {
//       recipesArray = recipesArray.filter((recipe) => {
//         return recipe.ingredients.some((ingredient) =>
//           ingredient.ingredient
//             .toLowerCase()
//             .includes(ingredientTag.name.toLowerCase())
//         );
//       }); //end filter
//     });
//     return recipesArray;
//   } else {
//     return recipesArray;
//   }
// };

// /**
//  * filter a list of recipes according to a list of appliances
//  * @param {object} appliancesList array with all the selected appliances for the research
//  * @param {object} recipesArray list of recipes to filter
//  */
// export const searchByAppliances = async (appliancesList, recipesArray) => {
//   if (appliancesList.length > 0) {
//     appliancesList.forEach((applianceTag) => {
//       recipesArray = recipesArray.filter((recipe) => {
//         return recipe.appliance
//           .toLowerCase()
//           .includes(applianceTag.name.toLowerCase());
//       }); //end filter
//     });
//     return recipesArray;
//   } else {
//     return recipesArray;
//   }
// };

// /**
//  * filter a list of recipes according to a list of ustensils
//  * @param {object} ustensilsList array with all the selected ustensils for the research
//  * @param {object} recipesArray list of recipes to filter
//  */
// export const searchByUstensils = async (ustensilsList, recipesArray) => {
//   if (ustensilsList.length > 0) {
//     ustensilsList.forEach((ustensilTag) => {
//       recipesArray = recipesArray.filter((recipe) => {
//         return recipe.ustensils.some((ustensil) =>
//           ustensil.toLowerCase().includes(ustensilTag.name.toLowerCase())
//         );
//       }); //end filter
//     });
//     return recipesArray;
//   } else {
//     return recipesArray;
//   }
// };
