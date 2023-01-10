import { TagCardAdaptater } from '../adaptaters/tagCardAdaptater.js';
import {
  appliancesArray,
  appliancesTagList,
  displayRecipesCard,
  ingredientsArray,
  ingredientsTagList,
  recipesArray,
  recipesSection,
  tagsArrayUpdate,
  updatedRecipesArray,
  ustensilsArray,
  ustensilsTagList,
} from '../pages/index.js';
import { searchByIngredients } from './searchByKeywords.js';
import { tagInit } from './tagForm.js';
import { tagListRecuperationForSearchByTag } from './tagListRecuperation.js';
// import { ingredientsTagList } from '../pages/index.js';

//variables declaration
export const tagSection = document.querySelector('.tag-section');

/**
 * create the tag selected by user and get close event available
 * @param {HTMLElement} HTMLList  list of tag in HTML page
 */
export async function userSelectTagInTagList(HTMLList) {  ;
  let tagElement;
  for (let i = 0; i < HTMLList.children.length; i++) {
    HTMLList.children[i].addEventListener('click', async (e) => {
      const tagSelected = e.target.dataset.tagname;
      const tagType = e.target.dataset.tagtype;
      tagElement = new TagCardAdaptater(
        tagSelected,
        tagType
      ).createTagCardbyType();
      tagSection.appendChild(tagElement);
      //listen event to close tag on click
      closeTaginTagSelection();
      //search recipes
      let updatedRecipesArray = searchByIngredients(
        tagSelected,
        ingredientsArray,
        recipesArray
      );
      //remove all recipes card & tags list
      // recipesSection.innerHTML = '';
      // ingredientsTagList.innerHTML = '';
      // appliancesTagList.innerHTML = '';
      // ustensilsTagList.innerHTML = '';
      //update other tag lists && card recipes
      tagListRecuperationForSearchByTag();
      // displayRecipesCard(updatedRecipesArray);
      // await tagsArrayUpdate(updatedRecipesArray);
      // console.log(updatedRecipesArray);
      // console.log(ingredientsArray);
      // await tagInit(ingredientsArray, ingredientsTagList);
      // await tagInit(appliancesArray, appliancesTagList);
      // await tagInit(ustensilsArray, ustensilsTagList);
      // userSelectTagInTagList(ingredientsTagList);
      // await userSelectTagInTagList(appliancesTagList);
      // await userSelectTagInTagList(ustensilsTagList);
      // //test
      // console.log(recipesArray);
      // console.log(updatedRecipesArray);
    });
  }
}

/**
 * close tag in tagSelection on click
 */
export function closeTaginTagSelection() {
  let tagElements = document.querySelectorAll('.tag-container');
  tagElements.forEach((tag) => {
    tag.lastElementChild.addEventListener('click', () => {
      tag.remove();
    });
  }); //end event listener
}
