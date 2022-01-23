<template>
  <div>
    <SectionTitle :user="user">Contactame</SectionTitle>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <div class="flex items-center mb-4">
          <Icon name="PhoneIcon" class="mr-3" />
          <div>
            <span class="text-lg">Telefono</span> <br />
            <span class="text-sm text-gray-500">{{ user.aboutMe?.phone }}</span>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <Icon name="MailIcon" class="mr-3" />
          <div>
            <span class="text-lg">Email</span> <br />
            <span class="text-sm text-gray-500">{{ user.email }}</span>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <Icon name="LocationMarkerIcon" class="mr-3" />
          <div>
            <span class="text-lg">Ubicación</span> <br />
            <span class="text-sm text-gray-500">{{
              user.aboutMe?.address
            }}</span>
          </div>
        </div>

        <div class="flex items-center mb-4">
          <Icon name="GlobeAltIcon" class="mr-3" />
          <div>
            <span class="text-lg">Redes sociales</span> <br />
            <template
              :key="sn.link + sn.order"
              v-for="sn in user?.socialNetworks"
            >
              <a
                v-if="sn.link.length"
                class="mr-4 last:mr-0 w-6 flex items-center justify-center justify-items-center"
                :href="sn.link"
                target="_blank"
              >
                <component :is="getSocialNetworkIconComponent(sn.name)" />
              </a>
            </template>
          </div>
        </div>
      </div>

      <div>
        <Form :form="ContactMeForm()" @form:onSubmit="submit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import SectionTitle from "./SectionTitle.vue";
import ContactMeForm from "@/config/ContactMeForm";
import Icon from "@/components/common/Icon.vue";
import { getSocialNetworkIconComponent } from "@/utils/socialNetwork";

export default defineComponent({
  components: { SectionTitle, Icon },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup() {
    function submit(data: any) {
      console.log(data);
    }

    return { ContactMeForm, submit, getSocialNetworkIconComponent };
  },
});
</script>
