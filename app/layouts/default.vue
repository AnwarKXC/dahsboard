<template>
  <div id="base__layout">
    <LayoutHeader />
    <div class="grow flow">
      <slot />
    </div>
    <LayoutFooter />
  </div>
</template>

<style scoped>
#base__layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100dvh;
}

.flow > * + * {
  margin-top: var(--flow-spacing, 2em);
}
</style>
