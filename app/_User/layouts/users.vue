<template>
  <div class="grid__layout">
    <SideBarNavigator />
    <div id="base__layout" class=" overflow-hidden">
      <LayoutHeader />
      <div class=" grow  relative overflow-y-auto max-h-[calc(100dvh-90px)] antialiased scroll-smooth">
        <div class="flow  p-4">
          <LayoutBreadcrumb />
          <slot />
        </div>
      </div>
      <LayoutFooter />
    </div>
  </div>
</template>

<style scoped>
#base__layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100dvh;
}

.flow > * + * {
  margin-top: var(--flow-spacing, 1em);
}

.grid__layout {
  display: grid;
  grid-template-columns: 100px 1fr;
  height: 100%;
}

@media (max-width: 768px) {
  .grid__layout {
    grid-template-columns: 50px 1fr;
  }
}
</style>
