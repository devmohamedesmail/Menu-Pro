import { usePage } from '@inertiajs/react'
import React from 'react'

export default function useUserStores() {
  const { stores } = usePage().props as any
  return {
    stores
  }
}
