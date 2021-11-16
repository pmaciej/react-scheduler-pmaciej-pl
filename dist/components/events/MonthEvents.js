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
import { Fragment } from "react";
import { closestTo, differenceInDays, isBefore, startOfDay, endOfDay, isAfter, isSameDay, isWithinInterval, startOfWeek, } from "date-fns";
import { Typography } from "@mui/material";
import EventItem from "./EventItem";
import CSS from "../../assets/css/styles.module.css";
var LIMIT = 3;
var SPACE = 25;
var MonthEvents = function (_a) {
    var events = _a.events, today = _a.today, eachWeekStart = _a.eachWeekStart, daysList = _a.daysList, onViewMore = _a.onViewMore;
    var eachFirstDayInCalcRow = eachWeekStart.some(function (date) {
        return isSameDay(date, today);
    })
        ? today
        : null;
    var todayEvents = events
        .filter(function (e) {
        return eachFirstDayInCalcRow &&
            isWithinInterval(eachFirstDayInCalcRow, {
                start: startOfDay(e.start),
                end: endOfDay(e.end),
            })
            ? true
            : isSameDay(e.start, today);
    })
        .sort(function (a, b) { return b.end.getTime() - a.end.getTime(); });
    return (_jsx(Fragment, { children: todayEvents.map(function (event, i) {
            var fromPrevWeek = !!eachFirstDayInCalcRow &&
                isBefore(event.start, eachFirstDayInCalcRow);
            var start = fromPrevWeek && eachFirstDayInCalcRow
                ? eachFirstDayInCalcRow
                : event.start;
            var eventLength = differenceInDays(event.end, start) + 1;
            var toNextWeek = eventLength >= daysList.length;
            if (toNextWeek) {
                var NotAccurateWeekStart = startOfWeek(event.start);
                var closestStart = closestTo(NotAccurateWeekStart, eachWeekStart);
                eventLength =
                    daysList.length -
                        (!eachFirstDayInCalcRow
                            ? differenceInDays(event.start, closestStart)
                            : 0);
            }
            var prevNextEvents = events.filter(function (e) {
                return (!eachFirstDayInCalcRow &&
                    e.event_id !== event.event_id &&
                    isBefore(e.start, startOfDay(today)) &&
                    isAfter(e.end, startOfDay(today)));
            });
            var index = i;
            if (prevNextEvents.length) {
                index += prevNextEvents.length;
                // if (index > LIMIT) {
                //   index = LIMIT;
                // }
            }
            return index > LIMIT ? ("") : index === LIMIT ? (_jsx(Typography, __assign({ className: CSS.event__item + " " + CSS.day_clickable, style: { top: index * SPACE, fontSize: 11 }, onClick: function (e) {
                    e.stopPropagation();
                    onViewMore(event.start);
                } }, { children: Math.abs(todayEvents.length - i) + " More..." }), i)) : (_jsx("div", __assign({ className: CSS.event__item, style: {
                    top: index * SPACE,
                    width: 100 * eventLength + "%",
                } }, { children: _jsx(EventItem, { event: event, showdate: false, multiday: differenceInDays(event.end, event.start) > 0, hasPrev: fromPrevWeek, hasNext: toNextWeek }, void 0) }), i));
        }) }, void 0));
};
export default MonthEvents;
