
export const selectedTagSection = document.querySelector('.tag-section');

/**
 * create a list of specific tag selected by user for the research
 * @return an array with all the tags selected
 */
export async function tagListRecuperationForSearchByTag() {
  let selectedIngredientTable = [];
  for (let i = 0; i < selectedTagSection.children.length; i++) {
    switch (selectedTagSection.children[i].dataset.tagtype) {
      case 'ingredients':
        selectedIngredientTable.push({
          name: selectedTagSection.children[i].dataset.tagname,
          type: 'ingredient',
        });
        break;
      //a completer avec les cas appareils et ustentils
      case 'appliances':
        selectedIngredientTable.push({
          name: selectedTagSection.children[i].dataset.tagname,
          type: 'appliance',
        });
        break;
      case 'ustensils':
        selectedIngredientTable.push({
          name: selectedTagSection.children[i].dataset.tagname,
          type: 'ustensil',
        });
        break;
    }
  }
  return selectedIngredientTable
}


