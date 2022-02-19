import sanityClient from "@sanity/client";
const client = sanityClient({
  projectId: "0hiptrvh",
  dataset: "production",
  apiVersion: "2021-03-25", // use current UTC date - see "specifying API version"!
  token:
    "skpeKr0jijSLYdj8CoihkLDZ5qrkkbaLAZ8EyyPY9mrG3iOF0W2Uqv4FUAIAe3Tv9KI8mti7yB5cpNs6mAADxpkYnqOLMCy3A6EY5C97Es5RuAXD4IwnmTGPU8jTguEo86GPSFKYP5Ggu1rflj37uGdiZ3Ouw3ACoZMagEoY07tH3Dzhgxih", // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

const query = '*[_type == "post" ] {title, body}';

async function fetch() {
  const data = await client.fetch(query);
  console.log(data);
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useSanity() {
  return { fetch };
}

export default useSanity;
