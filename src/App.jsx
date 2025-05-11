import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AppRoute } from './components/routes/app_route'

function App() {

  return (
    <>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </>
  )
}

export default App
