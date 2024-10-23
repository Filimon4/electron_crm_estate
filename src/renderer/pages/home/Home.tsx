import React from 'react'
import { route_pages } from '../../shared/route'
import { Link, useNavigate } from 'react-router-dom'
import TaskBar from '../../components/TaskBar/TaskBar'

const Home = () => {
  const navigator = useNavigate()
  return (
    <>
      <TaskBar />
    </>
  )
}

export default Home