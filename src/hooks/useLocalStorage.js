import React, { useEffect, useState } from 'react'

const useLocalStorage = (key, defaultData) => {

const [state, setState] = useState(()=> {
    const localData = localStorage.getItem(key);
    return localData || defaultData
});

useEffect(()=> {
   localStorage.setItem(key, state)
}, [key, state]);


  return [state, setState]
};

export default useLocalStorage