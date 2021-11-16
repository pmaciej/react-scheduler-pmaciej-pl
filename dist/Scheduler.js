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
import { AppState } from "./context/state/State";
import { defaultProps } from "./context/state/stateContext";
import { SchedulerComponent } from "./SchedulerComponent";
var Scheduler = function (props) {
    return (_jsx(AppState, __assign({ initial: props }, { children: _jsx(SchedulerComponent, {}, void 0) }), void 0));
};
Scheduler.defaultProps = defaultProps;
export { Scheduler };
