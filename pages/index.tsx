import TodoList from '@/components/TodoList'
import { GetApiResponse, IProps } from '@/types/type'
import { getTodos } from '@/utils/functions'
import { Button, Divider } from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_todolist.module.scss'
// レンダリングするTopのコンポネントでAPIフェッチする必要がある
export async function getStaticProps() {
  const data: GetApiResponse = await getTodos(
    process.env.NEXT_PUBLIC_BASE_API + '/todos',
  )
  return {
    props: { data },
  }
}

const TopPage: React.FC<IProps> = (props: IProps) => {
  return (
    <div>
      <div className={style.todoList__new}>
        <Link href="/createtodo" passHref>
          <Button variant="contained" color="secondary">
            新規作成
          </Button>
        </Link>
      </div>
      <Divider className={style.todoList__divider} />
      <TodoList data={props.data} />
    </div>
  )
}

export default TopPage
