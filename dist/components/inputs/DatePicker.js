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
import DateProvider from "../hoc/DateProvider";
import DatePicker from "@mui/lab/DatePicker";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { TextField } from "@mui/material";
var EditorDatePicker = function (_a) {
    var type = _a.type, value = _a.value, label = _a.label, name = _a.name, onChange = _a.onChange, variant = _a.variant, modalVariant = _a.modalVariant, error = _a.error, errMsg = _a.errMsg;
    var Picker = type === "date" ? DatePicker : DateTimePicker;
    return (_jsx(DateProvider, { children: _jsx(Picker, { value: value, label: label, onChange: function (e) { return onChange(name, new Date(e || "")); }, 
            // variant={modalVariant}
            minutesStep: 5, renderInput: function (params) { return (_jsx(TextField, __assign({ variant: variant, helperText: error ? errMsg : "", error: error, style: { width: "100%" } }, params), void 0)); } }, void 0) }, void 0));
};
EditorDatePicker.defaultProps = {
    type: "datetime",
    variant: "outlined",
    modalVariant: "inline",
};
export { EditorDatePicker };
