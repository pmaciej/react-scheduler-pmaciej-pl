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
import { Fragment } from "react";
import { Typography } from "@mui/material";
import { format, isToday } from "date-fns";
import CSS from "../../assets/css/styles.module.css";
var TodayTypo = function (_a) {
    var date = _a.date, onClick = _a.onClick;
    return (_jsxs(Fragment, { children: [_jsx(Typography, __assign({ style: {
                    fontWeight: isToday(date) ? "bold" : "inherit",
                }, color: isToday(date) ? "primary" : "inherit", className: onClick ? CSS.day_clickable : "", onClick: function (e) {
                    e.stopPropagation();
                    if (onClick)
                        onClick(date);
                } }, { children: format(date, "dd") }), void 0), _jsx(Typography, __assign({ color: isToday(date) ? "primary" : "inherit", style: {
                    fontWeight: isToday(date) ? "bold" : "inherit",
                    fontSize: 11,
                } }, { children: format(date, "eee") }), void 0)] }, void 0));
};
export default TodayTypo;
