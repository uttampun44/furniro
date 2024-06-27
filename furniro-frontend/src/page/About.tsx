import Backgroundpic from '../components/Backgroundpic'
import Header from '../components/Header'


const header = [
    {name : 'Home', path : '/'},
    {name: 'Shop', path: '/shop'},
    {name : 'About', path: '/about' },
    {name : 'Contact', path: '/contact'},
    {name : 'Login', path: '/login'}
]

function About() {
  return (
    <div>
        <Header links={header}/>
        <Backgroundpic />
    </div>
  )
}

export default About