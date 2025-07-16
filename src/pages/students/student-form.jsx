import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './students.css';
import Input from '../../components/form-elements/input';
import { addErrorIcon } from '../../utils/common';
import { IoIosArrowBack } from "react-icons/io";
import ImageUpload from '../../components/image-upload';
import { toast } from "react-hot-toast";
import { addStudent, editStudent } from '../../redux/slice/student.slice';
import { useDispatch } from 'react-redux';

function StudentForm(props) {
    const { setStudentEdit, selectedRowData, GetStudentData } = props;
    const [selectedFormData, setFormData] = useState(null);
    const dispatch = useDispatch();
    const [btnLoader, setBtnLoader] = useState(false);
    console.log(selectedFormData, "selectedFormData");
    const formik = useFormik({
        initialValues: {
            first_name: selectedRowData.first_name || '',
            last_name: selectedRowData.last_name || '',
            date_of_birth: selectedRowData.date_of_birth || '',
            gender: selectedRowData.gender || '',
            email: selectedRowData.email || '',
            phone_number: selectedRowData.phone_number || '',
            address: selectedRowData.address || '',
            city: selectedRowData.city || '',
            state: selectedRowData.state || '',
            pincode: selectedRowData.pincode || '',
            country: selectedRowData.country || '',
            enrollment_number: selectedRowData.enrollment_number || '',
            admission_date: selectedRowData.admission_date || '',
            profile_image: selectedRowData.profile_image || '',
            course: selectedRowData.course || '',
            status: selectedRowData.status || 'active',
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('First name is required'),
            last_name: Yup.string().required('Last name is required'),
            date_of_birth: Yup.date().required('Date of birth is required'),
            gender: Yup.string().required('Gender is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phone_number: Yup.string().required('Phone number is required'),
            address: Yup.string().required('Address is required'),
            city: Yup.string().required('City is required'),
            state: Yup.string().required('State is required'),
            pincode: Yup.string().required('Pincode is required'),
            country: Yup.string().required('Country is required'),
            enrollment_number: Yup.string().required('Enrollment number is required'),
            admission_date: Yup.date().required('Admission date is required'),
            // profile_image: Yup.string().url('Invalid URL').required('Profile image URL is required'),
            course: Yup.string().required('Course is required'),
            status: Yup.string().required('Status is required'),
        }),
        onSubmit: async (values) => {
            console.log('Form data:', values);
            setBtnLoader(true);
            // values.profile_image = "default.jpg";
            // send to backend via axios or fetch here
            if (selectedRowData.id) {
                values.id = selectedRowData.id;
                const formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }

                // Handle profile image correctly
                if (selectedFormData instanceof File) {
                    formData.append('profile_image', selectedFormData); // New file selected
                } else {
                    formData.append('profile_image', selectedRowData.profile_image); // Keep existing
                }
                await dispatch(editStudent({ params: formData, id: selectedRowData.id })).then((res) => {
                    const response = res.payload
                    setBtnLoader(false);
                    if (response.status === "SUCCESS") {
                        setStudentEdit(false);
                        toast.success("Student updated Successfully");
                        formik.resetForm();
                        GetStudentData();
                    } else {
                        toast.error("Update student unsuccessful");
                    }
                })
            } else {
                const formData = new FormData();
                for (let key in values) {
                    formData.append(key, values[key]);
                }
                formData.append('profile_image', selectedFormData); // selectedFile is the actual File object


                await dispatch(addStudent(formData)).then((res) => {
                    console.log(res, "add student")
                    const response = res.payload
                    setBtnLoader(false);
                    if (response.status === "SUCCESS") {
                        setStudentEdit(false);
                        toast.success("Student created in Successfully");
                        formik.resetForm();
                        GetStudentData();
                    } else {
                        toast.error("Create student unsuccessful");
                    }
                })
            }
        },
    });


    return (
        <div>
            <p className='cursor-pointer font-medium flex items-center' onClick={() => { setStudentEdit(false); formik.resetForm() }}><IoIosArrowBack className='mr-2' />
                Back to Student List</p>
            <div>
                <ImageUpload setFormData={setFormData} existingImage={selectedRowData.profile_image} />
            </div>
            <div style={{ overflowY: 'auto', height: "600px" }} className="mt-5">
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid grid-cols-4 gap-4 w-full'>
                        {/* <div className='col-span-1 sticky top-0'>
                            Student Details
                        </div> */}
                        <div className='col-span-4'>
                            <div className='grid grid-cols-4 gap-4'>
                                {/* First Name */}
                                <div className="">
                                    <Input
                                        id="first_name"
                                        name="first_name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.first_name}
                                        label="First Name"
                                    />
                                    <div className='error-space'>

                                        {formik.touched.first_name && formik.errors.first_name && (
                                            <div className="error">{addErrorIcon(formik.errors.first_name)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="">
                                    <Input
                                        id="last_name"
                                        name="last_name"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.last_name}
                                        label="Last Name"
                                    />
                                    <div className='error-space'>

                                        {formik.touched.last_name && formik.errors.last_name && (
                                            <div className="error">{addErrorIcon(formik.errors.last_name)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Date of Birth */}
                                <div className="">
                                    <Input
                                        id="date_of_birth"
                                        name="date_of_birth"
                                        type="date"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.date_of_birth}
                                        label={"Date of Birth"}
                                    />
                                    <div className='error-space'>

                                        {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                                            <div className="error">{addErrorIcon(formik.errors.date_of_birth)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="">
                                    <label htmlFor="state" className="block text-sm font-medium mb-1">Gender</label>
                                    <select
                                        id="gender"
                                        name="gender"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.gender}
                                        label={"Gender"}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className='error-space'>

                                        {formik.touched.gender && formik.errors.gender && (
                                            <div className="error">{addErrorIcon(formik.errors.gender)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        label={"Email"}
                                    />
                                    <div className='error-space'>

                                        {formik.touched.email && formik.errors.email && (
                                            <div className="error">{addErrorIcon(formik.errors.email)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="">
                                    <Input
                                        id="phone_number"
                                        name="phone_number"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone_number}
                                        label={"Phone Number"}
                                    />
                                    <div className='error-space'>

                                        {formik.touched.phone_number && formik.errors.phone_number && (
                                            <div className="error">{addErrorIcon(formik.errors.phone_number)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="">
                                    <Input
                                        id="address"
                                        name="address"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.address}
                                        label={"Address"}
                                    />
                                    <div className='error-space'>

                                        {formik.touched.address && formik.errors.address && (
                                            <div className="error">{addErrorIcon(formik.errors.address)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* City */}
                                <div className="">
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.city}
                                        label={"City"}
                                    />
                                    <div className='error-space'>
                                        {formik.touched.city && formik.errors.city && (
                                            <div className="error">{addErrorIcon(formik.errors.city)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* State */}
                                <div className="">
                                    <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
                                    <select
                                        id="state"
                                        name="state"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.state}
                                        label={"State"}
                                    >
                                        <option value="">Select State</option>
                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                        <option value="Kerala">Kerala</option>
                                        <option value="Karnataka">Karnataka</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className='error-space'>

                                        {formik.touched.state && formik.errors.state && (
                                            <div className="error">{addErrorIcon(formik.errors.state)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Pincode */}
                                <div className="">
                                    <Input
                                        id="pincode"
                                        name="pincode"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.pincode}
                                        label={"Pincode"}
                                    />
                                    <div className='error-space'>

                                        {formik.touched.pincode && formik.errors.pincode && (
                                            <div className="error">{addErrorIcon(formik.errors.pincode)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Country */}
                                <div className="">
                                    <label htmlFor="state" className="block text-sm font-medium mb-1">Country</label>
                                    <select
                                        id="country"
                                        name="country"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.country}
                                        label={"Country"}
                                    >
                                        <option value="">Select Country</option>
                                        <option value="India">India</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <div className='error-space'>

                                        {formik.touched.country && formik.errors.country && (
                                            <div className="error">{addErrorIcon(formik.errors.country)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Enrollment Number */}
                                <div className="">
                                    <Input
                                        id="enrollment_number"
                                        name="enrollment_number"
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.enrollment_number}
                                        label={"Enrollment Number"}
                                    />
                                    <div className='error-space'>

                                        {formik.touched.enrollment_number && formik.errors.enrollment_number && (
                                            <div className="error">{addErrorIcon(formik.errors.enrollment_number)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Admission Date */}
                                <div className="">
                                    <Input
                                        id="admission_date"
                                        name="admission_date"
                                        type="date"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.admission_date}
                                        label={"Admission Date"}
                                    />
                                    <div className='error-space'>

                                        {formik.touched.admission_date && formik.errors.admission_date && (
                                            <div className="error">{addErrorIcon(formik.errors.admission_date)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Course */}
                                 <div className="">
                                    <label htmlFor="state" className="block text-sm font-medium mb-1">Course</label>
                                    <select
                                        id="course"
                                        name="course"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.course}
                                        label={"course"}
                                    >
                                        <option value="">Select course</option>
                                        <option value="Commerce">Commerce</option>
                                        <option value="Accounts">Accounts</option>
                                        <option value="Computer Science">Computer Science</option>
                                        <option value="Biology">Biology</option>
                                        <option value="Fashion Designing">Fashion Designing</option>
                                    </select>
                                    <div className='error-space'>

                                        {formik.touched.course && formik.errors.course && (
                                            <div className="error">{addErrorIcon(formik.errors.course)}</div>
                                        )}
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="">
                                    <label htmlFor="state" className="block text-sm font-medium mb-1">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.status}
                                        label={"status"}
                                    >
                                        <option value="">Select status</option>
                                        <option value="active">Active</option>
                                        <option value="Inactive">In Active</option>
                                    </select>
                                    <div className='error-space'>

                                        {formik.touched.status && formik.errors.status && (
                                            <div className="error">{addErrorIcon(formik.errors.status)}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-end'>
                        <div className='w-[15%]'>
                            <button onClick={() => { setStudentEdit(false); formik.resetForm() }} type="button">Cancel</button>
                        </div>
                        <div className='w-[15%] ml-5'>
                            <button disabled={btnLoader} type="submit">
                                {btnLoader ? (
                                    <>
                                        <span className="spinner"></span> Submitting
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentForm;
