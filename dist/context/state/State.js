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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useReducer } from "react";
import { arraytizeFieldVal, getAvailableViews, getOneView, } from "../../helpers/generals";
import { differenceInMinutes, addMinutes, isEqual } from "date-fns";
import { defaultProps, StateContext, } from "./stateContext";
import { stateReducer } from "./stateReducer";
var initialState = function (initial) {
    var initialView = initial.view && initial[initial.view] ? initial.view : getOneView(initial);
    return __assign(__assign({}, initial), { view: initialView, dialog: false, mounted: false, selectedRange: undefined, fields: __spreadArray(__spreadArray([], defaultProps.fields, true), (initial.fields || []), true) });
};
var AppState = function (_a) {
    var initial = _a.initial, children = _a.children;
    var events = initial.events, resources = initial.resources, resourceViewMode = initial.resourceViewMode, month = initial.month, week = initial.week, day = initial.day, fields = initial.fields, locale = initial.locale, direction = initial.direction, loading = initial.loading, onEventDrop = initial.onEventDrop;
    var _b = useReducer(stateReducer, initialState(initial)), state = _b[0], dispatch = _b[1];
    var handleState = function (value, name) {
        dispatch({ type: "set", payload: { name: name, value: value } });
    };
    var updateProps = function (updatedProps) {
        dispatch({ type: "updateProps", payload: updatedProps });
    };
    useEffect(function () {
        if (state.mounted) {
            updateProps({
                events: events,
                resources: resources,
                resourceViewMode: resourceViewMode,
                month: month,
                week: week,
                day: day,
                fields: fields,
                locale: locale,
                direction: direction,
                loading: loading,
            });
        }
        else {
            handleState(true, "mounted");
        }
        //eslint-disable-next-line
    }, [
        events,
        resources,
        resourceViewMode,
        month,
        week,
        day,
        fields,
        locale,
        direction,
        loading,
    ]);
    var confirmEvent = function (event, action) {
        var updatedEvents;
        if (action === "edit") {
            updatedEvents = state.events.map(function (e) {
                return e.event_id === event.event_id ? event : e;
            });
        }
        else {
            updatedEvents = __spreadArray(__spreadArray([], state.events, true), [event], false);
        }
        handleState(updatedEvents, "events");
    };
    var getViews = function () { return getAvailableViews(state); };
    var triggerDialog = function (status, selected) {
        dispatch({ type: "triggerDialog", payload: { status: status, selected: selected } });
    };
    var triggerLoading = function (status) {
        // Trigger if not out-sourced by props
        if (typeof loading === "undefined") {
            dispatch({ type: "triggerLoading", payload: status });
        }
    };
    var handleGotoDay = function (day) {
        var views = getViews();
        if (views.includes("day")) {
            handleState("day", "view");
            handleState(day, "selectedDate");
        }
        else if (views.includes("week")) {
            handleState("week", "view");
            handleState(day, "selectedDate");
        }
        else {
            console.warn("No Day/Week views available");
        }
    };
    var onDrop = function (eventId, startTime, resKey, resVal) { return __awaiter(void 0, void 0, void 0, function () {
        var droppedEvent, resField, isMultiple, newResource, eResource, currentRes, diff, updatedEvent, _event;
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    droppedEvent = state.events.find(function (e) {
                        if (typeof e.event_id === "number") {
                            return e.event_id === +eventId;
                        }
                        return e.event_id === eventId;
                    });
                    resField = state.fields.find(function (f) { return f.name === resKey; });
                    isMultiple = !!((_b = resField === null || resField === void 0 ? void 0 : resField.config) === null || _b === void 0 ? void 0 : _b.multiple);
                    newResource = resVal;
                    if (resField) {
                        eResource = droppedEvent[resKey];
                        currentRes = arraytizeFieldVal(resField, eResource, droppedEvent).value;
                        if (isMultiple) {
                            // if dropped on already owned resource
                            if (currentRes.includes(resVal)) {
                                // Omit if dropped on same time slot for multiple event
                                if (isEqual(droppedEvent.start, startTime)) {
                                    return [2 /*return*/];
                                }
                                newResource = currentRes;
                            }
                            else {
                                // if have multiple resource ? add other : move to other
                                newResource =
                                    currentRes.length > 1 ? __spreadArray(__spreadArray([], currentRes, true), [resVal], false) : [resVal];
                            }
                        }
                    }
                    // Omit if dropped on same time slot for non multiple events
                    if (isEqual(droppedEvent.start, startTime)) {
                        if (!newResource ||
                            (!isMultiple && newResource === droppedEvent[resKey])) {
                            return [2 /*return*/];
                        }
                    }
                    diff = differenceInMinutes(droppedEvent.end, droppedEvent.start);
                    updatedEvent = __assign(__assign({}, droppedEvent), (_a = { start: startTime, end: addMinutes(startTime, diff) }, _a[resKey] = newResource || "", _a));
                    // Local
                    if (!onEventDrop || typeof onEventDrop !== "function") {
                        return [2 /*return*/, confirmEvent(updatedEvent, "edit")];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, , 3, 4]);
                    triggerLoading(true);
                    return [4 /*yield*/, onEventDrop(startTime, updatedEvent, droppedEvent)];
                case 2:
                    _event = _c.sent();
                    if (_event) {
                        confirmEvent(_event, "edit");
                    }
                    return [3 /*break*/, 4];
                case 3:
                    triggerLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (_jsx(StateContext.Provider, __assign({ value: __assign(__assign({}, state), { handleState: handleState, getViews: getViews, triggerDialog: triggerDialog, triggerLoading: triggerLoading, handleGotoDay: handleGotoDay, confirmEvent: confirmEvent, onDrop: onDrop }) }, { children: children }), void 0));
};
export { AppState };
