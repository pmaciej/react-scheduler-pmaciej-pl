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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import PropTypes from "prop-types";
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
function TabPanel(props) {
    var children = props.children, value = props.value, index = props.index, other = __rest(props, ["children", "value", "index"]);
    return value === index ? _jsx(Box, __assign({}, other, { children: children }), void 0) : _jsx(_Fragment, {}, void 0);
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
function a11yProps(index) {
    return {
        id: "scrollable-auto-tab-" + index,
        "aria-controls": "scrollable-auto-tabpanel-" + index,
    };
}
var StyledTaps = styled("div")(function (_a) {
    var theme = _a.theme;
    return ({
        flexGrow: 1,
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        alignSelf: "center",
        "& .tabs": {
            borderBottom: "1px solid " + theme.palette.divider,
        },
        "& .primary": {
            background: theme.palette.primary.main,
        },
        "& .secondary": {
            background: theme.palette.secondary.main,
        },
        "& .error": {
            background: theme.palette.error.main,
        },
        "& .info": {
            background: theme.palette.info.dark,
        },
        "& .text_primary": {
            color: theme.palette.primary.main,
        },
        "& .text_secondary": {
            color: theme.palette.secondary.main,
        },
        "& .text_error": {
            color: theme.palette.error.main,
        },
        "& .text_info": {
            color: theme.palette.info.dark,
        },
    });
});
var ButtonTabs = function (_a) {
    var tabs = _a.tabs, variant = _a.variant, tab = _a.tab, setTab = _a.setTab, indicator = _a.indicator, style = _a.style;
    return (_jsxs(StyledTaps, __assign({ style: style }, { children: [_jsx(Tabs, __assign({ value: tab, variant: variant, scrollButtons: true, className: "tabs", classes: { indicator: indicator } }, { children: tabs.map(function (tab, i) { return (_jsx(Tab, __assign({ label: tab.label, 
                    // icon={tab.icon}
                    value: tab.id }, a11yProps(tab.id), { onClick: function () { return setTab(tab.id); }, onDragEnter: function () { return setTab(tab.id); } }), tab.id || i)); }) }), void 0), tabs.map(function (t, i) {
                return t.component && (_jsx(TabPanel, __assign({ value: tab, index: t.id }, { children: t.component }), i));
            })] }), void 0));
};
ButtonTabs.defaultProps = {
    variant: "scrollable",
    indicator: "primary",
};
export { ButtonTabs };
