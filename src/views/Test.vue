<template>
  <div>
    <div>{{ monthName }}</div>
    <button
      @click="
        setLocale('en');
        setDayjsLocale(currentLocale);
      "
    >
      Set EN
    </button>
    <button
      @click="
        setLocale('es');
        setDayjsLocale(currentLocale);
      "
    >
      Set ES
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import useLocale from "@/composables/useLocale";
import useDayjs from "@/composables/useDayjs";

const { currentLocale, setLocale } = useLocale();

const { now, getMonthName, setDayjsLocale } = useDayjs(currentLocale.value);

const monthName = computed(() => {
  setDayjsLocale(currentLocale.value);
  return getMonthName(now().format("YYYY-MM-DD"));
});
</script>
