<script setup lang="ts">

</script>

<template>
  <footer class="bg-gold-300/5 shadow shadow-gold-300/10 border-t h-11 center">
    <div class="container text-center ">
      <p class="font-serif ">
        by
        <BaseTooltip>
          <template #trigger>
            <!-- Pop up trigger content -->
            <button
              class="text-gold-400 underline underline-offset-8 bg-transparent border-none cursor-pointer p-0"
              @click=" showModal "
            >
              {{ $t("Anwar Kamal") }} <Icon name="material-symbols:info" class="text-gold-400" />
            </button>
          </template>
          <template #body>
            <div class="whitespace-nowrap dark:text-secondary-200">
              anwark.code@gmail.com
            </div>
          </template>
        </BaseTooltip>
      </p>
    </div>
  </footer>
</template>

<style scoped></style>
