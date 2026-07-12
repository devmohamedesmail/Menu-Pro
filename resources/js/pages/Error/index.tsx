import React from 'react'

export default function Error({status,message}:any) {
  return (
    <div>Error


      {status} - {message}
    </div>
  )
}
