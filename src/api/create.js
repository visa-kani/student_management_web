import { postData } from "./actions";
import { URL_CONSTANTS } from "./url";

const createStudent = (params) => {
  return postData(URL_CONSTANTS.student_details, params);
};

const uploadStudents = (params) => {
  return postData(URL_CONSTANTS.student_details, params);
};

const createFaculty = (params) => {
  return postData(URL_CONSTANTS.faculty_details, params);
};

const createAdmin = (params) => {
  return postData(URL_CONSTANTS.admin_details, params);
};

const Login = (params) => {
  return postData(URL_CONSTANTS.login, params);
};

export { createStudent, createFaculty, createAdmin, Login, uploadStudents };