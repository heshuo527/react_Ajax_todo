import React, { useState, useEffect } from 'react';
import { Button, Input, Table, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './App.css'
import Ajax from './service/ajax';

interface DataType {
  content: string;
  id: string;
  time: number;
  done: boolean;
}

function App() {

  const columns: ColumnsType<DataType> = [
    {
      title: '全部事项',
      dataIndex: 'address',
      key: 'address',
      render: (_, todo) => {
        return (
          <div className={todo.done ? 'done' : 'todo-done'}>{todo.content}</div>
        )
      }
    },
    {
      title: '时间',
      dataIndex: 'name',
      key: 'name',
      render: (_, todo) => {
        return (
          <span>{newTime(todo.time)}</span>
        )
      }
    },
    {
      title: '操作',
      key: 'action',
      render: (_, todo) => (
        <>
          <Button onClick={() => doneTodo(todo)} type='primary'>完成</Button>
          <Button onClick={() => deleteTodo(todo.id)} type='primary' danger>删除</Button>
        </>
      ),
    },
  ];

  const [inpValue, setInpValue] = useState('')
  const [todoList, setTodoList] = useState<Array<DataType>>([])

  const newTime = (time: Date | number) => {
    const d = new Date(time)

    const dataS = d.getDate()
    const monthS = d.getMonth() + 1
    const hoursS = d.getHours()
    const minuteS = d.getMinutes()
    const secondS = d.getSeconds()

    const yarn = d.getFullYear();
    const month = dataS < 10 ? '0' + dataS : dataS;
    const data = monthS < 10 ? '0' + monthS : monthS;
    const hours = hoursS < 10 ? '0' + hoursS : hoursS;
    const minute = minuteS < 10 ? '0' + minuteS : minuteS;
    const second = secondS < 10 ? '0' + secondS : secondS;
    return yarn + '-' + month + '-' + data + ' ' + hours + ':' + minute + ':' + second
  }

  const todoInit = async () => {
    // Ajax<{
    //   content: string;
    //   done: boolean
    //   id: string;
    //   time: number;
    // }[]>('GET', 'http://localhost:3005/todo/all', null).then(res => {
    //   if (res.ret === 0) {
    //     setTodoList(res.data)
    //   }
    // })

    const res = await Ajax<{
      content: string;
      done: boolean
      id: string;
      time: number;
    }[]>('GET', 'http://localhost:3005/todo/all', null);
    if (res.ret === 0) {
      console.log(res.data);
      setTodoList(res.data)
    }
  }

  useEffect(() => {
    todoInit()
  }, [])

  const add = () => {
    const id = new Date().getTime()
    const content = inpValue
    if (content === '') {
      message.error('请输入内容')
      return
    } else {
      // Ajax('POST', `http://localhost:3005/todo/update/${id}`, {
      //   task: content,
      // }, () => {
      //   todoInit()
      //   message.success('添加成功')
      // })
    }
  }

  const deleteTodo = (id: string) => {
    // Ajax('GET', `http://localhost:3005/todo/delete/${Id}`, null, () => {
    //   const newTodo = [...todoList]
    //   const todos = newTodo.filter(todo => todo.id !== Id)
    //   setTodoList(todos)
    //   message.error('删除成功')
    // })
  }

  const doneTodo = (todo: DataType) => {
    // Ajax('POST', `http://localhost:3005/todo/update/${todo.id}`, {
    //   task: todo.content,
    //   done: !todo.done,
    // }, () => {
    //   todoInit()
    //   if (todo.done === true) {
    //     message.warn('已完成')
    //   }
    // })
  }

  return (
    <>
      <Input placeholder="请输入内容" onChange={(e) => setInpValue(e.target.value)} />
      <Button type="primary" onClick={() => add()}>添加事项</Button>
      {
        <Table columns={columns} dataSource={todoList} />
      }
    </>
  );
}
export default App;
