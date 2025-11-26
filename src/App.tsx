
import DissolutionCalculator from './components/DissolutionCalculator'
import { SideBar } from './components/SideBar'
import {Routes, Route} from 'react-router-dom'
import DilutionCalculator from './components/DilutionCalculator'



function App() {


  return (
    <>

    <SideBar/>
    <Routes>
      <Route path='/' element={<DilutionCalculator/>}/>
      <Route path='/Dissolution' element ={<DissolutionCalculator/>}/>
    </Routes>
   
   
    </>
  )
}

export default App
