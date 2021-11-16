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
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FormControl, FormHelperText, MenuItem, Checkbox, useTheme, Chip, Typography, CircularProgress, InputLabel, Select, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
var EditorSelect = function (_a) {
    var options = _a.options, value = _a.value, name = _a.name, required = _a.required, onChange = _a.onChange, label = _a.label, disabled = _a.disabled, touched = _a.touched, variant = _a.variant, loading = _a.loading, multiple = _a.multiple, placeholder = _a.placeholder, errMsg = _a.errMsg;
    var theme = useTheme();
    var _b = useState({
        touched: false,
        valid: !!value,
        errorMsg: errMsg ? errMsg : required ? "Required" : undefined,
    }), state = _b[0], setState = _b[1];
    useEffect(function () {
        if (touched) {
            handleChange(value);
        }
        // eslint-disable-next-line
    }, [touched]);
    var handleTouched = function () {
        if (!state.touched) {
            setState(function (prev) {
                return __assign(__assign({}, prev), { touched: true, errorMsg: errMsg || prev.errorMsg });
            });
        }
    };
    var handleChange = function (value) {
        var val = value;
        var isValid = true;
        var errorMsg = errMsg;
        if (required && (multiple ? !val.length : !val)) {
            isValid = false;
            errorMsg = "Required";
        }
        setState(function (prev) {
            return __assign(__assign({}, prev), { touched: true, valid: isValid, errorMsg: errorMsg });
        });
        onChange(name, val, isValid);
    };
    return (_jsxs(_Fragment, { children: [_jsxs(FormControl, __assign({ variant: variant || "outlined", fullWidth: true, error: required && state.touched && !state.valid, 
                // style={{ minWidth: 230 }}
                disabled: disabled }, { children: [label && (_jsx(InputLabel, __assign({ id: "input_" + name }, { children: _jsx(Typography, __assign({ variant: "body2" }, { children: label + " " + (required ? "*" : "") }), void 0) }), void 0)), _jsxs(Select, __assign({ label: label, labelId: "input_" + name, value: value, onBlur: handleTouched, onChange: function (e) { return handleChange(e.target.value); }, IconComponent: loading ? function () { return _jsx(CircularProgress, { size: 5 }, void 0); } : ExpandMoreIcon, multiple: !!multiple, classes: {
                            select: multiple === "chips" ? "flex__wrap" : undefined,
                        }, renderValue: function (selected) {
                            if (!selected || selected.length === 0) {
                                return _jsx("em", { children: label }, void 0);
                            }
                            var text = [];
                            if (multiple) {
                                for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
                                    var opt = options_1[_i];
                                    if (selected.includes(opt.value)) {
                                        text.push([opt.text]);
                                    }
                                }
                                if (multiple === "chips") {
                                    return text.map(function (t, i) { return (_jsx(Chip, { label: t, style: { margin: "0 2px" }, color: "primary" }, t + "_" + i)); });
                                }
                                else {
                                    return text.join(",");
                                }
                            }
                            else {
                                for (var _a = 0, options_2 = options; _a < options_2.length; _a++) {
                                    var opt = options_2[_a];
                                    if (selected === opt.value)
                                        text.push([opt.text]);
                                }
                                return text.join(",");
                            }
                        } }, { children: [placeholder && (_jsx(MenuItem, __assign({ value: "" }, { children: _jsx("em", { children: placeholder }, void 0) }), void 0)), options.map(function (op) { return (_jsxs(MenuItem, __assign({ value: op.value }, { children: [multiple && (_jsx(Checkbox, { checked: value.indexOf(op.value) > -1, color: "primary" }, void 0)), op.text] }), op.id || op.value)); })] }), void 0)] }), void 0), _jsx(FormHelperText, __assign({ style: { color: theme.palette.error.main } }, { children: state.touched && !state.valid && state.errorMsg }), void 0)] }, void 0));
};
EditorSelect.defaultProps = {
    variant: "outlined",
};
export { EditorSelect };
