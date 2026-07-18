import useImport from '@/hooks/use-import'
import { Table2 } from 'lucide-react'
import React from 'react'

export default function EmptyState() {
  const { t } = useImport();
  return (
    <div className='flex flex-col items-center justify-center'>
      <Table2 />
      <h2>{t("tables.no-tables")}</h2>
    </div>
  )
}
