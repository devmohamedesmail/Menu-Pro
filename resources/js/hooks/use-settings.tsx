import { usePage } from '@inertiajs/react'
export default function useSettings() {
  const { settings } = usePage().props as any
  return {
    settings
  }
}
