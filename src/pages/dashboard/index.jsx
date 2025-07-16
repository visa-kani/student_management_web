import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAnalytics } from '../../redux/slice/student.slice';
import StudentCoursePieChart from './dashboard-charts';


function Dashboard() {
  const [loading, setLoading] = useState(false)
  const [analytics, setAnalytics] = useState([])

  const dispatch = useDispatch();

  console.log(analytics, "analytics");

  useEffect(() => {
    setLoading(true)
    dispatch(fetchAnalytics({})).then((res) => {
      setAnalytics(res.payload.data);
      setLoading(false)
    })
  }, [])
  return (
    <div>
      <div className='grid grid-cols-3 gap-4 place-content-center place-items-center mb-10 mt-5'>
        <div className='bg-white rounded-lg p-3 shadow-md w-[250px] h-[80px] shadow-[#cee4ef] flex flex-col justify-between'>
          <div className='text-xl font-semibold'>
            No.of.students
          </div>
          <div className='text-xl text-end mr-5 font-semibold text-[#047bba]'>- {analytics?.totalStudents}</div>
        </div>
        {/* <div className='bg-white rounded-lg p-3 shadow-md w-[250px] h-[80px] shadow-[#cee4ef]'>
           <div className='text-xl font-semibold '>
            No.of.faculty
          </div>
          <div className='text-xl text-end mr-5 font-semibold text-[#047bba]'>- 10</div>
        </div> */}
      
      </div>
      <StudentCoursePieChart analytics={analytics} />
    </div>
  )
}

export default Dashboard