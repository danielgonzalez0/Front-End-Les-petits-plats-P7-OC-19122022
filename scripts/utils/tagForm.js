import { ingredientsArray } from '../pages/index.js';
const tagBtn = document.querySelectorAll('.filter-btn');
const svgTagList = document.querySelectorAll('.svg-container');

/**
 * open tag list and hide tag button
 */

export const openTagList = () => {
  tagBtn.forEach((button) => {
    const element = button.nextElementSibling;
    button.addEventListener('click', () => {
      button.classList.add('hidden');
      element.classList.remove('hidden');
    });
  });
};

/**
 * close tag list and show tag button
 */

export const closeTagList = () => {
  svgTagList.forEach((svg) => {
    const button = svg.closest('.keyWords').previousElementSibling;
    const tagList = svg.closest('.keyWords');
    svg.addEventListener('click', () => {
      tagList.classList.add('hidden');
      button.classList.remove('hidden');
    });
  });
};

export async function tagUpdate() {
  console.log(ingredientsArray);
}
