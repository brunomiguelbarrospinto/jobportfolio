<template>
  <div>
    <Navbar class="sticky">
      <template #left-section>
        <div class="flex items-center">
          <div class="h-8 w-8 rounded-full bg-gray-500">
            <img
              v-if="user.aboutMe"
              ref="profileDropdown"
              class="h-full w-full rounded-full"
              :src="user.aboutMe.photo"
              alt=""
            />
          </div>
          <div class="ml-3">
            {{ user.aboutMe?.name }} {{ user.aboutMe?.lastNames }}
          </div>
        </div>
      </template>
      <template #right-section><LocaleDropdown /> </template>
    </Navbar>
    <div class="container mx-auto max-w-4xl px-3">
      <Banner :user="user" />

      <div class="grid grid-cols-3 gap-12">
        <div class="col-span-2">
          <component
            :is="m.component"
            :key="`first-column-${m.id}`"
            :id="`${m.id}`"
            v-for="m in firstColumn"
            :user="user"
            class="mb-12"
          />
        </div>

        <div>
          <component
            :is="m.component"
            :key="`second-column-${m.id}`"
            :id="`${m.id}`"
            v-for="m in secondColumn"
            :user="user"
            class="mb-12"
          />
        </div>
      </div>

      <component
        :is="m.component"
        :key="`module-${m.id}`"
        :id="`${m.id}`"
        v-for="m in modules"
        :user="user"
        class="mb-12"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import Navbar from "@/components/navbar/Navbar.vue";
import Banner from "@/components/Banner.vue";
import Languages from "./components/Languages.vue";
import Studies from "./components/Studies.vue";
import Knowledge from "./components/Knowledge.vue";
import Experiences from "./components/Experiences.vue";
import Projects from "./components/Projects.vue";
import ContactMe from "./components/ContactMe.vue";
import LocaleDropdown from "@/components/common/LocaleDropdown.vue";

export default defineComponent({
  components: {
    Navbar,
    Banner,
    LocaleDropdown,
  },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup() {
    const modules = [
      {
        id: "contact-me",
        linkText: "Contactame",
        component: ContactMe,
      },
    ];

    const firstColumn = [
      {
        id: "experiences",
        linkText: "Experiencias",
        component: Experiences,
      },
      {
        id: "projects",
        linkText: "Proyectos",
        component: Projects,
      },
    ];

    const secondColumn = [
      {
        id: "studies",
        linkText: "Estudios",
        component: Studies,
      },

      {
        id: "knowledge",
        linkText: "Conocimientos",
        component: Knowledge,
      },
      {
        id: "languages",
        linkText: "Idiomas",
        component: Languages,
      },
    ];
    return {
      modules,
      firstColumn,
      secondColumn,
    };
  },
});
</script>
