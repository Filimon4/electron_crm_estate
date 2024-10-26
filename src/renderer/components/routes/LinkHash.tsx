import React from 'react'
import { route_pages, TRoutesPages, updatePage } from '../../shared/route'

const LinkHash = ({to, children}: {to: TRoutesPages, children: React.ReactNode}) => {

  const onChange = () => {
    updatePage(`${route_pages[to]}`)
  }

  return (
    <a style={{cursor: 'pointer'}} onClick={onChange}>{children}</a>
  )
}

export default LinkHash