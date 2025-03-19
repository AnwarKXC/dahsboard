<script setup lang="ts">
import Select from 'primevue/select'
import countriesAr from '~/assets/data/countries/ar.json'
import countriesEn from '~/assets/data/countries/en.json'
import flags from '~/assets/data/countries/flags-24x24.json'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  label: {
    type: String,
  },
  isRequired: {
    type: Boolean,
    default: false,
  },

  wrapperClasses: {
    type: String,
    default: '',
  },

  haveFilter: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const { locale } = useI18n()
const fieldName = computed(() => props.name || `field-${Date.now()}`)

function detectLanguage(text: string) {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/
  const englishRegex = /[a-z]/i // English letters

  if (arabicRegex.test(text)) {
    return 'arabic'
  }
  else if (englishRegex.test(text)) {
    return 'english'
  }
  else {
    return 'Unknown or Mixed'
  }
}

const { value, errorMessage } = props.name
  ? useField(() => fieldName.value, undefined, { syncVModel: true })
  : { value: ref(''), errorMessage: ref('') }

watch(() => locale.value, () => {
  const countryLang = detectLanguage(value.value)
  const sourceList = countryLang === 'arabic' ? countriesAr : countriesEn
  const targetList = locale.value === 'ar' ? countriesAr : countriesEn

  const sourceCountry = sourceList.find(country => country.name === value.value)
  // that's mean country's lang retrieved from backend language same lang
  if (!sourceCountry)
    return

  const targetCountry = targetList.find(country => country.id === sourceCountry.id)
  if (targetCountry)
    value.value = targetCountry.name
}, { immediate: true })

function getFlagForSelectedCountry(selectedCountryName: string) {
  const detectedLang = detectLanguage(selectedCountryName)
  const countryList = detectedLang === 'english' ? countriesEn : countriesAr
  let selectedCountry = countryList.find(country => country.name === selectedCountryName)

  if (!selectedCountry) {
    selectedCountry = countryList.find(country =>
      country.name.toLowerCase() === selectedCountryName.toLowerCase(),
    )
  }

  // If still no match, try matching by alpha2 or alpha3 code
  if (!selectedCountry) {
    selectedCountry = countryList.find(country =>
      country.alpha2 === selectedCountryName.toLowerCase()
      || country.alpha3 === selectedCountryName.toLowerCase(),
    )
  }

  // Return flag if country found, otherwise return empty string
  return selectedCountry ? flags[selectedCountry.alpha2 as keyof typeof flags] : ''
}
</script>

<template>
  <div class="grid  gap-1 w-full">
    <BaseLabel :is-required="isRequired">
      {{ label }}
    </BaseLabel>
    <Select
      v-model="value"
      aria-label="country select"
      :disabled="disabled"
      option-value="name"
      option-label="name"
      :options="locale === 'en' ? countriesEn : countriesAr"
      :filter="haveFilter"

      :class="errorMessage ? '!border-error hover:!border-error ' : '!border-secondary-300'"
      :placeholder="placeholder"
      :auto-filter-focus="haveFilter"
      v-bind="$attrs"
    >
      <template #option="{ option }">
        <div class="flex items-center gap-3">
          <img
            :src="flags[option.alpha2 as keyof typeof flags]"
            class="size-5"
          >
          <span> {{ option.name }}</span>
        </div>
      </template>
      <template #value="{ value: selectedValue }">
        <template v-if="!selectedValue" />
        <div v-else>
          <div class="flex items-center  gap-2">
            <img
              v-if="selectedValue"
              :src="getFlagForSelectedCountry(selectedValue)"
              class="size-5"
            >
            <span>{{ selectedValue }}</span>
          </div>
        </div>
      </template>
    </Select>
    <span class="text-error text-sm h-1.5 -mt-1">{{ errorMessage }}</span>
  </div>
</template>

<style scoped>
:deep(.p-select) {
  @apply !rounded-md border-2 placeholder:!text-secondary-400 dark:!text-white  w-full p-0.5  !bg-secondary-300 !bg-opacity-20  hover:!border-primary-400 border-secondary-300 focus:!border-primary-400 disabled:hover:!border-secondary-300 !h-[48px];
}
:deep(.p-select-label) {
  @apply dark:!text-white/80 text-black;
}

:deep(.p-placeholder) {
  @apply dark:!text-white/40 !text-secondary-500;
}

:deep(.p-select-option.p-select-option-selected) {
  @apply !bg-black !text-white;
}
:deep(.p-select-dropdown-icon) {
  @apply text-gold-300 !w-3.5;
}
</style>
