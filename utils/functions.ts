import { TodoListType, TodoType } from '@/types/type'

export const getTodos = async (url: string) => {
  const data: TodoListType = await fetch(url).then(res => res.json())
  return data
}

export const postTodo = async (url: string, todo?: TodoType) => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }
  const data = await fetch(url, config).then(res => res.json())
  return data
}
