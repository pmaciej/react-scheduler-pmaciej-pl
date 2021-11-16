var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { TextField, Typography } from "@mui/material";
var EditorInput = function (_a) {
    var variant = _a.variant, label = _a.label, placeholder = _a.placeholder, value = _a.value, name = _a.name, required = _a.required, min = _a.min, max = _a.max, email = _a.email, decimal = _a.decimal, onChange = _a.onChange, disabled = _a.disabled, multiline = _a.multiline, rows = _a.rows, touched = _a.touched;
    var _b = useState({
        touched: false,
        valid: false,
        errorMsg: "",
    }), state = _b[0], setState = _b[1];
    useEffect(function () {
        if (touched) {
            handleChange(value);
        }
        // eslint-disable-next-line
    }, [touched]);
    var handleChange = function (value) {
        var val = value;
        var isValid = true;
        var errorMsg = "";
        if (email) {
            var reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = reg.test(val) && isValid;
            errorMsg = "Invalid Email";
        }
        if (decimal) {
            var reg = /^[0-9]+(\.[0-9]*)?$/;
            isValid = reg.test(val) && isValid;
            errorMsg = "Only Numbers Allowed";
        }
        if (min && ("" + val).trim().length < min) {
            isValid = false;
            errorMsg = "Minimum " + min + " letters";
        }
        if (max && ("" + val).trim().length > max) {
            isValid = false;
            errorMsg = "Maximum " + max + " letters";
        }
        if (required && ("" + val).trim().length <= 0) {
            isValid = false;
            errorMsg = "Required";
        }
        setState({ touched: true, valid: isValid, errorMsg: errorMsg });
        onChange(name, val, isValid);
    };
    return (_jsx(TextField, { variant: variant, label: label && (_jsx(Typography, __assign({ variant: "body2" }, { children: label + " " + (required ? "*" : "") }), void 0)), value: value, name: name, onChange: function (e) { return handleChange(e.target.value); }, disabled: disabled, error: state.touched && !state.valid, helperText: state.touched && !state.valid && state.errorMsg, multiline: multiline, rows: rows, style: { width: "100%" }, InputProps: {
            placeholder: placeholder || "",
        } }, void 0));
};
EditorInput.defaultProps = {
    variant: "outlined",
};
export { EditorInput };
