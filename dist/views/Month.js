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
import { Avatar, Typography, useTheme } from "@mui/material";
import { addDays, eachWeekOfInterval, format, isSameMonth, isToday, setHours, endOfMonth, startOfMonth, } from "date-fns";
import MonthEvents from "../components/events/MonthEvents";
import { useAppState } from "../hooks/useAppState";
import { getResourcedEvents } from "../helpers/generals";
import { WithResources } from "../components/common/WithResources";
import CSS from "../assets/css/styles.module.css";
import { Cell } from "../components/common/Cell";
var Month = function () {
    var _a = useAppState(), month = _a.month, selectedDate = _a.selectedDate, height = _a.height, events = _a.events, handleGotoDay = _a.handleGotoDay, remoteEvents = _a.remoteEvents, triggerLoading = _a.triggerLoading, handleState = _a.handleState, resources = _a.resources, resourceFields = _a.resourceFields, fields = _a.fields, direction = _a.direction;
    var locale = useAppState().locale;
    var _b = month, weekStartOn = _b.weekStartOn, weekDays = _b.weekDays, startHour = _b.startHour, endHour = _b.endHour;
    var monthStart = startOfMonth(selectedDate);
    var monthEnd = endOfMonth(selectedDate);
    var eachWeekStart = eachWeekOfInterval({
        start: monthStart,
        end: monthEnd,
    }, { weekStartsOn: weekStartOn });
    var daysList = weekDays.map(function (d) { return addDays(eachWeekStart[0], d); });
    var CELL_HEIGHT = height / eachWeekStart.length;
    var theme = useTheme();
    var fetchEvents = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var start, end, query, events_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, 3, 4]);
                    triggerLoading(true);
                    start = eachWeekStart[0];
                    end = addDays(eachWeekStart[eachWeekStart.length - 1], daysList.length);
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
    var renderDays = function () {
        return daysList.map(function (date, i) { return (_jsx("td", __assign({ align: "center" }, { children: _jsx("div", { children: format(date, "EE", { locale: locale }) }, void 0) }), i)); });
    };
    var renderCells = function (resource) {
        var recousedEvents = events;
        if (resource) {
            recousedEvents = getResourcedEvents(events, resource, resourceFields, fields);
        }
        var rows = [];
        var _loop_1 = function (startDay) {
            var cells = weekDays.map(function (d) {
                var today = addDays(startDay, d);
                var start = new Date("" + format(setHours(today, startHour), "yyyy MM dd hh:mm a"));
                var end = new Date("" + format(setHours(today, endHour), "yyyy MM dd hh:mm a"));
                var field = resourceFields.idField;
                return (_jsx("td", { children: _jsx(Cell, __assign({ height: CELL_HEIGHT, start: start, end: end, resourceKey: field, resourceVal: resource ? resource[field] : null }, { children: _jsxs(Fragment, { children: [_jsx(Avatar, __assign({ style: {
                                        width: 27,
                                        height: 27,
                                        background: isToday(today)
                                            ? theme.palette.secondary.main
                                            : "transparent",
                                        color: isToday(today)
                                            ? theme.palette.secondary.contrastText
                                            : "",
                                        marginBottom: 2,
                                    } }, { children: _jsx(Typography, __assign({ color: !isSameMonth(today, monthStart)
                                            ? "textSecondary"
                                            : "textPrimary", className: CSS.day_clickable, onClick: function (e) {
                                            e.stopPropagation();
                                            handleGotoDay(today);
                                        } }, { children: format(today, "dd") }), void 0) }), void 0), _jsx("div", __assign({ className: CSS.events_col }, { children: _jsx(MonthEvents, { events: recousedEvents, today: today, eachWeekStart: eachWeekStart, daysList: daysList, onViewMore: handleGotoDay }, void 0) }), void 0)] }, void 0) }), void 0) }, d.toString()));
            });
            rows.push(_jsx("tr", { children: cells }, startDay.toString()));
        };
        for (var _i = 0, eachWeekStart_1 = eachWeekStart; _i < eachWeekStart_1.length; _i++) {
            var startDay = eachWeekStart_1[_i];
            _loop_1(startDay);
        }
        return rows;
    };
    var renderTable = function (resource) {
        return (_jsxs(Fragment, { children: [_jsx("tr", { children: _jsx("td", { children: _jsx("table", __assign({ className: CSS.table + " " + CSS.month_day_table + " " + CSS["month_day_table_" + direction] }, { children: _jsx("tbody", { children: _jsx("tr", { children: renderDays() }, void 0) }, void 0) }), void 0) }, void 0) }, void 0), _jsx("tr", { children: _jsx("td", { children: _jsx("table", __assign({ className: CSS.table + " " + CSS.month_cells + " " + CSS["month_cells_" + direction] }, { children: _jsx("tbody", { children: renderCells(resource) }, void 0) }), void 0) }, void 0) }, void 0)] }, void 0));
    };
    return (_jsx(Fragment, { children: _jsx("tbody", __assign({ className: CSS.borderd }, { children: resources.length ? (_jsx(WithResources, { renderChildren: renderTable }, void 0)) : (renderTable()) }), void 0) }, void 0));
};
export { Month };
