export type TodoType = {
  id: string
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
  data: GetApiResponse
}

export interface ITodoInputEvent extends React.FormEvent<HTMLInputElement> {
  target: HTMLInputElement
}

export interface ITodoTextAreaEvent
  extends React.FormEvent<HTMLTextAreaElement> {
  target: HTMLTextAreaElement
}

export interface ITodoCheckBoxEvent {
  target: HTMLInputElement
}

export type GetApiResponse = {
  status: number
  message: string
  result: TodoListType
}
export type PutApiResponse = {
  status: number
  message: string
  result: TodoType
}
