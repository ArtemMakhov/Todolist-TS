import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType } from "./App"



export type TasksType = {
  id: string
  title: string
  isDone: boolean
}

type PropsType = {
  title: string
  tasks: Array<TasksType>
  removeTask: (id: string) => void
  changeFilter: (value: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, isDone: boolean) => void
  filter: FilterValuesType
}

export function Todolist(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null)
  
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.currentTarget.value);
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === "Enter") {
      props.addTask(newTaskTitle)
      setNewTaskTitle('')
    }
  };
  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim())
      setNewTaskTitle('')
    } else {
      setError('Field is required')
    }
  };
  const onAllClickHandler = () => props.changeFilter('all');
  const onActiveClickHandler = () => props.changeFilter('active');
  const onCompletedClickHandler = () => props.changeFilter('completed');
  
  
  return (
    <div>
      <h3>{ props.title}</h3>
      <div>
        <input value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyUp={onKeyPressHandler}
          className={error ? "error" : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map(task => {
          const onRemoveHandler = () => props.removeTask(task.id)
          const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=> {props.changeTaskStatus(task.id,e.currentTarget.checked)}
          
          return <li key={task.id} className={task.isDone ? "is-done" : ''}>
            <input type="checkbox"
              onChange={onChangeHandler}
              checked={task.isDone}
            />
          <span>{task.title}</span>
          <button onClick={onRemoveHandler}>x</button>
        </li>
        }
        )}
      </ul>
      <div>
        <button className={props.filter === 'all' ? "active-filter" : ''}
          onClick={onAllClickHandler}>All</button>
        <button className={props.filter === 'active' ? "active-filter" : ''}
          onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === 'completed' ? "active-filter" : ''}
          onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  )
}