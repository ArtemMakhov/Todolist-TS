import { useState } from 'react';
import './App.css';
import { Todolist,TasksType } from './Dodolist';

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {


  const [tasks, setTasks] = useState<Array<TasksType>>([
    { id: 1, title: "CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "React", isDone: false },
    { id: 4, title: "Redux", isDone: false }
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  function removeTask(id: number) {
    let filteredTasks = tasks.filter(task => task.id !== id)
    setTasks(filteredTasks)
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
      <Todolist title='What to learn' tasks={tasksForTodolist} removeTask={removeTask} changeFilter={changeFilter} />
    </div>
  );
}

export default App;
