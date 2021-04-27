import { GetApiResponse, PutApiResponse, TodoType } from '@/types/type'

export const getTodos = async (url: string) => {
  const data: GetApiResponse = await fetch(url).then(res => res.json())
  return data
}

export const postTodo = async (url: string, todo?: TodoType) => {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  }
  const data: PutApiResponse = await fetch(url, config).then(res => res.json())
  return data
}

type InputText = {
  inputText: string
}

export const comprehendApiReq = async (content: string) => {
  const param: InputText = {
    inputText: content,
  }
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  }
  const data = await fetch(
    process.env.NEXT_PUBLIC_COMPREHEND_API || '',
    config,
  ).then(res => res.json())
  return data
}
