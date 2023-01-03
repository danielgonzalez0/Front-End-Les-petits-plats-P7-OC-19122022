import { TagCardAdaptater } from '../adaptaters/tagCardAdaptater.js';
// import { ingredientsTagList } from '../pages/index.js';

//variables declaration
// const ingredientsTagInput = document.getElementById('keyWordsIngredients');
// const appliancesTagInput = document.getElementById('keyWordsAppliances');
// const ustentilsTagInput = document.getElementById('keyWordsUstensils');
const tagSection = document.querySelector('.tag-section');

/**
 * create the tag selected by user and get close event available
 * @param {HTMLElement} HTMLList  list of tag in HTML page
 */
export async function userSelectTagInTagList(HTMLList) {
  let tagElement;
  for (let i = 0; i < HTMLList.children.length; i++) {
    HTMLList.children[i].addEventListener('click', (e) => {
      const tagSelected = e.target.dataset.tagname;
      const tagType = e.target.dataset.tagtype;
      tagElement = new TagCardAdaptater(
        tagSelected,
        tagType
      ).createTagCardbyType();
      tagSection.appendChild(tagElement);
      //listen event to close tag on click
      closeTaginTagSelection();
    });
  }
}

/**
 * close tag in tagSelection on click
 */
function closeTaginTagSelection() {
  let tagElements = document.querySelectorAll('.tag-container');
  tagElements.forEach((tag) => {
    tag.lastElementChild.addEventListener('click', () => {
      tag.remove();
    });
  }); //end event listener
}
