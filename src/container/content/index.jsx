/* ******************************** Import Packages ******************************* */
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

/******************Import routes to route the content based on routes*********************/
import routes from "../../constants/routes";

const Content = (props) => {
  const { onClick } = props;

  return (
    <div>
      <div onClick={onClick}>
        <div key={window.location.pathname}>
          <Suspense
            fallback={
              <div className="d-flex justify-content-center align-items-center">
                {/* <img src={SpinnerImg} width="6%" height="6%" /> */}
              </div>
            }
          >
            <Routes>
              {/* Menu */}
              {routes?.map((route, index) =>(
                  <Route
                    key={index}
                    path={route.route}
                    element={<route.element />}
                  />
                )
              )}
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Content;
