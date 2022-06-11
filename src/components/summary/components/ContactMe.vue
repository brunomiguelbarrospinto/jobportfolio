<template>
  <div>
    <SectionTitle :user="user">{{ $t("Contact me") }}</SectionTitle>

    <div class="grid grid-cols-2 gap-4">
      <div class="col-span-2 md:col-span-1">
        <div class="mb-4 flex items-center">
          <IconComponent name="PhoneIcon" class="mr-3" />
          <div>
            <span class="text-md">{{ $t("Telephone") }}</span> <br />
            <span class="text-sm text-gray-500">{{ user.aboutMe?.phone }}</span>
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <IconComponent name="MailIcon" class="mr-3" />
          <div>
            <span class="text-md">Email</span> <br />
            <span class="text-sm text-gray-500">{{ user.email }}</span>
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <IconComponent name="LocationMarkerIcon" class="mr-3" />
          <div>
            <span class="text-md">{{ $t("Address") }}</span> <br />
            <span class="text-sm text-gray-500">{{
              user.aboutMe?.address?.[currentLocale]
            }}</span>
          </div>
        </div>

        <div class="mb-4 flex items-center">
          <IconComponent name="GlobeAltIcon" class="mr-3" />
          <div>
            <span class="text-md">{{ $t("Social media") }}</span> <br />
            <template
              :key="sn.link + sn.order"
              v-for="sn in user?.socialNetworks"
            >
              <a
                v-if="sn.link.length"
                class="mr-4 flex w-6 items-center justify-center justify-items-center last:mr-0"
                :href="sn.link"
                target="_blank"
                :title="sn.name"
              >
                <component :is="getSocialNetworkIconComponent(sn.name)" />
              </a>
            </template>
          </div>
        </div>
      </div>

      <div class="col-span-2 md:col-span-1">
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
import { getSocialNetworkIconComponent } from "@/utils/socialNetwork";
import emailjs from "@emailjs/browser";
import useNotifications from "@/composables/useNotifications";
import useLocale from "@/composables/useLocale";
export default defineComponent({
  components: { SectionTitle },
  props: {
    user: {
      type: Object as PropType<UserInterface>,
      required: true,
    },
  },
  setup(props) {
    const { currentLocale } = useLocale();
    const isLoading = ref(false);
    const { pushNotification } = useNotifications();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    return {
      ContactMeForm,
      submit,
      getSocialNetworkIconComponent,
      isLoading,
      currentLocale,
    };
  },
});
</script>
