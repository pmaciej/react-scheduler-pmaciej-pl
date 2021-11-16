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
import { Avatar, ListItem, ListItemAvatar, ListItemText, Typography, } from "@mui/material";
import { useAppState } from "../../hooks/useAppState";
import { useWindowResize } from "../../hooks/useWindowResize";
var ResourceHeader = function (_a) {
    var resource = _a.resource;
    var _b = useAppState(), recourseHeaderComponent = _b.recourseHeaderComponent, resourceFields = _b.resourceFields, resources = _b.resources, direction = _b.direction;
    var width = useWindowResize().width;
    var text = resource[resourceFields.textField];
    var subtext = resource[resourceFields.subTextField || ""];
    var avatar = resource[resourceFields.avatarField || ""];
    var color = resource[resourceFields.colorField || ""];
    if (recourseHeaderComponent instanceof Function) {
        return recourseHeaderComponent(resource);
    }
    return (_jsxs(ListItem, __assign({ style: {
            padding: "2px 10px",
            textAlign: direction === "rtl" ? "right" : "left",
        } }, { children: [_jsx(ListItemAvatar, { children: _jsx(Avatar, { style: { background: color }, alt: text, src: avatar }, void 0) }, void 0), _jsx(ListItemText, { primary: _jsx(Typography, __assign({ variant: "body2", noWrap: true }, { children: text }), void 0), secondary: _jsx(Typography, __assign({ variant: "caption", color: "textSecondary", noWrap: true }, { children: subtext }), void 0), style: { width: width / (resources.length + 1) } }, void 0)] }), void 0));
};
export { ResourceHeader };
