// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { ApiLoader } from "./components/loader";
// import Login from "./pages/login";
// import "./App.css";

// const App = () => {
//   const Layout = React.lazy(() => import("./container/layout"));

//   const isLoggedIn = localStorage.getItem("loggedUser");

//   return (
//     <div>
//       <Router>
//         <React.Suspense
//           fallback={
//             <div className="py-5 my-5">
//               <ApiLoader />
//             </div>
//           }
//         >
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/"
//               element={
//                 isLoggedIn ? (
//                   <Layout />
//                 ) : (
//                   <Navigate to="/login" replace />
//                 )
//               }
//             />
//             <Route path="*" element={<Navigate to="/" replace />} />
//           </Routes>
//         </React.Suspense>
//       </Router>

//       <Toaster
//         position="top-center"
//         reverseOrder={false}
//         gutter={8}
//         toastOptions={{
//           duration: 3000,
//           style: { background: "#fff", color: "#000" },
//           success: {
//             duration: 3000,
//             theme: { primary: "green", secondary: "black" },
//           },
//           error: {
//             style: { background: "#fbe8e9", color: "#000" },
//             duration: 2000,
//             theme: { primary: "green", secondary: "black" },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default App;

/** ***************************** Import Packages ****************************** */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ApiLoader } from "./components/loader";
import Login from "./pages/login";
import "./App.css";

const App = () => {
  const Layout = React.lazy(() => import("./container/layout"));
  const isLoggedIn = localStorage.getItem("loggedUser");

  return (
    <div>
      <Router>
        <React.Suspense
          fallback={
            <div className="py-5 my-5">
              <ApiLoader />
            </div>
          }
        >
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Default Route */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Protected Layout Route */}
            <Route
              path="/*"
              element={
                isLoggedIn ? (
                  <Layout />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </React.Suspense>
      </Router>

      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: { background: "#fff", color: "#000" },
          success: {
            duration: 3000,
            theme: { primary: "green", secondary: "black" },
          },
          error: {
            style: { background: "#fbe8e9", color: "#000" },
            duration: 2000,
            theme: { primary: "green", secondary: "black" },
          },
        }}
      />
    </div>
  );
};

export default App;
