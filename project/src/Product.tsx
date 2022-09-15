import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProBilgiler } from './models/IProduct'
import { URLEnum } from './RouterEnum'
import { productList } from './service'

function Product() {
  
  const [item, setItem] = useState<ProBilgiler>()
  const [proArr, setProArr] = useState<ProBilgiler[]>([])
  const [bigImage, setBigImage] = useState('')
  useEffect(() => {
    productList().then( res => {
      setProArr( res.data.Products[0].bilgiler )
      setItem( res.data.Products[0].bilgiler[0] )
    })
  }, [])
  

  return (
    <>
      <h2>Product List</h2>
      <div className='row'>
        { proArr.map( (item, index) => 
          <div key={index} className="card col-sm-4 mb-4">
            <img src={item.images[0].normal} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title"> { item.productName } </h5>
              <p className="card-text">{ item.brief }</p>
              <a onClick={()=> { setItem(item); setBigImage( item.images[0].normal ) } } data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-primary">Goto Detail</a>
            </div>
          </div>
        )}
      </div>

      { item && 
        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">{item.productName}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <img src={ bigImage } className='img-fluid' />
                <div className='mt-3 mb-3'>
                  { item.images.map( (itm, index) => 
                    <img onClick={() => setBigImage(itm.normal) } role='button' key={index} src={itm.thumb} className='img-thumbnail m-1' />
                  )}
                </div>
                <div dangerouslySetInnerHTML={{__html: item.description }}></div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
  
}

export default Product