import React from "react";

function Input(props) {
    const {
        type,
        id,
        name,
        label,
        value,
        onKeyPress,
        onChange,
        labelClassName,
        placeholder,
        icon,
        disabled,
        onBlur,
        iconStyle,
        onClicked,
        iconChanges,
    } = props;
    return (
        <div className={`relative`}>
            {label ? <label htmlFor={id} className={`block ml-1 mb-1 font-medium text-sm ${labelClassName}`}>{label}</label> : null}
            <input
                type={type}
                className={`w-full rounded-lg h-[41px] px-3`}
                name={name}
                id={id}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onKeyPress={onKeyPress}
                placeholder={placeholder}
                disabled={disabled ? disabled : false}
                autoComplete="off"
            />
            {icon ? <div
                className={` ${iconStyle}`}
                style={{ top: iconChanges === true ? "" : "9px" }}
                onClick={onClicked}
            >
                <div>{icon}</div>
            </div> : null}

        </div>
    );
}

export default Input;
