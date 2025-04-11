import './App.css'
import HrForm from './components/hr-form/HrForm'
import JobsDisplay from './components/hr-form/JobsDisplay'

function App() {

  return (
    <div className='p-4 w-full bg-teal-100/50'>
      <HrForm/>
      <JobsDisplay/>
    </div>
    
  )
}

export default App
