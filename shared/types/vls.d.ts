declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: any[]) => string
  }
}

// If using Vue 3 with TypeScript, you might also need:
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: any[]) => string
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: TranslationKeys, ...args: any[]) => string
  }
}