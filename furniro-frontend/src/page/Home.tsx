import Header from '../components/Header'

function Home() {

const header = [
    {name : 'Home', path : '/'},
    {name: 'Shop', path: '/shop'},
    {name : 'About', path: '/about' },
    {name : 'Contact', path: '/contact'}
]
  return (
    <div>
        <Header links={header} />
    </div>
  )
}

export default Home