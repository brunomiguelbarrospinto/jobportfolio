<template>
  <component v-if="isMounted" class="w-5 h-5 inline" :is="heroicon" />
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
export default defineComponent({
  props: {
    // https://heroicons.com
    // https://github.com/tailwindlabs/heroicons
    name: String, // Prop "name" must be in PascalCase like "ArrowSmLeft"
    type: { type: String, default: "solid" }, // solid || outline
  },
  setup(props) {
    const isMounted = ref(false);
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const heroicon = require(`@heroicons/vue/${props.type}`)[
      props.name + "Icon"
    ]();
    onMounted(() => (isMounted.value = true));
    return {
      isMounted,
      heroicon,
    };
  },
});
</script>
