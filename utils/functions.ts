import { TodoList } from '@/types/type'

export async function fetchTodoList(): Promise<TodoList | undefined> {
  try {
    const res = await fetch(process.env.BASE_API + '/todos/')
    const todoJson: TodoList = await res.json()
    return todoJson
  } catch (e) {
    console.error(e)
    return [] as TodoList
  }
}
