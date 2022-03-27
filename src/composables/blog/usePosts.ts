import useSanity from "./useSanity";
import PostDTO from "@/definitions/blog/PostDTO";
import PostModel from "@/definitions/blog/PostModel";
import { ref, Ref } from "vue";
const posts: Ref<PostModel[] | []> = ref([]);

function usePosts() {
  const { fetchData } = useSanity();

  const query = `*[_type == "post"  ]
    {
      title ,
      "slug": slug.current,
      publishedAt, 
      categories[]->{
        title,
        "color": color.hex,
        "slug": slug.current
      },
      "mainImage": mainImage.asset->url,
      author->{
        name,
        "image": image.asset->url
      }

    }`;

  async function fetchPosts(): Promise<void> {
    const response = await fetchData<PostDTO[]>(query);
    posts.value = response.map((d) => new PostModel(d));
  }

  return { fetchPosts, posts };
}

export default usePosts;
