import React from 'react'
import Header from '../components/Header'


const header = [
    {name : 'Home', path : '/'},
    {name: 'Shop', path: '/shop'},
    {name : 'About', path: '/about' },
    {name : 'Contact', path: '/contact'}
]

function Login() {
  return (
    <div>
         <Header links={header} />
    </div>
  )
}

export default Login