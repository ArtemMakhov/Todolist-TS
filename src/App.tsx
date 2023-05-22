import { useState } from 'react';
import './App.css';
import { Todolist,TasksType } from './Dodolist';
import { v1 } from 'uuid';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {

  const [tasks, setTasks] = useState<Array<TasksType>>([
    { id: v1(), title: "CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "React", isDone: false },
    { id: v1(), title: "Redux", isDone: false },
    { id: v1(), title: "Rest API", isDone: false }
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(id: string) {
    let filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
  }
  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [...tasks,newTask ]
    setTasks(newTasks)
  }
  function changeStatus(taskId: string, isDone: boolean) {
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;
    }
    setTasks([...tasks]);
  }

  function changeFilter(value: FilterValuesType) {
    setFilter(value)
  }

  let tasksForTodolist = tasks;
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone === true)
  }
    if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => task.isDone === false)
  }
  
  return (
    <div className="App">
      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
