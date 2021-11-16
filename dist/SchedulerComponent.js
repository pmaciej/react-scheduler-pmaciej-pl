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
import { Week } from "./views/Week";
import { Navigation } from "./components/nav/Navigation";
import { useAppState } from "./hooks/useAppState";
import Editor from "./views/Editor";
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import { Month } from "./views/Month";
import { Day } from "./views/Day";
import CSS from "./assets/css/styles.module.css";
var SchedulerComponent = function () {
    var _a = useAppState(), loading = _a.loading, view = _a.view, dialog = _a.dialog, direction = _a.direction;
    var renderViews = function () {
        switch (view) {
            case "month":
                return _jsx(Month, {}, void 0);
            case "week":
                return _jsx(Week, {}, void 0);
            case "day":
                return _jsx(Day, {}, void 0);
            default:
                return "";
        }
    };
    return (_jsxs("div", __assign({ style: { position: "relative", overflow: "hidden" } }, { children: [loading && (_jsx("div", __assign({ className: CSS.table_loading }, { children: _jsxs("div", __assign({ className: CSS.progress_loading }, { children: [_jsx(CircularProgress, { size: 50 }, void 0), _jsx(Typography, __assign({ align: "center" }, { children: "Loading..." }), void 0)] }), void 0) }), void 0)), _jsx(Navigation, {}, void 0), _jsx("div", __assign({ className: CSS.outerTable }, { children: _jsx("table", __assign({ className: CSS.table + " " + CSS["table_" + direction] }, { children: renderViews() }), void 0) }), void 0), dialog && _jsx(Editor, {}, void 0)] }), void 0));
};
export { SchedulerComponent };
