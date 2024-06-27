import React from 'react'
import { useParams } from 'react-router-dom'
import { fetchProductsByCategory } from '../../store/productSlice'

const ProductsPage = () => {

    const { categoryId } = useParams(); 

    useEffect(()=>{
        if(categoryId){
            fetchProductsByCategory()
        }
    }, [])

  return (
    <div>ProductsPage</div>
  )
}

export default ProductsPage