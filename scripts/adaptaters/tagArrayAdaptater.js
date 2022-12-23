export class TagArrayAdaptater {
  constructor(array, tagType) {
    this.array = array;
    this.tagType = tagType;

    /**
     * create an array with all the ingredients
     * @param {array} array with the recipes datas from the API
     * @returns an array with all the ingredients
     */
  }
  async getAllIngredients() {
    let ingredientsList = [];
    this.array.forEach((index) => {
      index.ingredients.forEach((ingredient) => {
        if (!ingredientsList.includes(ingredient.ingredient)) {
          ingredientsList.push(ingredient.ingredient);
        }
      });
    });
    return ingredientsList;
  }
  /**
   * create an array with all the appliances
   * @param {array} array with the recipes datas from the API
   * @returns an array with all the appliances
   */

  async getAllAppliances() {
    let appliancesList = [];
    this.array.forEach((index) => {
      if (!appliancesList.includes(index.appliance)) {
        appliancesList.push(index.appliance);
      }
    });
    return appliancesList;
  }

  /**
   * create an array with all the ustentils
   * @param {array} array with the recipes datas from the API
   * @returns an array with all the ustentils
   */
  async getAllUstentils() {
    let ustensilList = [];
    this.array.forEach((index) => {
      index.ustensils.forEach((ustentil) => {
        if (!ustensilList.includes(ustentil)) {
          ustensilList.push(ustentil);
        }
      });
    });
    return ustensilList;
  }

  /**
   * adaptater that return a list of specifics tag
   * @returns a list of tags
   */
  async getAlltagsAdaptater() {
    switch (this.tagType) {
      case 'ingredients':
        return this.getAllIngredients();
      case 'appliances':
        return this.getAllAppliances();
      case 'ustentils':
        return this.getAllUstentils();
      default:
        console.log(`error: tagType undefined`);
        break;
    }
  }
}
