<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
const props = defineProps({
  center: { type: Boolean, default: false },
  isCloseAble: { type: Boolean, default: true },
  modalClass: { type: String, default: '' },
  title: { type: String, default: '' },
  showCloseButton: { type: Boolean, default: true },
  icon: { type: String, default: '' },
  modelValue: { type: Boolean, required: true }, // Binding for v-model
  iconStyle: {
    type: String,
    default: '',
  },
  isWarn: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'close'])
const isVisible = ref(props.modelValue)
// Watch prop `modelValue` for changes to synchronize `isVisible`
watch(
  () => props.modelValue,
  (newValue: boolean) => {
    isVisible.value = newValue
    document.body.classList.toggle('no-scroll', newValue)
  },
)
// Watch `isVisible` for internal state changes and emit to parent
watch(isVisible, (newValue: boolean) => {
  emit('update:modelValue', newValue)
  document.body.classList.toggle('no-scroll', newValue)
})
// Cleanup on component unmount
onUnmounted(() => {
  document.body.classList.remove('no-scroll')
})
function close() {
  isVisible.value = false
  emit('close')
}
function handleBackdropClick() {
  if (props.isCloseAble)
    close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="isVisible"
        class="modal-backdrop"
        :class="{ 'modal-center': props.center }"
        v-bind="$attrs"
        @click="handleBackdropClick"
      >
        <Transition name="modal-content-scale">
          <div
            v-show="isVisible"
            class="modal"
            :class="[props.modalClass]"
            @click.stop
          >
            <div
              class=" p-5 py-6 rounded-2xl relative"
              :class="props.isWarn ? 'modal_bg_warn' : 'modal_bg_success'"
            >
              <button
                v-if="props.showCloseButton"
                class="close-button"
                aria-label="Close modal"
                @click="close"
              >
                <Icon name="ic:round-close" />
              </button>
              <Icon v-if="props.icon" :name="props.icon" size="80" :class="props.iconStyle" class="mx-auto block mb-4" />
              <div v-if="props.showCloseButton || props.title">
                <BaseTypo as="h2" weight="600" size="s" :align="props.icon ? 'center' : 'start'" class="text-secondary-600">
                  {{ props.title }}
                </BaseTypo>
              </div>
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
 .modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-start; /* Default to top-left */
  align-items: flex-start; /* Default to top-left */
  z-index: 1000;
}
.modal-center {
  justify-content: center; /* Centering horizontally */
  align-items: center; /* Centering vertically */
}
.modal {
  overflow-y: auto;
  position: relative;
}
.modal_bg_success {
  background:
    url('/svgs/successTop.svg') top left no-repeat,
    url('/svgs/successBottom.svg') bottom right no-repeat;
  background-color: #fff; /* Fallback color */
  min-width: 280px;
  background-size: 20vw;
}
.modal_bg_warn {
  background:
    url('/svgs/warnTop.svg') top left no-repeat,
    url('/svgs/warnBottom.svg') bottom right no-repeat;
  background-color: #fff; /* Fallback color */
  min-width: 280px;
  background-size: 20vw;
}
@media screen and (max-width: 768px) {
  .modal_bg {
    width: 100%;
    background-size: 35vw;
  }
  .modal {
    max-height: 100vh;
  }
}
.close-button {
  background: hsl(var(--clr-secondary-300));
  aspect-ratio: 1 / 1;
  padding: 0.25rem;
  border-radius: 50%;
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
}
.close-button:hover {
  background: hsl(var(--clr-secondary-400));
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-content-scale-enter-active,
.modal-content-scale-leave-active {
  transition: all 0.3s ease;
}
.modal-content-scale-enter-from,
.modal-content-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.no-scroll {
  overflow: hidden;
}
</style>
