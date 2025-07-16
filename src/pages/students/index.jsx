import React, { useState, useEffect } from 'react'
import TableData from '../../components/custom-table'
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import StudentForm from './student-form';
import Pagination from '../../components/pagination';
import Modal from '../../components/modal';
import toast from 'react-hot-toast';
import { FiSearch } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { fetchStudents, removeStudent } from '../../redux/slice/student.slice';
import ExcelIcon from "../../assets/images/excel-icon.png"
import { uploadStudents } from '../../api/create';

function StudentDetails() {
    const [loader, setLoader] = useState(false);
    const [userDetails, setUserDetails] = useState({});
    const [studentsData, setStudentsData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [totalPages, setTotalPages] = useState("");
    const [studentEdit, setStudentEdit] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [importModal, setImportModal] = useState(false);
    const [btnLoader, setButtonLoader] = useState(false);
    const [search, setSearch] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoader(true);
        const userData = JSON.parse(localStorage.getItem("loggedUser"));
        setUserDetails(userData);
        dispatch(fetchStudents({ limit: 10, page: currentPage, search: search })).then((res) => {
            setStudentsData(res.payload.records)
            setTotalPages(res.payload.totalPages)
            setLoader(false);
        })
    }, [])

    const GetStudentData = () => {
        setLoader(true);
        dispatch(fetchStudents({ limit: 10, page: currentPage, search: search })).then((res) => {
            setStudentsData(res.payload.records)
            setTotalPages(res.payload.totalPages)
            setLoader(false);
        })
    }

    const handleSearch = (value) => {
        setSearch(value);
        setLoader(true);
        dispatch(fetchStudents({ limit: 10, page: currentPage, search: value })).then((res) => {
            setStudentsData(res.payload.records)
            setTotalPages(res.payload.totalPages)
            setLoader(false);
        })
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        console.log("Page changed to:", newPage);
        setLoader(true);
        dispatch(fetchStudents({ limit: 10, page: newPage, search: search })).then((res) => {
            setStudentsData(res.payload.records)
            setTotalPages(res.payload.totalPages)
            setLoader(false);
        })
    };

    const DeleteStudent = (id) => {
        dispatch(removeStudent(id)).then((res) => {
            const response = res.payload
            if (response.status === "SUCCESS") {
                setDeleteModal(false);
                toast.success("Student deleted Successfully");
                GetStudentData();
            } else {
                toast.error("Delete student unsuccessful");
            }
        })
    }

    const handleDownload = async () => {
        try {
            setButtonLoader(true);
            const response = await fetch("http://localhost:7001/student_api/download_students_excel");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "students.xlsx");
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            setButtonLoader(false);
            toast.success("Excel file downloaded successfully.");
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download students Excel.");
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };

    // import students data
    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            uploadStudents(formData).then((res) => {
                if (res.status === "SUCCESS") {
                    toast.success(`Upload successful! Saved: ${res.saved}, Failed: ${res.failed}`);
                    GetStudentData();
                    setImportModal(false);
                    setFile(null);
                } else {
                    toast.success(`Upload failed: ${res.error || "Unknown error"}`);
                }
            })
        } catch (error) {
            console.error("Error uploading file:", error);
            toast.success("Something went wrong. Check console.");
        }
    };


    return (
        <div>
            {studentEdit ? <StudentForm selectedRowData={selectedRowData} setStudentEdit={setStudentEdit} GetStudentData={GetStudentData} /> :
                <div>
                    <p className='text-lg font-medium'> Student details</p>
                    <div className='flex justify-end mb-5'>
                        <div className='w-[250px] h-[35px] relative'>
                            <div><FiSearch className='absolute top-[9px] left-2 text-gray-500' /></div>
                            <input className='search-input pl-5' value={search} onChange={(e) => { handleSearch(e.target.value) }} placeholder='Search' />
                        </div>
                        <button onClick={handleDownload} disabled={btnLoader} style={{ opacity: btnLoader ? 0.5 : 1 }} className='border-[1px] h-[35px] mx-3 border-[#047bba] text-[#047bba] bg-[#fff] font-medium px-2 pt-0.5 pb-1 rounded-lg text-sm'>{btnLoader ? "Exporting..." : "Export"}</button>
                        {userDetails.role === "admin" ?
                            <>
                                <button onClick={() => setImportModal(true)} className='border-[1px] h-[35px] mr-3 border-[#047bba] text-[#047bba] bg-[#fff] font-medium px-2 pt-0.5 pb-1 rounded-lg text-sm'>Import</button>
                                <button onClick={() => { setStudentEdit(true); setSelectedRowData({}) }} className='border-[1px] h-[35px] mr-3 border-[#047bba] text-[#047bba] bg-[#fff] font-medium px-2 pt-0.5 pb-1 rounded-lg text-sm'>Add Student</button>
                            </>
                            : null}
                    </div>
                    <div>
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
                                course: ({ row }) => <div style={{ width: "80px" }} className='text-black'>{row.course?.length > 8 ? row.course.slice(0, 8) + "..." : row.course}</div>,
                                status: ({ row }) => <div>{row.status === "active" || row.status === "Active" ? <span className='text-green-700 font-semibold lowercase'>active</span> : <span className='text-[#ff2828] font-semibold capitalize'>Inactive</span>}</div>,
                                createdAt: ({ row }) => (
                                    <div className='text-black'>
                                        {new Date(row.createdAt).toDateString()}
                                    </div>
                                ),
                                Actions: ({ row }) => (
                                    <div className='text-black p-2'>
                                        <div className='relative'>
                                            <div className={`cursor-pointer flex items-center absolute ${userDetails.role === "admin" ? "-left-8" : "-left-4"} top-[-10px]`}>
                                                <button onClick={() => setIsOpen(true)} className='border-[1px] border-[#047bba] text-[#047bba] bg-[#fff] font-medium px-2 pt-0.5 pb-1 rounded-lg'>view</button>
                                                {userDetails.role === "admin" ?
                                                    <>
                                                        <RiEditLine className='mx-3 text-lg text-[#047bba]' onClick={(e) => { setStudentEdit(true); e.stopPropagation(); setSelectedRowData(row) }} />
                                                        <MdOutlineDelete className='text-lg text-[#ff2828]' onClick={(e) => { setDeleteModal(true); e.stopPropagation(); setSelectedRowData(row) }} />
                                                    </> : null}
                                            </div>
                                        </div>
                                    </div>
                                ),
                            }}
                            columns={["name", "email", "phone", "course", "status", "createdAt", "Actions"]}
                            data={studentsData}
                            Clickable={true}
                            rowClick={(row) => { setSelectedRowData(row) }}
                            loader={loader}
                        />
                        {totalPages > 1 &&
                            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        }
                    </div>
                </div>
            }
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title={"Student Information"}
            >
                <div className='flex justify-between items-center mt-2'>
                    <div className='font-medium text-base'>Name</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.first_name} {" "} {selectedRowData?.last_name}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Date of Birth</div>
                    <div className='font-medium text-sm text-gray-500'>- {new Date(selectedRowData?.date_of_birth).toDateString()}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Gender</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.gender}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Email</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.email}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Phone Number</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.phone_number}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Enrollment Number</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.enrollment_number}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Admission Date</div>
                    <div className='font-medium text-sm text-gray-500'>- {new Date(selectedRowData?.admission_date).toDateString()}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Course</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.course}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Country</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.country}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>State</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.state}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>City</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.city}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Pincode</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.pincode}</div>
                </div>
                <div className='flex justify-between items-center mt-3'>
                    <div className='font-medium text-base'>Status</div>
                    <div className='font-medium text-sm text-gray-500'>- {selectedRowData?.status}</div>
                </div>
            </Modal>
            <Modal
                isOpen={deleteModal}
                onClose={() => setDeleteModal(false)}
                title={"Delete Student"}
                centerModal={true}
                SubmitTxt={"Delete"}
                onSubmit={() => DeleteStudent(selectedRowData?.id)}
            >
                <p className='text-center px-3'>Are you sure you want to delete this student {selectedRowData?.first_name}?</p>
            </Modal>
            <Modal
                isOpen={importModal}
                onClose={() => { setImportModal(false); setFile(null) }}
                title={"Import Student Data"}
                centerModal={true}
                SubmitTxt={"Upload"}
                onSubmit={() => handleUpload()}
                submitBtnStyle={{ backgroundColor: "#047bba", color: "white", borderColor: "#047bba", opacity: file ? 1 : 0.5 }}
                disableBtn={!file}
            >
                <p className='text-center px-3'>

                    <input
                        type="file"
                        id="fileInput"
                        accept=".csv, .xlsx, .xls"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    {file ?
                        <div className='border-solid border-2 border-gray-100 bg-gray-50 p-4 rounded-lg'>
                            <div className='flex items-center justify-start'>
                                <img src={ExcelIcon} alt="excel" width={"50px"} height={"500px"} />
                                <div className='text-left'>
                                    <p className='ml-3'>{file.name}</p>
                                    <p className='ml-3 text-xs text-gray-500 mt-1'>{file.type}</p>
                                </div>
                            </div>
                        </div> :
                        <div className='border-dashed border-2 border-gray-400 p-4 rounded-lg'>
                            <div> <label htmlFor="fileInput" className='cursor-pointer text-[#047bba] underline underline-offset-1 text-base'>Browse</label> file, then click on "Upload"</div>
                            <div className='text-xs text-gray-500 mt-1'>Allowed file types: .csv, .xlsx, .xls</div>
                            <div className='text-xs text-[#047bba] mt-1'><a href={`http://localhost:7001/uploads/student_sample_data.xlsx`} className='cursor-pointer'>Download sample file</a></div>
                        </div>
                    }
                </p>
            </Modal>
        </div>
    )
}

export default StudentDetails