import React from 'react'
import Header from '@components/Header'
import Footer from '@components/Footer'


interface ChildrenProps {
  
  children: React.ReactNode
}
const Layout:React.FC<ChildrenProps> = ({children}) => {
  return (
    <div>
        <Header />
        <main>{children}</main>
        <Footer />
    </div>
  )
}

export default Layout