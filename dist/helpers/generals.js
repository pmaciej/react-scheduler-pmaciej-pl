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
import { addMinutes, isWithinInterval } from "date-fns";
export var getOneView = function (state) {
    if (state.month) {
        return "month";
    }
    else if (state.week) {
        return "week";
    }
    else if (state.day) {
        return "day";
    }
    throw new Error("No views were selected");
};
export var getAvailableViews = function (state) {
    var views = [];
    if (state.month) {
        views.push("month");
    }
    if (state.week) {
        views.push("week");
    }
    if (state.day) {
        views.push("day");
    }
    return views;
};
export var arraytizeFieldVal = function (field, val, event) {
    var _a;
    var arrytize = ((_a = field.config) === null || _a === void 0 ? void 0 : _a.multiple) &&
        !Array.isArray((event === null || event === void 0 ? void 0 : event[field.name]) || field.default);
    var value = arrytize ? (val ? [val] : []) : val;
    var validity = arrytize ? value.length : value;
    return { value: value, validity: validity };
};
export var getResourcedEvents = function (events, resource, resourceFields, fields) {
    var _a;
    var keyName = resourceFields.idField;
    var resourceField = fields.find(function (f) { return f.name === keyName; });
    var isMultiple = !!((_a = resourceField === null || resourceField === void 0 ? void 0 : resourceField.config) === null || _a === void 0 ? void 0 : _a.multiple);
    var recousedEvents = [];
    for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
        var event_1 = events_1[_i];
        // Handle single select & multiple select accordingly
        var arrytize = isMultiple && !Array.isArray(event_1[keyName]);
        var eventVal = arrytize ? [event_1[keyName]] : event_1[keyName];
        var isThisResource = isMultiple
            ? eventVal.includes(resource[keyName])
            : eventVal === resource[keyName];
        if (isThisResource) {
            recousedEvents.push(__assign(__assign({}, event_1), { color: event_1.color || resource[resourceFields.colorField || ""] }));
        }
    }
    return recousedEvents;
};
export var traversCrossingEvents = function (todayEvents, event) {
    return todayEvents.filter(function (e) {
        return e.event_id !== event.event_id &&
            (isWithinInterval(addMinutes(event.start, 1), {
                start: e.start,
                end: e.end,
            }) ||
                isWithinInterval(addMinutes(event.end, -1), {
                    start: e.start,
                    end: e.end,
                }) ||
                isWithinInterval(addMinutes(e.start, 1), {
                    start: event.start,
                    end: event.end,
                }) ||
                isWithinInterval(addMinutes(e.end, -1), {
                    start: event.start,
                    end: event.end,
                }));
    });
};
export var calcMinuteHeight = function (cellHeight, step) {
    return Math.ceil(cellHeight) / step;
};
export var calcCellHeight = function (tableHeight, hoursLength) {
    return Math.max(tableHeight / hoursLength, 60);
};
