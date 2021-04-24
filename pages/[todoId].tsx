import React, { useState } from 'react'
import { Button, Checkbox, TextField } from '@material-ui/core'
import { useRouter } from 'next/router'
import {
  IProps,
  TodoListType,
  TodoType,
  ITodoTextAreaEvent,
  ITodoInputEvent,
  ITodoCheckBoxEvent,
} from '@/types/type'
// 各Todoの編集・更新画面
const EditTodo = () => {
  const router = useRouter()
  const { todoId } = router.query
  const initialEditTodo: TodoType = {
    todoId: '',
    title: '',
    content: '',
    isDeleted: false,
  }
  // storeからeditする対象のtodoを取得
  const [editState, setEditState] = useState(initialEditTodo)
  const handleTitleChange = (value: string) => {
    setEditState({ ...editState, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setEditState({ ...editState, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setEditState({ ...editState, ['isDeleted']: checked })
  }
  return (
    <div>
      {todoId}
      <TextField
        placeholder="title"
        onChange={event => handleTitleChange(event.target.value)}
      />
      <TextField
        placeholder="content"
        onChange={event => handleContentChange(event.target.value)}
      />
      <Checkbox
        checked={editState.isDeleted}
        onChange={event => handleIsDeleteChange(event.target.checked)}
      />
      <Button>更新</Button>
    </div>
  )
}

export default EditTodo
