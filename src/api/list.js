import { getDataList, getDataByID } from "./actions";
import { URL_CONSTANTS } from "./url";

const listStudent = (params) => {
    return getDataList(URL_CONSTANTS.student_details, params);
};

const getStudentAnalytics = (params) => {
    return getDataList(URL_CONSTANTS.student_analytics, params);
};

const listFaculty = (params) => {
    return getDataList(URL_CONSTANTS.faculty_details, params);
};

const listAdmin = (params) => {
    return getDataList(URL_CONSTANTS.admin_details, params);
};

const getStudentById = (id, params) => {
    return getDataByID(URL_CONSTANTS.student_details, id, params);
};

const getFacultyById = (id, params) => {
    return getDataByID(URL_CONSTANTS.faculty_details, params);
};

const getAdminById = (id, params) => {
    return getDataByID(URL_CONSTANTS.admin_details, params);
};

const activityLogs = (params) => {
    return getDataList(URL_CONSTANTS.activity_logs, params);
}

export { listStudent, listFaculty, listAdmin, getStudentById, getFacultyById, getAdminById, activityLogs, getStudentAnalytics };