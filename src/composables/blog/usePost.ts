import useSanity from "./useSanity";
import PostDTO from "@/definitions/blog/PostDTO";
import PostModel from "@/definitions/blog/PostModel";
import { ref, Ref } from "vue";

function usePost() {
  const { fetchData } = useSanity();
  const query = ({ slug }) =>
    `*[_type == "post" && slug.current == "${slug}" ][0]
    {
      title ,
      "slug": slug.current,
      publishedAt, 
      body,
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
  const post: Ref<PostModel | null> = ref(null);

  async function fetchPost({ slug }): Promise<void> {
    const response = await fetchData<PostDTO>(query({ slug }));

    post.value = new PostModel(response);
  }
  return { fetchPost, post };
}

export default usePost;
