import { deleteData } from "./actions";
import { URL_CONSTANTS } from "./url";

const deleteStudent = (id) => {
  return deleteData(URL_CONSTANTS.student_details, id);
};

const deleteFaculty = (id) => {
  return deleteData(URL_CONSTANTS.faculty_details, id);
};

const deleteAdmin = (id) => {
  return deleteData(URL_CONSTANTS.admin_details, id);
};

export { deleteStudent, deleteFaculty, deleteAdmin };