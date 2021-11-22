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
import { Fragment, useState } from "react";
import { Button, useTheme, useMediaQuery, Popover, MenuList, MenuItem, IconButton, } from "@mui/material";
import { WeekDateBtn } from "./WeekDateBtn";
import { DayDateBtn } from "./DayDateBtn";
import { MonthDateBtn } from "./MonthDateBtn";
import { useAppState } from "../../hooks/useAppState";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CSS from "../../assets/css/styles.module.css";
var Navigation = function () {
    var _a = useAppState(), selectedDate = _a.selectedDate, view = _a.view, week = _a.week, handleState = _a.handleState, getViews = _a.getViews;
    var _b = useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var theme = useTheme();
    var isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
    var views = getViews();
    var polishViews = ["Miesiąc", "Tydzień", "Dzień"];
    console.log(views);
    var toggleMoreMenu = function (el) {
        setAnchorEl(el || null);
    };
    var renderDateSelector = function () {
        switch (view) {
            case "month":
                return (_jsx(MonthDateBtn, { selectedDate: selectedDate, onChange: handleState }, void 0));
            case "week":
                return (_jsx(WeekDateBtn, { selectedDate: selectedDate, onChange: handleState, weekProps: week }, void 0));
            case "day":
                return (_jsx(DayDateBtn, { selectedDate: selectedDate, onChange: handleState }, void 0));
            default:
                return "";
        }
    };
    return (_jsxs("div", __assign({ className: CSS.cal_nav }, { children: [renderDateSelector(), _jsxs("div", { children: [_jsx(Button, __assign({ size: "large", onClick: function () { return handleState(new Date(), "selectedDate"); } }, { children: "Dzisiaj" }), void 0), views.length > 1 &&
                        (isDesktop ? (views.map(function (v, index) { return (_jsx(Button, __assign({ size: "large", color: v === view ? "primary" : "inherit", onClick: function () { return handleState(v, "view"); }, onDragOver: function (e) {
                                e.preventDefault();
                                handleState(v, "view");
                            } }, { children: polishViews[index] }), v)); })) : (_jsxs(Fragment, { children: [_jsx(IconButton, __assign({ style: { padding: 5 }, onClick: function (e) {
                                        toggleMoreMenu(e.currentTarget);
                                    } }, { children: _jsx(MoreVertIcon, {}, void 0) }), void 0), _jsx(Popover, __assign({ open: Boolean(anchorEl), anchorEl: anchorEl, onClose: function (e) {
                                        toggleMoreMenu();
                                    }, anchorOrigin: {
                                        vertical: "center",
                                        horizontal: "center",
                                    }, transformOrigin: {
                                        vertical: "top",
                                        horizontal: "center",
                                    } }, { children: _jsx(MenuList, __assign({ autoFocusItem: !!anchorEl, disablePadding: true }, { children: views.map(function (v) { return (_jsx(MenuItem, __assign({ selected: v === view, onClick: function () {
                                                toggleMoreMenu();
                                                handleState(v, "view");
                                            } }, { children: v }), v)); }) }), void 0) }), void 0)] }, void 0)))] }, void 0)] }), void 0));
};
export { Navigation };
