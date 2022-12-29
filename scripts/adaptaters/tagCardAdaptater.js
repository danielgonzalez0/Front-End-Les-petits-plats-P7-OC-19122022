import { TagsCard } from '../templates/tagsCard.js';

export class TagCardAdaptater {
  constructor(tag, tagType) {
    this.tag = tag;
    this.tagType = tagType;
  }

   createTagCardbyType() {
    const div = new TagsCard(this.tag).createCard()
    switch (this.tagType) {
      case 'ingredientsList':
        div.classList.add('ingredientsTag');
        return div;
      case 'appliancesList':
        div.classList.add('appliancesTag');
        return div;
      case 'ustensilsList':
        div.classList.add('ustensilsTag');
        return div;
      default:
        console.log(`error: tagType undefined`);
        break;
    }
  }
}
