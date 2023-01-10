import { TagsCard } from '../templates/tagsCard.js';

export class TagCardAdaptater {
  constructor(tag, tagType) {
    this.tag = tag;
    this.tagType = tagType;
  }

  createTagCardbyType() {
    const div = new TagsCard(this.tag).createCard();
    switch (this.tagType) {
      case 'ingredientsList':
        div.classList.add('ingredientsTag');
        div.setAttribute('data-tagName', this.tag);
        div.setAttribute('data-tagType', 'ingredients');
        return div;
      case 'appliancesList':
        div.classList.add('appliancesTag');
        div.setAttribute('data-tagName', this.tag);
        div.setAttribute('data-tagType', 'appliances');
        return div;
      case 'ustensilsList':
        div.classList.add('ustensilsTag');
        div.setAttribute('data-tagName', this.tag);
        div.setAttribute('data-tagType', 'ustentils');
        return div;
      default:
        console.log(`error: tagType undefined`);
        break;
    }
  }
}
