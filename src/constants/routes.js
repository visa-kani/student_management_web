/** ***************************** Import Libraries ****************************** */
import React from "react";

/** ****************************** Import Filled icons ********************************* */
import DashboardIcon from "../assets/dashboard-icons/filled-icons/dashboard.svg";
import StudentsIcon from "../assets/dashboard-icons/filled-icons/customers.svg";
import FacultyIcon from "../assets/dashboard-icons/filled-icons/activities-notes.svg";
import Activities from "../assets/dashboard-icons/filled-icons/activity.svg";

/** ****************************** Import UnFilled icons ********************************* */
import DashboardIconNA from "../assets/dashboard-icons/unfilled-icons/dashboard.svg";
import StudentsIconNA from "../assets/dashboard-icons/unfilled-icons/customers.svg";
import FacultyIconNA from "../assets/dashboard-icons/unfilled-icons/activities-notes.svg";
import ActivitiesNA from "../assets/dashboard-icons/unfilled-icons/activity.svg";

/** **************************** Import components ****************************** */
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const students = React.lazy(() => import("../pages/students"));
const faculty = React.lazy(() => import("../pages/faculty"));
const activityLog = React.lazy(() => import("../pages/activity-log"));

// ***************************** routes ******************************//
const routes = [
  {
    name: "Dashboard",
    route: "/dashboard",
    image: DashboardIconNA,
    activeImage: DashboardIcon,
    element: Dashboard,
    id: 0,
  },
  {
    name: "Students Details",
    route: "/students-details",
    image: StudentsIcon,
    activeImage: StudentsIconNA,
    element: students,
    id: 1,
  },
  {
    name: "Faculty Details",
    route: "/faculty-members",
    image: FacultyIcon,
    activeImage: FacultyIconNA,
    element: faculty,
    id: 1,
  },
  {
    name: "Activity Logs",
    route: "/activity-logs",
    image: Activities,
    activeImage: ActivitiesNA,
    element: activityLog,
    id: 1,
  },
];

export default routes;
