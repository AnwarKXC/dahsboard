<script lang="ts" setup>
//  Inline middleware to prevent access if the user is already logged in
definePageMeta({
  title: 'Login',
  description: 'Login to your account',
  layout: 'auth',
  middleware: [
    async () => {
      const currentUser = useCookie('currentUser') as { value: IUser | null }
      // Redirect to the dashboard if the user is already logged in
      if (currentUser.value) {
        return navigateTo(useLocaleR('/'))
      }
    },
  ],
})

const shouldRemember = ref(false)

const { login, loading } = useAuth()

// Form Data
const form = ref({
  name: '',
  role: '',
})

// Errors
const errors = ref({
  name: '',
  role: '',
})

// Validation functions
function validateName() {
  errors.value.name = form.value.name.length >= 3 ? '' : 'Name must be at least 3 characters'
}

function validateRole() {
  errors.value.role = Object.values(Role).includes(form.value.role) ? '' : 'Role must be Admin, Employee, or User'
}

// Watch for real-time validation
watch(() => form.value.name, validateName)
watch(() => form.value.role, validateRole)

// Computed property to check if form is valid
const isFormValid = computed(() => {
  return !errors.value.name && !errors.value.role
})

// Handle form submission
async function submitForm() {
  validateName()
  validateRole()

  if (!isFormValid.value) {
    return
  }

  try {
    await login({ name: form.value.name, role: form.value.role }, shouldRemember.value)
  }
  catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<template>
  <div class="grid place-content-center">
    <BaseTypography as="h1" size="xl" weight="600" align="center">
      {{ $t('login') }}
    </BaseTypography>
    <form class="grid gap-5 md:min-w-96 min-w-72 mt-10" @submit.prevent="submitForm">
      <BaseInput
        v-model="form.name"
        type="text"
        :placeholder="$t('name')"
        :label="$t('name')"
        :error="errors.name"
        @blur="validateName"
      />

      <BaseDropDown
        v-model="form.role"
        :options="Object.values(Role)"
        :label="$t('role')"
        :placeholder="$t('role')"
        :error="errors.role"
        @change="validateRole"
      />

      <label class="flex items-center">
        <input v-model="shouldRemember" type="checkbox">
        <span>{{ $t('remember-me') }}</span>
      </label>

      <BaseButton class="w-full" :is-loading="loading" :disabled="!isFormValid">
        {{ $t('login') }}
      </BaseButton>
    </form>
  </div>
</template>
