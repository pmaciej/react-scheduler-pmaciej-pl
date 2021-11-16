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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import DateProvider from "../hoc/DateProvider";
import DatePicker from "@mui/lab/DatePicker";
import { Button } from "@mui/material";
import { format, getMonth, setMonth } from "date-fns";
import { LocaleArrow } from "../common/LocaleArrow";
import { useAppState } from "../../hooks/useAppState";
var MonthDateBtn = function (_a) {
    var selectedDate = _a.selectedDate, onChange = _a.onChange;
    var locale = useAppState().locale;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var currentMonth = getMonth(selectedDate);
    var month = selectedDate.toLocaleString('default', { month: 'long' });
    var toggleDialog = function () { return setOpen(!open); };
    var handleChange = function (e, k) {
        onChange(e || new Date(), "selectedDate");
    };
    var handlePrev = function () {
        var prevMonth = currentMonth - 1;
        onChange(setMonth(selectedDate, prevMonth), "selectedDate");
    };
    var handleNext = function () {
        var nextMonth = currentMonth + 1;
        onChange(setMonth(selectedDate, nextMonth), "selectedDate");
    };
    return (_jsxs("div", { children: [_jsx(LocaleArrow, { type: "prev", onClick: handlePrev }, void 0), _jsx(DateProvider, { children: _jsx(DatePicker, { open: open, onClose: toggleDialog, openTo: "month", views: ["year", "month"], value: selectedDate, onChange: handleChange, renderInput: function (params) { return (_jsx(Button, __assign({ ref: params.inputRef, style: { padding: 4 }, onClick: toggleDialog }, { children: month + " " + format(selectedDate, "yyyy", { locale: locale }) }), void 0)); } }, void 0) }, void 0), _jsx(LocaleArrow, { type: "next", onClick: handleNext }, void 0)] }, void 0));
};
export { MonthDateBtn };
