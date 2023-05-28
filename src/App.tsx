import { useState } from 'react';
import './App.css';
import { TasksType, Todolist } from './Todolist';
import { v1 } from 'uuid';

import { AddItemForm } from './AddItemForm';

export type FilterValuesType = 'all' | 'completed' | 'active'
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
type TaskStateType = {
  [key: string]: Array<TasksType>
}

function App() {

  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({...tasksObj})
  }
  function addTask(title: string, todolistId: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let tasks = tasksObj[todolistId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({...tasksObj})
  }
  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.isDone = isDone;

       setTasks({...tasksObj});
    }
  }
    function changeTaskTitle(taskId: string, newTitle:string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let task = tasks.find(t => t.id === taskId);
    if (task) {
      task.title = newTitle;

       setTasks({...tasksObj});
    }
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists])
    }

  }

  const todolist1 = v1();
  const todolist2 = v1();

  
  const [todolists,setTodolists] = useState<Array<TodolistType>>( [
    { id: todolist1, title: 'What to learn', filter: 'all' },
    {id: todolist2, title: 'What to buy', filter: 'all'}
  ]);

  const removeTodolist = (todolistId: string) => {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({...tasksObj})
  }
  const changeTodolistTitle = (todolistId: string,newTitle:string) => {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists])
    }
  }

  const [tasksObj, setTasks] = useState<TaskStateType>({
    [todolist1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Redux", isDone: false },
      { id: v1(), title: "Rest API", isDone: false }
    ],
    [todolist2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false }
    ]
  });

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title
    }
    setTodolists([todolist, ...todolists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }
  
  return (
    <div className="App">
      <AddItemForm  addItem={addTodolist} />
      {
        todolists.map((tl) => {

          let tasksForTodolist = tasksObj[tl.id];
          if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
          }
          if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
          }
          return <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            changeTaskTitle={changeTaskTitle}
            filter={tl.filter}
            removeTodolist={removeTodolist}
            changeTodolistTitle={changeTodolistTitle}
          />
        })
      }
    </div>
  );
}

export default App;
