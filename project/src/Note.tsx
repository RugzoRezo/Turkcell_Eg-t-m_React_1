import axios from 'axios';
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import * as Yup from 'yup'
import { IWeather } from './models/IWeather';


interface INote {
  title: string;
  detail: string;
  date: string;
}


function Note() {

  const [notes, setNotes] = useState<INote[]>([])
  const [formStatus, setFormStatus] = useState(false)
  const validationSchema = Yup.object({
    title: Yup.string().required('Title required').min(2, 'Title length min 2'),
    detail: Yup.string().required('Detail required').min(5, 'Detail length min 5'),
    date: Yup.string().required('Date required')
  })

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      title: '',
      detail: '',
      date: ''
    },
    validationSchema,
    onSubmit: () => {
      const oldArr = Object.assign([], notes)
      oldArr.push( values )
      setNotes( oldArr )
    }
  })

  const fncDelete = (index:number) => {
    const oldArr = Object.assign([], notes)
    oldArr.splice(index, 1)
    setNotes( oldArr )
  }

  const [weather, setWeather] = useState<IWeather>()
  useEffect(() => {
    fncWeather('istanbul')
  }, [])

  const fncWeather = ( city: string ) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=imperial&appid=a38468f90414deaf5d8d9c742c7fb8d2'
    axios.get<IWeather>(url).then(res => {
      setWeather(res.data)
    })
  }
  

  return (
    <>
    { weather &&
      <h3> { weather.name } - { weather.weather[0].main } </h3>
    }
    <div>
      <input onChange={(evt) => fncWeather(evt.target.value) } className='form-control'></input>
    </div>
      <Helmet>
          <title>Note</title>
          <meta name="description" content="Note Page"></meta>
      </Helmet>
      <div className='row'>
        <div className='col-sm-6'>
          <h2>Note Add</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <input onChange={handleChange} name='title' className='form-control' type='text' placeholder='Title' />
              { (formStatus && errors.title) && errors.title }
            </div>
            <div className='mb-3'>
              <input onChange={handleChange} name='detail' className='form-control' type='text' placeholder='Detail' />
              { (formStatus && errors.detail) && errors.detail }
            </div>
            <div className='mb-3'>
              <input onChange={handleChange} name='date' className='form-control' type='date' placeholder='Date' />
              { (formStatus && errors.date) &&  errors.date }
            </div>
            <button onClick={() => setFormStatus(true)} className='btn btn-success' type='submit'>Send</button>
          </form>
        </div>
        <div className='col-sm-6'>
          <h2>Note List</h2>
          <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Detail</th>
              <th scope="col">Date</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>

            { notes.map((item, index) =>
              <tr key={index}>
                <th scope="row">{ index + 1 }</th>
                <td>{item.title}</td>
                <td>{item.detail}</td>
                <td>{item.date}</td>
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

export default Note