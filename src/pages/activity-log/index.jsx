import React, { useState, useEffect } from 'react'
import TableData from '../../components/custom-table'
import Pagination from '../../components/pagination';
import Modal from '../../components/modal';
import { useDispatch } from 'react-redux';
import { fetchActivities } from '../../redux/slice/activity.slice';
import DataComparison from './data-comparison';

function ActivityLog() {
  const [loader, setLoader] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [studentsData, setStudentsData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [totalPages, setTotalPages] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setLoader(true);
    const userData = JSON.parse(localStorage.getItem("loggedUser"));
    setUserDetails(userData);
    dispatch(fetchActivities({ limit: 10, page: currentPage, search: search })).then((res) => {
      setStudentsData(res.payload.records)
      setTotalPages(res.payload.totalPages)
      setLoader(false);
    })
  }, [])

  const handleSearch = (value) => {
    setSearch(value);
    setLoader(true);
    dispatch(fetchActivities({ limit: 10, page: currentPage, search: value })).then((res) => {
      setStudentsData(res.payload.records)
      setTotalPages(res.payload.totalPages)
      setLoader(false);
    })
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    console.log("Page changed to:", newPage);
    setLoader(true);
    dispatch(fetchActivities({ limit: 10, page: newPage })).then((res) => {
      setStudentsData(res.payload.records)
      setTotalPages(res.payload.totalPages)
      setLoader(false);
    })
  };

  return (
    <div>
      <div>
        <p className='text-lg font-medium'> Activity log details</p>
        <div className='mt-5'>
          <TableData
            scopedSlots={{
              "Activity Name": ({ row }) => (
                <div className='text-black'>
                  Student activity
                </div>
              ),
              Type: ({ row }) => <div style={{ width: "100px" }}>{row.type === "create" ? "Create" : row.type === "update" ? "Update" : "Delete"} </div>,
              "Updated By": ({ row }) => (
                <div style={{ width: "150px" }} className='text-black'>
                  Admin - {row.userDetails.first_name}
                </div>
              ),
              createdAt: ({ row }) => (
                <div className='text-black'>
                  {new Date(row.createdAt).toDateString()}
                </div>
              ),

            }}
            columns={["Activity Name", "Type", "Updated By", "createdAt"]}
            data={studentsData}
            Clickable={true}
            rowClick={(row) => { setSelectedRowData(row); setIsOpen(true); }}
            loader={loader}
          />
          {totalPages > 1 &&
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          }
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={"Activity Log Information"}
      >
        <div className='flex justify-between items-center mt-2'>
          <div className='font-medium text-base'>Activity Type</div>
          <div className='font-medium text-sm text-gray-500'>- {selectedRowData.type === "create" ? "Student created" : selectedRowData.type === "update" ? "Student updated" : "Student deleted"} </div>
        </div>
        <div className='flex justify-between items-center mt-3'>
          <div className='font-medium text-base'>{selectedRowData.type === "create" ? "Created" : selectedRowData.type === "update" ? "Updated" : "Deleted"} By</div>
          <div className='font-medium text-sm text-gray-500'>- Admin user - {selectedRowData?.userDetails?.first_name}</div>
        </div>
        <div className='flex justify-between items-center mt-3'>
          <div className='font-medium text-base'>{selectedRowData.type === "create" ? "Created" : selectedRowData.type === "update" ? "Updated" : "Deleted"} On</div>
          <div className='font-medium text-sm text-gray-500'>- {new Date(selectedRowData?.createdAt).toDateString()}</div>
        </div>

        <div className='font-medium text-base my-4'>{selectedRowData.type === "create" ? "Created" : selectedRowData.type === "update" ? "Updated" : "Deleted"} Student Details:</div>
        <div className='flex justify-between items-center mt-3'>
          <div className='font-medium text-base'>First Name</div>
          <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.currentData?.first_name} </div>
        </div>
        <div className='flex justify-between items-center mt-3'>
          <div className='font-medium text-base'>Last Name</div>
          <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.currentData?.last_name}</div>
        </div>
        <div className='flex justify-between items-center mt-3'>
          <div className='font-medium text-base'>Email</div>
          <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.currentData?.email}</div>
        </div>
        {selectedRowData.type === "update" ?
          <DataComparison selectedRowData={selectedRowData} /> :
          null
        }


      </Modal>

    </div>
  )
}

export default ActivityLog