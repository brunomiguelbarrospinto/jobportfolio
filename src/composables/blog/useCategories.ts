import useSanity from "./useSanity";
import CategoryDTO from "@/definitions/blog/CategoryDTO";
import CategoryModel from "@/definitions/blog/CategoryModel";
import { ref, Ref } from "vue";
const categories: Ref<CategoryModel[] | []> = ref([]);

function useCategories() {
  const { fetchData } = useSanity();

  const query = `*[_type == "category"  ]
    {
        title ,
        "slug": slug.current,
        "color": color.hex,
    }`;

  async function fetchCategories(): Promise<void> {
    const response = await fetchData<CategoryDTO[]>(query);
    categories.value = response.map((d) => new CategoryModel(d));
  }

  return { fetchCategories, categories };
}

export default useCategories;
