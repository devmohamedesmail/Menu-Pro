import React from 'react'

export default function SectionTitle({ title, description }: { title: string, description?: string }) {
  return (
    <div className='flex flex-col justify-center items-center mb-10'>
      <h2 className='font-extrabold text-2xl'>{title}</h2>
      <h5>{description}</h5>
    </div>
  )
}
