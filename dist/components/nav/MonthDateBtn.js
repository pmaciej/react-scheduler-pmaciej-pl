import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { getMonth, setMonth } from "date-fns";
import { useAppState } from "../../hooks/useAppState";
var MonthDateBtn = function (_a) {
    var selectedDate = _a.selectedDate, onChange = _a.onChange;
    var locale = useAppState().locale;
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var currentMonth = getMonth(selectedDate);
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
    return (_jsx("div", {}, void 0));
};
export { MonthDateBtn };
