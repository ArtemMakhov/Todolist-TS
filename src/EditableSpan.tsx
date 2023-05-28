import { useState,ChangeEvent } from "react";

type EditamleSpanPropsType = {
  title: string
  onChange: (newValue: string)=> void
}
export function EditableSpan(props: EditamleSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  }
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  }
  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>)=> setTitle(e.currentTarget.value)
  
  return (
    editMode 
      ? <input value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus/>
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}