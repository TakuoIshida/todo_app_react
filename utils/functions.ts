import { TodoListType, TodoType } from '@/types/type'

export async function fetchTodoList(): Promise<TodoListType | undefined> {
  try {
    const res = await fetch(process.env.BASE_API + '/todos/')
    const todoJson: TodoListType = await res.json()
    return todoJson
  } catch (e) {
    console.error(e)
    return [] as TodoListType
  }
}

export const get = async (url: string) => {
  const data: TodoListType = await fetch(url).then(res => res.json())
  return data
}

export const post = async (url: string, todo?: TodoType) => {
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
