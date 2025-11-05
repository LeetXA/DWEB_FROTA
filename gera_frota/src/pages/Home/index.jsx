import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './style.css'

function Home() {
  //const [count, setCount] = useState(0)
  const users = [
    {
      
    }
  ]

  return (
    <div className='container'>
     <form>
      <h1>Gerenciamento de Frota</h1>
      <h2>Login Funcionário</h2>
      <input name='matricula' type='text'/>
      <input name='senha' type='password'/>
      <button type='button'>login</button>
     </form>

     <div>
      <p>Matrícula: </p>
      <p>Senha: </p>
     </div>
    </div>
  )
}

export default Home
