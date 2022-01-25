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
        <Form
          ref="formRef"
          :form="ContactMeForm()"
          @form:onSubmit="submit"
          :isLoading="isLoading"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { UserInterface } from "@/definitions/entities/UserInterface";
import SectionTitle from "./SectionTitle.vue";
import ContactMeForm from "@/config/ContactMeForm";
import Icon from "@/components/common/Icon.vue";
import { getSocialNetworkIconComponent } from "@/utils/socialNetwork";
import emailjs from "@emailjs/browser";
import useNotifications from "@/composables/useNotifications";

export default defineComponent({
  components: { SectionTitle, Icon },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
    const isLoading = ref(false);
    const { pushNotification } = useNotifications();

    function submit(data: any) {
      isLoading.value = true;
      emailjs
        .send(
          "service_pnp7245",
          "template_u7r9akk",
          { ...data, from_email: data.email, to_email: props.user.email },
          "user_5g5KswcOcIydJl2rmUdMM"
        )
        .then(
          (result) => {
            console.log("SUCCESS!", result.text);
            isLoading.value = false;
            pushNotification({
              id: "",
              title: "Email enviado a: " + props.user.email,
              description: "El email ha sido enviado correctamente.",
              type: "success",
            });
          },
          (error) => {
            console.log("FAILED...", error.text);
            isLoading.value = false;
          }
        );
    }

    return { ContactMeForm, submit, getSocialNetworkIconComponent, isLoading };
  },
});
</script>
