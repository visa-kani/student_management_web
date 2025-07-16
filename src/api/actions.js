import toast from "react-hot-toast";
import { hostConfig } from "../config";

const postData = (requestUrl, params) => {
    const token = localStorage.getItem("token")
    const isFormData = params instanceof FormData;
    return fetch(
        `${hostConfig.api}${requestUrl}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                Authorization: "Bearer " + token,
            },
            body: isFormData ? params : JSON.stringify(params),
        }
    )
        .then((response) => {
            if (response.status === 401) {
                window.location.href = "/login";
                return; // stop further processing
            } else {
                return response;
            }
        })
        .then((result) => {
            // return result.json()
            return result.status === 200 ||
                result.status === 201 ||
                result.status === 400 ||
                result.status === 422 ||
                result.status === 502
                ? result.json()
                : result;
        })
        .catch((error) => {
            console.log(error);
        });
};

const getDataList = (requestUrl, params) => {
    const token = localStorage.getItem("token")
    let getParams = "?";
    if (params && params.limit !== null && params.limit !== undefined) {
        getParams += `&limit=${params.limit}`;
    }
    if (params && params.page !== null && params.page !== undefined) {
        getParams += `&page=${params.page}`;
    }
    if (params && params.search !== null && params.search !== undefined && params.search !== "") {
        getParams += `&search=${params.search}`;
    }
    if (getParams === "?") {
        getParams = "";
    }
    console.log(`${hostConfig.api}${requestUrl}${getParams}`, "requestUrl");
    return fetch(
        `${hostConfig.api}${requestUrl}${getParams}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        }
    )
        .then((response) => {
            if (response.status === 401) {
                toast.error("Session Expired");
                window.location.href = "/login";
                return; // stop further processing
            } else {
                return response;
            }
        })
        .then((result) => {
            // return result.json()
            return result.status === 200 ||
                result.status === 201 ||
                result.status === 400 ||
                result.status === 422 ||
                result.status === 502
                ? result.json()
                : result;
        })
        .catch((error) => {
            console.log(error);
        });
};

const getDataByID = (requestUrl, id, params) => {
    const token = localStorage.getItem("token")
    let getParams = "?";
    //    if (params && params.userId !== null && params.userId !== undefined) {
    //     getParams += `&userId=${params.userId}`;
    //   }
    if (getParams === "?") {
        getParams = "";
    }
    return fetch(
        `${hostConfig.api}${requestUrl}/${id}${getParams}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + token,
            }
        }
    )
        .then((response) => {
            if (response.status === 401) {
                toast.error("Session Expired");
                window.location.href = "/login";
                return; // stop further processing
            } else {
                return response;
            }
        })
        .then((result) => {
            // return result.json()
            return result.status === 200 ||
                result.status === 201 ||
                result.status === 400 ||
                result.status === 422 ||
                result.status === 502
                ? result.json()
                : result;
        })
        .catch((error) => {
            console.log(error);
        });
};

const updateData = (requestUrl, params, id) => {
    const token = localStorage.getItem("token")
    const isFormData = params instanceof FormData;
    return fetch(`${hostConfig?.api}${requestUrl}/${id}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            ...(isFormData ? {} : { "Content-Type": "application/json" }),
            Authorization: "Bearer " + token,
        },
        body: isFormData ? params : JSON.stringify(params),
    })
        .then((response) => {
            if (response.status === 401) {
                toast.error("Session Expired");
                window.location.href = "/login";
                return; // stop further processing
            } else {
                return response;
            }
        })
        .then((result) => {
            return result.json();
        })
        .catch((error) => {
            console.log(error);
        });
};

const deleteData = (requestUrl, id) => {
    const token = localStorage.getItem("token")
    return fetch(`${hostConfig?.api}${requestUrl}/${id}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                toast.error("Session Expired");
                window.location.href = "/login";
                return; // stop further processing
            } else {
                return response;
            }
        })
        .then((result) => {
            return result.json();
        })
        .catch((error) => {
            console.log(error);
        });
};

export {
    postData,
    getDataList,
    getDataByID,
    updateData,
    deleteData
}