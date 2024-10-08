import React, { useEffect, useState } from 'react'
import '../../App.scss'
import  './DiscountForm.scss'
import { useForm } from "react-hook-form"
import { fetchGetDiscount } from '../../store/cartSlice ';
import { useDispatch } from 'react-redux';

const DiscountForm = () => {

  const dispatch = useDispatch();
  const [isDiscount, setIsDiscount] = useState( false) // пока не работаеь эта конструкция

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset
  } = useForm()

  const handleDiscountSubmit = (data) => {
    dispatch(fetchGetDiscount(data))
    reset()
  }

  useEffect(()=> {
    let discount = JSON.parse(localStorage.getItem('discount'))
    if (discount) {
      setIsDiscount(true)
    }
  },[])

  useEffect(()=> {
    if (isSubmitSuccessful) {
      setIsDiscount(true)
    }
  },[isSubmitSuccessful])

  
  return (

    <div className="discount__container">
      <h3 className="discount__title">5% off on the first order</h3>
      <div className="form__container">
        <img src="./images/dicount/discount_image.svg" alt="" />

        <form className="form" onSubmit={handleSubmit(handleDiscountSubmit)}>
          
          <div className="form__item">

            <label htmlFor="username"></label>

            <input className='form-input'
              placeholder="Name"
              type="text"
              id="username"
              name="username"
              {...register("username", {
                required: 'Name required',
                minLength:{value: 2, message: 'Minimum name length 2 letters'},
                maxLength:{ value: 20, message: 'Maximum name length 20 letters'}
              })}
            />
            <p className='errornessage'>{errors.username?.message}</p>
          </div>

          <div className="form__item">

            <label htmlFor="phonenumber"></label>

            <input className='form-input'
              placeholder="Phone number"
              type="tel"
              id="phonenumber"
              name="phonenumber"
              {...register('phonenumber', {
                required: 'Phone number required',
                pattern: {
                  value: /(?:([+]\d{1,4})[-.\s]?)?(?:[(](\d{1,3})[)][-.\s]?)?(\d{1,4})[-.\s]?(\d{1,4})[-.\s]?(\d{1,9})/g,
                  message: 'Incorrect phone number'
                },
              })}
            />
            <p className='errornessage'>{errors.phonenumber?.message}</p>
          </div>

          <div className="form__item">

            <label htmlFor="email"></label>
            
            <input className='form-input'
              placeholder="Email"
              type="text"
              id="email"
              name="email"
              {...register("email", {
                required: 'Email required',
                pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, message: 'Incorrect email format'}
              })}
            />
            <p className='errornessage'>{errors.email?.message}</p>

          </div>

          <button className="discount__btn btn" disabled={isDiscount}> 
            {
              isDiscount === true? "You've got a discount" :'Get a discount' // пока не работаеь эта конструкция
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiscountForm;