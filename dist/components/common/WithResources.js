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
import { useTheme } from "@mui/material";
import { useAppState } from "../../hooks/useAppState";
import { useWindowResize } from "../../hooks/useWindowResize";
import { ResourceHeader } from "./ResourceHeader";
import { ButtonTabs } from "./Tabs";
import CSS from "../../assets/css/styles.module.css";
var WithResources = function (_a) {
    var span = _a.span, renderChildren = _a.renderChildren;
    var resourceViewMode = useAppState().resourceViewMode;
    if (resourceViewMode === "tabs") {
        return _jsx(ResourcesTabTables, { renderChildren: renderChildren }, void 0);
    }
    else {
        return _jsx(ResourcesTables, { renderChildren: renderChildren, span: span }, void 0);
    }
};
var ResourcesTables = function (_a) {
    var span = _a.span, renderChildren = _a.renderChildren;
    var _b = useAppState(), resources = _b.resources, resourceFields = _b.resourceFields, direction = _b.direction;
    var width = useWindowResize().width;
    var theme = useTheme();
    return (_jsx("tr", { children: resources.map(function (res, i) { return (_jsx("td", { children: _jsxs("table", __assign({ className: CSS.table + " " + CSS["table_" + direction], style: {
                    width: width < theme.breakpoints.values.sm ? width : "100%",
                } }, { children: [_jsx("tbody", __assign({ className: CSS.noborder }, { children: _jsx("tr", { children: _jsx("td", __assign({ colSpan: span }, { children: _jsx(ResourceHeader, { resource: res }, void 0) }), void 0) }, void 0) }), void 0), _jsx("tbody", { children: renderChildren(res) }, void 0)] }), void 0) }, res[resourceFields.idField] + "_" + i)); }) }, void 0));
};
var ResourcesTabTables = function (_a) {
    var renderChildren = _a.renderChildren;
    var _b = useAppState(), resources = _b.resources, resourceFields = _b.resourceFields, selectedResource = _b.selectedResource, handleState = _b.handleState;
    var tabs = resources.map(function (res) {
        return {
            id: res[resourceFields.idField],
            label: _jsx(ResourceHeader, { resource: res }, void 0),
            component: (_jsx("table", __assign({ className: CSS.table }, { children: _jsx("tbody", { children: renderChildren(res) }, void 0) }), void 0)),
        };
    });
    var setTab = function (tab) {
        handleState(tab, "selectedResource");
    };
    return (_jsx("tr", { children: _jsx("td", { children: _jsx(ButtonTabs, { tabs: tabs, tab: selectedResource || resources[0][resourceFields.idField], setTab: setTab, style: {
                    display: "grid",
                } }, void 0) }, void 0) }, void 0));
};
WithResources.defaultProps = {
    span: 1,
};
export { WithResources };
