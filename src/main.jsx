import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import BackgroundContainer from './components/BackGroundContainer/BackGroundContainer.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BackgroundContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </BackgroundContainer>
  </StrictMode>,
)
