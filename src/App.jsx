import HrForm from './components/hr-form/HrForm'
import JobsDisplay from './components/hr-form/JobsDisplay'

function App() {
  return (
    <div className='relative min-h-screen p-4 w-full bg-teal-100/60'>
      {/* Background text overlay */}
      <div className='fixed inset-0 flex items-center justify-center pointer-events-none z-0'>
        <h1 className='text-[14rem] font-bold text-teal-900/5 select-none text-center leading-none'>
          NextGen<br/>Job Portal
        </h1>
      </div>

      {/* Content container */}
      <div className='relative z-10'>
        <HrForm/>
        <JobsDisplay/>
      </div>
    </div>
  )
}

export default App
