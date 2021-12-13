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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useCallback, Fragment } from "react";
import { Typography } from "@mui/material";
import { format, eachMinuteOfInterval, isSameDay, differenceInDays, isToday, isWithinInterval, setHours, setMinutes, isBefore, isAfter, startOfDay, endOfDay, addDays, addMinutes, } from "date-fns";
import TodayTypo from "../components/common/TodayTypo";
import EventItem from "../components/events/EventItem";
import { useAppState } from "../hooks/useAppState";
import { calcCellHeight, calcMinuteHeight, getResourcedEvents, } from "../helpers/generals";
import { WithResources } from "../components/common/WithResources";
import CSS from "../assets/css/styles.module.css";
import { Cell } from "../components/common/Cell";
import TodayEvents from "../components/events/TodayEvents";
var Day = function () {
    var _a = useAppState(), day = _a.day, selectedDate = _a.selectedDate, events = _a.events, height = _a.height, triggerDialog = _a.triggerDialog, remoteEvents = _a.remoteEvents, triggerLoading = _a.triggerLoading, handleState = _a.handleState, resources = _a.resources, resourceFields = _a.resourceFields, fields = _a.fields, direction = _a.direction, locale = _a.locale;
    var _b = day, startHour = _b.startHour, endHour = _b.endHour, step = _b.step, cellRenderer = _b.cellRenderer;
    var START_TIME = setMinutes(setHours(selectedDate, startHour), 0);
    var END_TIME = setMinutes(setHours(selectedDate, endHour), 0);
    var hours = eachMinuteOfInterval({
        start: START_TIME,
        end: END_TIME,
    }, { step: step });
    var CELL_HEIGHT = calcCellHeight(height, hours.length);
    var MINUTE_HEIGHT = calcMinuteHeight(CELL_HEIGHT, step);
    var todayEvents = events.sort(function (b, a) { return a.end.getTime() - b.end.getTime(); });
    var fetchEvents = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var start, end, query, events_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    triggerLoading(true);
                    start = addDays(START_TIME, -1);
                    end = addDays(END_TIME, 1);
                    query = "?start=" + start + "&end=" + end;
                    return [4 /*yield*/, remoteEvents(query)];
                case 1:
                    events_1 = _a.sent();
                    if (events_1 && (events_1 === null || events_1 === void 0 ? void 0 : events_1.length)) {
                        handleState(events_1, "events");
                    }
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _a.sent();
                    throw error_1;
                case 3:
                    triggerLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [selectedDate]);
    useEffect(function () {
        if (remoteEvents instanceof Function) {
            fetchEvents();
        }
        // eslint-disable-next-line
    }, [fetchEvents]);
    var renderMultiDayEvents = function (events) {
        var SPACE = 28;
        var multiDays = events.filter(function (e) {
            return differenceInDays(e.end, e.start) > 0 &&
                isWithinInterval(selectedDate, {
                    start: startOfDay(e.start),
                    end: endOfDay(e.end),
                });
        });
        return (_jsx("div", __assign({ className: CSS.events_col, style: { height: SPACE * multiDays.length } }, { children: multiDays.map(function (event, i) {
                var hasPrev = isBefore(event.start, startOfDay(selectedDate));
                var hasNext = isAfter(event.end, endOfDay(selectedDate));
                return (_jsx("div", __assign({ className: CSS.allday_event + " " + CSS.event__item, style: {
                        top: i * SPACE,
                        width: "100%",
                    } }, { children: _jsx(EventItem, { event: event, multiday: true, hasPrev: hasPrev, hasNext: hasNext }, void 0) }), event.event_id));
            }) }), void 0));
    };
    var renderTable = function (resource) {
        var recousedEvents = todayEvents;
        if (resource) {
            recousedEvents = getResourcedEvents(todayEvents, resource, resourceFields, fields);
        }
        return (_jsxs(Fragment, { children: [_jsxs("tr", { children: [_jsx("td", { className: CSS.day_indent + " " + CSS.borderd }, void 0), _jsx("td", __assign({ className: CSS.borderd }, { children: _jsx("table", __assign({ className: CSS.table + " " + CSS.week_day_table }, { children: _jsx("tbody", { children: _jsx("tr", { children: _jsxs("td", __assign({ className: isToday(selectedDate) ? CSS.today_cell : "", style: { border: 0 } }, { children: [_jsx(TodayTypo, { date: selectedDate }, void 0), renderMultiDayEvents(recousedEvents)] }), void 0) }, void 0) }, void 0) }), void 0) }), void 0)] }, void 0), _jsxs("tr", { children: [_jsx("td", __assign({ className: CSS.borderd }, { children: _jsxs("table", __assign({ className: CSS.table + " " + CSS.hour_table }, { children: [_jsx("thead", { children: _jsx("tr", { children: _jsx("td", {}, void 0) }, void 0) }, void 0), _jsx("tbody", { children: hours.map(function (h, i) { return (_jsx("tr", { children: _jsx("td", { children: _jsx("div", __assign({ style: { height: CELL_HEIGHT } }, { children: _jsx(Typography, __assign({ variant: "caption" }, { children: format(h, "HH:mm", { locale: locale }) }), void 0) }), void 0) }, void 0) }, i)); }) }, void 0)] }), void 0) }), void 0), _jsx("td", __assign({ className: CSS.borderd }, { children: _jsxs("table", __assign({ className: CSS.table + " " + CSS.cells_table + " " + CSS["cells_table_" + direction] }, { children: [_jsx("thead", { children: _jsx("tr", { children: _jsx("td", { children: _jsx(TodayEvents, { todayEvents: recousedEvents.filter(function (e) {
                                                        return !differenceInDays(e.end, e.start) &&
                                                            isSameDay(selectedDate, e.start);
                                                    }), today: selectedDate, minuteHeight: MINUTE_HEIGHT, cellHeight: CELL_HEIGHT, startHour: startHour, step: step, direction: direction }, void 0) }, void 0) }, void 0) }, void 0), _jsx("tbody", { children: hours.map(function (h, i) {
                                            var _a;
                                            var start = new Date(format(selectedDate, "yyyy MM dd") + " " + format(h, "hh:mm a"));
                                            var end = new Date(format(selectedDate, "yyyy MM dd") + " " + format(addMinutes(h, step), "hh:mm a"));
                                            var field = resourceFields.idField;
                                            return (_jsx("tr", { children: _jsx("td", __assign({ className: isToday(selectedDate) ? CSS.today_cell : "" }, { children: cellRenderer ? (cellRenderer((_a = {
                                                            day: selectedDate,
                                                            start: start,
                                                            end: end,
                                                            height: CELL_HEIGHT,
                                                            onClick: function () {
                                                                var _a;
                                                                return triggerDialog(true, (_a = {
                                                                        start: start,
                                                                        end: end
                                                                    },
                                                                    _a[field] = resource ? resource[field] : null,
                                                                    _a));
                                                            }
                                                        },
                                                        _a[field] = resource ? resource[field] : null,
                                                        _a))) : (_jsx(Cell, { height: CELL_HEIGHT, start: start, end: end, resourceKey: field, resourceVal: resource ? resource[field] : null }, void 0)) }), void 0) }, i));
                                        }) }, void 0)] }), void 0) }), void 0)] }, void 0)] }, void 0));
    };
    return (_jsx("tbody", __assign({ className: CSS.borderd }, { children: resources.length ? (_jsx(WithResources, { span: 2, renderChildren: renderTable }, void 0)) : (renderTable()) }), void 0));
};
export { Day };
