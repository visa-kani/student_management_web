import React from "react";

const Modal = ({ isOpen, onClose, children, title, centerModal, SubmitTxt, onSubmit, width, submitBtnStyle, disableBtn }) => {
  return (
    <div
      className={`fixed inset-0 bg-opacity-50 flex items-center ${centerModal ? "justify-center" : "justify-end"} z-50 transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      <div
        className={`bg-white rounded-l-lg shadow-lg ${width ? width : " w-full"} max-w-md ${centerModal ? "" : `h-[100vh] transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}`}
      >
        {title ?
          <div className={`font-semibold text-xl ${centerModal ? "mt-3" : "mt-7"} mx-3`}>{title}</div>
          : null}
        <div className="p-4">
          {children}
          <div className="flex justify-end mt-4">
            {!SubmitTxt ? null :
              <button
                onClick={onClose}
                className={`px-4 py-1 mx-3 bg-white hover:text-white border-2 text-gray-600 border-gray-500 rounded-full font-medium hover:bg-gray-600 ${centerModal ? "" : "fixed bottom-8 right-4"}`}
              >
                Cancel
              </button>
            }
            <button
              onClick={SubmitTxt ? onSubmit : onClose}
              style={submitBtnStyle}
              disabled={disableBtn}
              className={`px-4 py-1 bg-white hover:text-white border-2 text-red-600 border-red-500 rounded-full font-medium hover:bg-red-600 ${centerModal ? "" : "fixed bottom-8 right-4"}`}
            >
              {SubmitTxt ? SubmitTxt : "Close"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
