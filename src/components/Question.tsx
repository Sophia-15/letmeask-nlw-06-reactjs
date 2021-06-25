import '../styles/question.scss'
import { ReactNode } from 'react'
import cx from 'classnames'

type QuestionProps = {
  content: string
  author: {
    name: string
    avatar: string
  }
  children?: ReactNode
  isAnswered?: boolean
  isHighLighted?: boolean
}



export function Question({
  content,
  author,
  isAnswered = false,
  isHighLighted = false,
  children
}: QuestionProps) {
  return (
    <div className={cx('question', { answered: isAnswered }, { highlighted: isHighLighted && isAnswered })}>
      <p>
        {content}
      </p>
      <footer >
        <div className="user-info">
        <img src={author.avatar} alt="Foto de perfil do usuário" />
        <span>{author.name}</span>
        </div>
        <div className= "button-functions">
          {children}
        </div>
      </footer>
    </div>
  )
}