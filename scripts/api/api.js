/**
 * return API url
 * @param {string} url: API url
 */

class Api {
  constructor(url) {
    this.url = url;
  }

  /**
   * get data from an API with the fetch method
   */

  async getDatafromApi() {
    return fetch(this.url)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => res)
      .catch(function (error) {
        console.log(`erreur : ${error}`);
      });
  }
} //end class Api

/**
 * return API url
 * @param {string} url: API url
 */

export class RecipesApi extends Api {
  constructor(url) {
    super(url);
  }

  /**
   * get all recipes information data & creates an array with all recipes
   * @returns an array with all the recipes datas
   */

  async getRecipesData() {
    const data = await this.getDatafromApi();
    let newArray = [];
    data.recipes.forEach((recipe) => {
      newArray.push(recipe);
    });
    return newArray;
  }
}
