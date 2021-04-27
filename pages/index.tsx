import TodoList from '@/components/TodoList'
import { GetApiResponse, IProps } from '@/types/type'
import { getTodos } from '@/utils/functions'
import React from 'react'
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
      <TodoList data={props.data} />
    </div>
  )
}

export default TopPage
