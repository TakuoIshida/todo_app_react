export type TodoType = {
  todoId: string
  title: string
  content: string
  isDeleted: boolean
  //   created_at: string
  //   updated_at: string
}
export type confirmType = {
  value: number
  detail: string
}

export type TodoListType = TodoType[]

export interface IProps {
  todoList: TodoListType
}

export interface ITodoInputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement
}

export interface ITodoTextAreaEvent
  extends React.FormEvent<HTMLTextAreaElement> {
  target: HTMLTextAreaElement
}
