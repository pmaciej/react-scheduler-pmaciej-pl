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
import { alpha, useTheme } from "@mui/material";
import CSS from "../../assets/css/styles.module.css";
import { useAppState } from "../../hooks/useAppState";
var Cell = function (_a) {
    var height = _a.height, start = _a.start, end = _a.end, resourceKey = _a.resourceKey, resourceVal = _a.resourceVal, children = _a.children;
    var _b = useAppState(), triggerDialog = _b.triggerDialog, onDrop = _b.onDrop;
    var theme = useTheme();
    return (_jsx("div", __assign({ className: CSS.c_cell, style: { height: height, width: "100%" }, onClick: function () {
            var _a;
            triggerDialog(true, (_a = {
                    start: start,
                    end: end
                },
                _a[resourceKey] = resourceVal,
                _a));
        }, onDragOver: function (e) {
            e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3);
            e.preventDefault();
        }, onDragEnter: function (e) {
            e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3);
        }, onDragLeave: function (e) {
            e.currentTarget.style.backgroundColor = "";
        }, onDrop: function (e) {
            e.currentTarget.style.backgroundColor = "";
            var eventId = e.dataTransfer.getData("text");
            onDrop(eventId, start, resourceKey, resourceVal);
        } }, { children: children }), void 0));
};
export { Cell };
