import type en from '~~/i18n/locales/en.json'

type NestedKeys<T> = T extends object
  ? {
      [ K in keyof T ]: K extends string | number ? `${K}` | `${K}.${NestedKeys<T[ K ]>}` : never
    }[ keyof T ]
  : never

export default function useT(localizationKey: NestedKeys<typeof en>, options?: any) {
  const { $i18n } = useNuxtApp()
  const $t = $i18n.t.bind($i18n)
  return $t(localizationKey as string, options)
}
