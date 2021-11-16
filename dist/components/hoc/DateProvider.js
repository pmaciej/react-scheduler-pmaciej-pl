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
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useAppState } from "../../hooks/useAppState";
var DateProvider = function (_a) {
    var children = _a.children;
    var locale = useAppState().locale;
    return (_jsx(LocalizationProvider, __assign({ dateAdapter: AdapterDateFns, locale: locale }, { children: children }), void 0));
};
export default DateProvider;
