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
import EventItem from "./EventItem";
import CSS from "../../assets/css/styles.module.css";
import { differenceInMinutes, setHours } from "date-fns";
import { traversCrossingEvents } from "../../helpers/generals";
import { BORDER_HEIGHT } from "../../helpers/constants";
var TodayEvents = function (_a) {
    var todayEvents = _a.todayEvents, today = _a.today, startHour = _a.startHour, step = _a.step, minuteHeight = _a.minuteHeight, cellHeight = _a.cellHeight, direction = _a.direction;
    var crossingIds = [];
    return (_jsx("div", __assign({ className: CSS.events_col }, { children: todayEvents.map(function (event, i) {
            var _a;
            var height = differenceInMinutes(event.end, event.start) * minuteHeight;
            var fromTop = differenceInMinutes(event.start, setHours(today, startHour));
            /**
             * Count how many slots to count estimated total border height from top
             * The hardcoded BORDER_HEIGHT needs to be figured out dynamically
             */
            var slotsFromTop = fromTop / step;
            var borderFactor = slotsFromTop * BORDER_HEIGHT;
            var top = cellHeight * slotsFromTop + borderFactor;
            var crossingEvents = traversCrossingEvents(todayEvents, event);
            var alreadyRendered = crossingEvents.filter(function (e) {
                return crossingIds.includes(e.event_id);
            });
            crossingIds.push(event.event_id);
            return (_jsx("div", __assign({ className: CSS.event__item, style: (_a = {
                        height: height,
                        top: top,
                        width: crossingEvents.length
                            ? 100 / (crossingEvents.length + 1) + 10 + "%"
                            : ""
                    },
                    _a[direction === "rtl" ? "right" : "left"] = alreadyRendered.length
                        ? alreadyRendered.length *
                            (100 / (alreadyRendered.length + 1.7)) + "%"
                        : "",
                    _a) }, { children: _jsx(EventItem, { event: event }, void 0) }), event.event_id));
        }) }), void 0));
};
export default TodayEvents;
