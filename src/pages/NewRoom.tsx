import illustrationImg  from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import '../styles/auth.scss';
import { useState } from 'react'
import { database } from '../services/firebase'


export function NewRoom(){
  const { user } = useAuth()
  const history = useHistory()

  //armazenando o valor do input

  const [newRoom, setNewRoom] = useState('')

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault()

    // verificando se existe texto dentro do input

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }


  return(
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração que simboliza perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src= {logoImg} alt="Letmeask Logo" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit= {handleCreateRoom}>
            <input 
            type="text" 
            placeholder="Nome da sala"
            onChange = {event => setNewRoom(event.target.value)}
            value = {newRoom}
            />
            
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente? <Link to="/"> Clique Aqui</Link>
            </p>
        </div>
      </main>
    </div>
  )
}