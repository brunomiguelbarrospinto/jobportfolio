<template>
  <nav class="top-0 z-20 w-full border-b border-gray-200">
    <div class="mx-auto flex max-w-4xl items-center justify-between p-3">
      <div><slot name="left-section"></slot></div>
      <div><slot name="right-section"></slot></div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
}
</style>
