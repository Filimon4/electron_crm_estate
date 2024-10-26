import React from 'react'
import { route_pages } from '../../shared/route'

const LinkHash = ({to, children}: {to: keyof typeof route_pages, children: React.ReactNode}) => {

  const onChange = () => {
    document.defaultView.location.hash = route_pages[to]
  }

  return (
    <a style={{cursor: 'pointer'}} onClick={onChange}>{children}</a>
  )
}

export default LinkHash