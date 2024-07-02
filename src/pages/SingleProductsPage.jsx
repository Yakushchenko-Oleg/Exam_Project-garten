import React, { useState } from 'react'

const SingleProductsPage = ({item}) => {
  const [imageOpen, setImageOpen] = useState(null)

  return (
   <>
     {/* <div>
      <img src="" alt="" onClick={() => setImageOpen(item)}/>
    </div>

{
  imageOpen &&  (
    <div className='modal'>
       <div className="modal-content">
        <div className="modal__header"></div>
          <div className="modal__body">
              <img src={imageOpen.url} alt="" />
          </div>
       </div>
    </div>
  )
}
    */}
   </>
  )
}

export default SingleProductsPage