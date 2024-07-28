import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from './store/index.js';
import ThemeContextProvider from './providers/ThemeProvider.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>

      <ThemeContextProvider>
        <App /> 
      </ThemeContextProvider>

    </Provider>
  </BrowserRouter>
)
