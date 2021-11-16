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
import pl from "date-fns/locale/pl";
import { createContext } from "react";
export var defaultProps = {
    height: 600,
    month: {
        weekDays: [0, 1, 2, 3, 4, 5],
        weekStartOn: 6,
        startHour: 9,
        endHour: 17,
    },
    week: {
        weekDays: [0, 1, 2, 3, 4, 5],
        weekStartOn: 6,
        startHour: 9,
        endHour: 17,
        step: 60,
    },
    day: {
        startHour: 9,
        endHour: 17,
        step: 60,
    },
    view: "week",
    selectedDate: new Date(),
    events: [],
    remoteEvents: undefined,
    fields: [],
    loading: undefined,
    customEditor: undefined,
    onConfirm: undefined,
    onDelete: undefined,
    viewerExtraComponent: undefined,
    resources: [],
    resourceFields: {
        idField: "assignee",
        textField: "text",
        subTextField: "subtext",
        avatarField: "avatar",
        colorField: "color",
    },
    recourseHeaderComponent: undefined,
    resourceViewMode: "default",
    direction: "ltr",
    dialogMaxWidth: "md",
    locale: pl,
};
var StateContext = createContext(__assign(__assign({}, defaultProps), { mounted: false, dialog: false, selectedRange: undefined, selectedEvent: undefined, selectedResource: undefined, handleState: function () { }, getViews: function () { return []; }, triggerDialog: function () { }, triggerLoading: function () { }, handleGotoDay: function () { }, confirmEvent: function () { }, onDrop: function () { } }));
export { StateContext };
