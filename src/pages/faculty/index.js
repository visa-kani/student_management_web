import React, { useState, useEffect } from 'react'
import TableData from '../../components/custom-table'
import { useDispatch } from 'react-redux';
import { fetchFaculty } from '../../redux/slice/faculty.slice';

function StudentDetails() {
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [facultyData, setFacultyData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    const userData = JSON.parse(localStorage.getItem("loggedUser"));
    setUserDetails(userData);
    dispatch(fetchFaculty({})).then((res) => {
      console.log(res, "res,payload");
      setFacultyData(res.payload.records)
      setLoader(false);
    })
  }, [])


  return (
    <div>
        <div>
          <p className='text-lg font-medium'> Faculty details</p>
        
          <div className='mt-5'>
            <TableData
              scopedSlots={{
                name: ({ row }) => (
                  <div className='text-black'>
                    {row.first_name}
                  </div>
                ),
                email: ({ row }) => <div style={{ width: "100px" }}> {row.email?.length > 18 ? `${row.email.slice(0, 18)}...` : row.email} </div>,
                phone: ({ row }) => (
                  <div className='text-black'>
                    {row.phone_number}
                  </div>
                ),
                status: ({ row }) => <div>{row.status === "active" || row.status === "Active" ? <span className='text-green-700 font-semibold lowercase'>active</span> : <span className='text-[#ff2828] font-semibold capitalize'>Inactive</span>}</div>,
                createdAt: ({ row }) => (
                  <div className='text-black'>
                    {new Date(row.createdAt).toDateString()}
                  </div>
                ),

              }}
              columns={["name", "email", "phone", "status", "createdAt"]}
              data={facultyData}
              Clickable={false}
              loader={loader}
            />
          </div>
        </div>
    </div>
  )
}

export default StudentDetails