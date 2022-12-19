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
   * get all recipes information data
   */

  async getRecipesData() {
    const data = await this.getDatafromApi();
    return data.recipes;
  }
}
