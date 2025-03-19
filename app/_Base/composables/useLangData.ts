export default (data: { en: string | object, ar: string | object }) => {
  const { locale } = useI18n()
  return data[locale.value as keyof typeof data]
}
