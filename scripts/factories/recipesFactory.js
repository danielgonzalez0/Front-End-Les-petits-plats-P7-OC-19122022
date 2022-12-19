import { Recipes } from '../models/recipes.js';

export class RecipesFactory {
  constructor(data, type) {
    if (type === 'json') {
      return new Recipes(data);
    } else {
      throw 'Unknown type format';
    }
  }
}
