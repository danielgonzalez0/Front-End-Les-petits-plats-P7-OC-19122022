import { TagCardAdaptater } from '../adaptaters/tagCardAdaptater.js';
import {
  displayErrorMessageWhenNoRecipes,
  displayRecipesCard,
  displayTagsCard,
  recipesArray,
  removeDOMElements,
} from '../pages/index.js';
import { searchAll } from './searchAll.js';

//variables declaration
export const tagSection = document.querySelector('.tag-section');

/**
 * create the tag selected by user and get all listener events available
 * @param {HTMLElement} HTMLList  list of tag in HTML page
 */
export async function userSelectTagInTagList(HTMLList) {
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
      //launch research functions
      let recipesArray = await searchAll();
      //display DOM elements
      await displayErrorMessageWhenNoRecipes(recipesArray);
      await removeDOMElements();
      await displayRecipesCard(recipesArray);
      await displayTagsCard(recipesArray);
    });
  } //end addeventlistener
}

/**
 * close tag in tagSelection on click & update research
 */
export function closeTaginTagSelection() {
  let tagElements = document.querySelectorAll('.tag-container');
  tagElements.forEach((tag) => {
    tag.lastElementChild.addEventListener('click', async () => {
      tag.remove();
      //launch research functions
      let recipesArray = await searchAll();
      //display DOM elements
      await displayErrorMessageWhenNoRecipes(recipesArray);
      await removeDOMElements();
      await displayRecipesCard(recipesArray);
      await displayTagsCard(recipesArray);
    });
  }); //end event listener
}
