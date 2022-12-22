
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


/**
 * create a tag list and append it to the DOM
 * @param {array} tagArray array with the tag list
 * @param {HTMLElement} tagListElement HTML element parent of the tag list
 */

export async function tagInit(tagArray, tagListElement) {
  tagArray.forEach((tag) => {
    const element = document.createElement('li');
    element.setAttribute('tabindex', 0);
    element.setAttribute('data-tagName', tag);
    element.textContent = tag;
    tagListElement.appendChild(element);
  });
}
