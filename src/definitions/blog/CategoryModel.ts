import CategoryDTO from "./CategoryDTO";

class CategoryModel {
  title: string;
  slug: string;
  color: string;
  constructor(category: CategoryDTO) {
    this.title = category.title;
    this.slug = category.slug;
    this.color = category.color;
  }
  toJSON() {
    return { ...this };
  }
}

export default CategoryModel;
