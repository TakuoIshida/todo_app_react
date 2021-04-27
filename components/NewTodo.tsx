import BackToTop from '@/components/BackToTop'
import { PutApiResponse, TodoType } from '@/types/type'
import { comprehendApiReq, postTodo } from '@/utils/functions'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core'
import React, { useState } from 'react'
// eslint-disable-next-line no-restricted-imports
import style from '../styles/_todo_form.module.scss'

const NewTodo = () => {
  const initialNewTodo: TodoType = {
    id: '',
    title: '',
    content: '',
    isDeleted: false,
  }
  const [newTodo, setNewTodo] = useState(initialNewTodo)

  const handleTitleChange = (value: string) => {
    setNewTodo({ ...newTodo, ['title']: value })
  }
  const handleContentChange = (value: string) => {
    setNewTodo({ ...newTodo, ['content']: value })
  }

  const handleIsDeleteChange = (checked: boolean) => {
    setNewTodo({ ...newTodo, ['isDeleted']: checked })
  }

  const putTodo = async (newTodo: TodoType) => {
    try {
      const res = await comprehendApiReq(newTodo.content)
      console.log(res)
      // POSTする前にComprehendを入れてレスポンスの点数を受け取る
      // 点数を基に感情を４パターンに分ける
      // ４パターンに分けた結果をnewTodoに追加する
      const data: PutApiResponse = await postTodo(
        process.env.NEXT_PUBLIC_BASE_API + '/todos',
        newTodo,
      )
      console.log(data)
      setNewTodo(initialNewTodo)
    } catch (e) {
      console.log(e)
      return
    }
  }
  return (
    <div>
      <div className={style.todoForm}>
        <TextField
          className={style.todoForm__title}
          label="タイトル"
          variant="outlined"
          value={newTodo.title}
          onChange={event => handleTitleChange(event.target.value)}
        />
        <TextField
          className={style.todoForm__content}
          label="内容"
          multiline
          variant="outlined"
          value={newTodo.content}
          onChange={event => handleContentChange(event.target.value)}
          rows={5}
          rowsMax={10}
        />
        <FormControlLabel
          label="削除"
          control={
            <Checkbox
              checked={newTodo.isDeleted}
              onChange={event => handleIsDeleteChange(event.target.checked)}
            />
          }
          labelPlacement="start"
        />
        <div>
          <Button
            onClick={() => putTodo(newTodo)}
            className={style.todoForm__put}
            variant="contained"
            color="primary">
            新規作成
          </Button>
          <BackToTop />
        </div>
      </div>
    </div>
  )
}

export default NewTodo
