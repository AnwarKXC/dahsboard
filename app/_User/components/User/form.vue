<script setup lang="ts">
import type CountrySelect from '~/_Base/components/CountrySelect.vue'
import { BaseDropDown, BasePhoneNumber } from '#components'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue3-toastify'
import { z } from 'zod'

const props = defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
  btnText: {
    type: String,
    default: 'Add',
  },
})

const { params } = useRoute()
const { create, get, edit } = useApi()
const user = ref<IUser>()

params.id && (user.value = await get<IUser>('user', params.id as string))
const code = ref(props.edit ? useExtractCountryCode(user.value.data.user.phone)?.countrySymbol as string : 'AE')
const phone = ref(props.edit ? user.value.data.user.phone.slice(useExtractCountryCode(user.value.data.user.phone)?.countryCode.length) : '')
const isValid = ref(false)

const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(1, 'Name is required'),
      email: z.string().email('Invalid email').min(1, 'Email is required'),
      phone: z.string().min(10, 'Phone is required'),
      position: z.string().min(1, 'Position is required'),
      role: z.nativeEnum(Role),
      country: z.string().min(1, 'Country is required'),
      images: z.array(z.string()),
      profileImage: z.string().min(1, 'Image is required'),
    }),
  ),
  initialValues: props.edit
    ? user.value.data.user
    : {
        name: '',
        email: '',
        position: '',
        phone: '',
        role: '',
        country: '',
        profileImage: '',
        images: [],
      },
})
const loading = ref(false)
async function onSubmit() {
  try {
    isValid.value = phone.value.length > 0 && isValid.value
    if (!isValid.value)
      return
    loading.value = true
    const submitHandler = handleSubmit(async (values) => {
      const response = params.id
        ? await edit<IUser>('user', user.value.data.user._id, values)
        : await create<IUser>('user', values)

      if (!params.id) {
        resetForm()
        phone.value = ''
        code.value = 'AE'
      }
      response && toast.success(`User ${params.id ? 'updated' : 'created'} successfully`)
    })

    await submitHandler()
    loading.value = false
  }
  catch (e: unknown) {
    toast.error(e)
  }
}
</script>

<template>
  <form class=" grid md:grid-cols-2 gap-4 " @submit.prevent="onSubmit">
    <BaseInput is-required name="name" label="Name" placeholder="user name" />
    <BaseInput is-required name="email" label="Email" placeholder="example@gmail.com" type="email" />
    <BaseInput name="position" label="Position" placeholder="example@gmail.com" is-required />
    <BasePhoneNumber
      v-model:code="code"
      v-model="phone"
      v-model:is-valid="isValid"
      :error="!isValid ? 'Phone Number Must be in a valid format' : ''"
      is-required
      label="Phone Number"
      @full-number="setFieldValue('phone', $event)"
    />
    <BaseDropDown is-required name="role" label="Role" :options="['Admin', 'Employee', 'User']" placeholder="Select user role" />
    <CountrySelect name="country" placeholder="Select Country" label="Country" is-required />
    <div class=" space-y-2">
      <BaseLabel is-required>
        Profile Image
      </BaseLabel>
      <S3ImageUploader name="profileImage" label="Image" single-mode />
    </div>
    <div class=" space-y-2">
      <BaseLabel>Other images <small> ( ID , Passport ... ) </small></BaseLabel>
      <S3ImageUploader name="images" label="Image" />
    </div>
    <div class=" flex justify-end col-span-full">
      <BaseButton type="submit" :is-loading="loading">
        {{ btnText }}
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>

</style>
