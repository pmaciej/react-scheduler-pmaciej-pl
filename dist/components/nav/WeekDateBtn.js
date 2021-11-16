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
import { endOfWeek, format, startOfWeek, addDays } from "date-fns";
import { LocaleArrow } from "../common/LocaleArrow";
import { useAppState } from "../../hooks/useAppState";
var WeekDateBtn = function (_a) {
    var selectedDate = _a.selectedDate, onChange = _a.onChange, weekProps = _a.weekProps;
    var locale = useAppState().locale;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var weekStartOn = weekProps.weekStartOn;
    var weekStart = startOfWeek(selectedDate, { weekStartsOn: weekStartOn });
    var weekEnd = endOfWeek(selectedDate, { weekStartsOn: weekStartOn });
    var toggleDialog = function () { return setOpen(!open); };
    var handleChange = function (e, k) {
        onChange(e || new Date(), "selectedDate");
    };
    var handlePrev = function () {
        var ladtDayPrevWeek = addDays(weekStart, -1);
        onChange(ladtDayPrevWeek, "selectedDate");
    };
    var handleNext = function () {
        var firstDayNextWeek = addDays(weekEnd, 1);
        onChange(firstDayNextWeek, "selectedDate");
    };
    return (_jsxs("div", { children: [_jsx(LocaleArrow, { type: "prev", onClick: handlePrev }, void 0), _jsx(DateProvider, { children: _jsx(DatePicker, { open: open, onClose: toggleDialog, openTo: "day", views: ["month", "day"], value: selectedDate, onChange: handleChange, renderInput: function (params) { return (_jsx(Button, __assign({ ref: params.inputRef, style: { padding: 4 }, onClick: toggleDialog }, { children: format(weekStart, "dd", { locale: locale }) + " - " + format(weekEnd, "dd MMMM yyyy", {
                            locale: locale,
                        }) }), void 0)); } }, void 0) }, void 0), _jsx(LocaleArrow, { type: "next", onClick: handleNext }, void 0)] }, void 0));
};
export { WeekDateBtn };
