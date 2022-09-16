import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { Todo } from './models/ITodo'
import { addTodo, getTodos } from './service'

function TodoPage() {
  
    const [notes, setNotes] = useState<Todo[]>([])
    const [formStatus, setFormStatus] = useState(false)
    const validationSchema = Yup.object({
      todo: Yup.string().required('Todo required').min(2, 'Todo length min 2'),
      userId: Yup.number().required('UserId required').min(1, 'UserId min 1')
    })
  
    const { handleSubmit, handleChange, values, errors } = useFormik({
      initialValues: {
        id: 0,
        todo: '',
        completed: false,
        userId: 0
      },
      validationSchema,
      onSubmit: () => {
        addTodo(values).then(res => {
            const oldArr = Object.assign([], notes)
            oldArr.unshift( res.data )
            setNotes( oldArr )
        })
      }
    })
  
    const fncDelete = (index:number) => {
        const oldArr = Object.assign([], notes)
        oldArr.splice(index, 1)
        setNotes( oldArr )
        toast.success('Delete Success!')
    }

    useEffect(() => {
        toast.loading('Data Loading..')
        getTodos().then( res => {
            setNotes( res.data.todos )
        }).finally(() => {
            toast.dismiss()
        })
    }, [])
    
  
    return (
      <>
      <Helmet>
          <title>Todo</title>
          <meta name="description" content="Todo Page"></meta>
      </Helmet>
        <div className='row'>
          <div className='col-sm-6'>
            <h2>Todo Add</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <input onChange={handleChange} name='todo' className='form-control' type='text' placeholder='Title' />
                { (formStatus && errors.todo) && errors.todo }
              </div>
              
              <div className='mb-3'>
                <input onChange={handleChange} name='userId' className='form-control' type='number' placeholder='User ID' />
                { (formStatus && errors.userId) &&  errors.userId }
              </div>

              <div className="mb-3 form-check">
                    <input onChange={handleChange} name='completed' type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Completed</label>
              </div>

              <button onClick={() => setFormStatus(true)} className='btn btn-success' type='submit'>Send</button>
            </form>
          </div>
          <div className='col-sm-6'>
            <h2>Todo List</h2>
            <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Todo</th>
                <th scope="col">Completed</th>
                <th scope="col">UserId</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
  
              { notes.map((item, index) =>
                <tr key={index}>
                  <th scope="row">{ item.id }</th>
                  <td>{item.todo}</td>
                  <td>
                    {
                    item.completed === true 
                    ? <span className="badge text-bg-success">True</span>
                    : <span className="badge text-bg-danger">False</span>
                    }
                  </td>
                  <td>{item.userId}</td>
                  <td> <button onClick={() => fncDelete(index)} className='btn btn-danger btn-sm'>Delete</button> </td>
                </tr>
              )}
  
              
            </tbody>
          </table>
          </div>
        </div>
        
      </>
    )


}

export default TodoPage