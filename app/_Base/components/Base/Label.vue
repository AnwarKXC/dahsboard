<script setup lang="ts">
defineProps({
  isRequired: {
    type: Boolean,
    default: false,
  },
  showRequirement: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  note: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <label
    class="font-semibold font-['Poppins'] capitalize  flex items-center opacity-80 tracking-wide"
  >
    <p :class="showRequirement && !disabled && isRequired ? 'required' : ''">

      <slot />
    </p>
    <small class="opacity-60 mx-1">{{ note }} </small></label>
</template>

<style scoped>
 p::after {
  font-size: 10px;
  margin-inline-start: 5px;
}
.required::after {
  content: '*';
  color: hsl(var(--clr-error));
}
</style>
