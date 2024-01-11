import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Search'


function MainLayout({children}) {
  return (
    <>
    <Navbar/>
    {children}
    {/* <Search/>
    <Table/> */}
    </>
  )
}

export default MainLayout