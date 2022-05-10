<template>
  <Dropdown>
    <template #activator="{ isOpen }">
      <div class="flex h-full items-center text-sm font-medium uppercase">
        <div>{{ currentLocale }}</div>
        <IconComponent v-show="!isOpen" name="ChevronDownIcon" />
        <IconComponent v-show="isOpen" name="ChevronUpIcon" />
      </div>
    </template>
    <template #content>
      <DropdownMenuItem
        v-for="(lang, i) in locales"
        :key="`Lang${i}`"
        @click="setLocale(lang)"
        class="text-sm font-medium uppercase"
      >
        <img
          :src="require(`@/assets/img/languages/${i + 1}.svg`)"
          width="14"
          class="mr-1 inline"
        />
        {{ lang }}
      </DropdownMenuItem>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import Dropdown from "@/components/common/dropdown/Dropdown.vue";
import DropdownMenuItem from "@/components/common/dropdown/DropdownMenuItem.vue";
import useLocale from "@/composables/useLocale";
const { locales, setLocale, currentLocale } = useLocale();
</script>
