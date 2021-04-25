// import Head from 'next/head'
import TodoList from '@/components/TodoList'
import { IProps, TodoListType } from '@/types/type'
import { getTodos } from '@/utils/functions'
import React from 'react'
// import { Provider } from 'react-redux'
// レンダリングするTopのコンポネントでAPIフェッチする必要がある
export async function getStaticProps() {
  const todoList: TodoListType = await getTodos(
    process.env.NEXT_PUBLIC_BASE_API + '/todos',
  )
  return {
    props: { todoList },
  }
}

const TopPage: React.FC<IProps> = (props: IProps) => {
  return (
    <div>
      <TodoList todoList={props.todoList} />
    </div>
  )
}

export default TopPage
