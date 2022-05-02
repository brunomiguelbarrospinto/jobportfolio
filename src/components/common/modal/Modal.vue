<template>
  <TransitionComponent>
    <div
      v-if="isOpen"
      class="fixed inset-0 z-30 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <div
          class="transform overflow-hidden rounded-sm bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                v-if="type"
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                :class="{ ['bg-' + typeModal + '-100']: true }"
              >
                <!-- Heroicon name: outline/exclamation -->
                <svg
                  class="h-6 w-6"
                  :class="{ ['text-' + typeModal + '-600']: true }"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  class="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  <slot name="title" />
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    <slot name="content" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </TransitionComponent>
</template>

<script>
import { computed, defineComponent } from "vue";
import TransitionComponent from "@/components/transition/Transition.vue";
export default defineComponent({
  components: {
    TransitionComponent,
  },
  props: {
    isOpen: { type: Boolean, default: false },
    type: { type: String, default: null },
  },
  setup(props) {
    const typeMap = {
      warning: "yellow",
      error: "red",
      success: "green",
      info: "blue",
    };

    const typeModal = computed(() => {
      return typeMap[props.type];
    });

    return { typeModal };
  },
});
</script>
