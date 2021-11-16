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
import { useAppState } from "../../hooks/useAppState";
import NavigateBeforeRoundedIcon from "@mui/icons-material/NavigateBeforeRounded";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { IconButton } from "@mui/material";
var LocaleArrow = function (_a) {
    var type = _a.type, onClick = _a.onClick;
    var direction = useAppState().direction;
    var Arrow = NavigateNextRoundedIcon;
    if (type === "prev") {
        Arrow =
            direction === "rtl" ? NavigateNextRoundedIcon : NavigateBeforeRoundedIcon;
    }
    else if (type === "next") {
        Arrow =
            direction === "rtl" ? NavigateBeforeRoundedIcon : NavigateNextRoundedIcon;
    }
    return (_jsx(IconButton, __assign({ style: { padding: 2 }, onClick: onClick, onDragOver: function (e) {
            e.preventDefault();
            if (onClick) {
                onClick();
            }
        } }, { children: _jsx(Arrow, {}, void 0) }), void 0));
};
export { LocaleArrow };
