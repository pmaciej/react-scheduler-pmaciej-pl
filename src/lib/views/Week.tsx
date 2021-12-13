import { useEffect, useCallback, Fragment } from "react";
import { Typography } from "@mui/material";
import {
  startOfWeek,
  addDays,
  format,
  eachMinuteOfInterval,
  isSameDay,
  differenceInDays,
  isBefore,
  isToday,
  setMinutes,
  setHours,
  isWithinInterval,
  isAfter,
  endOfDay,
  startOfDay,
  addMinutes,
} from "date-fns";
import TodayTypo from "../components/common/TodayTypo";
import EventItem from "../components/events/EventItem";
import { useAppState } from "../hooks/useAppState";
import {
  CellRenderedProps,
  DayHours,
  DefaultRecourse,
  ProcessedEvent,
} from "../types";
import { WeekDays } from "./Month";
import {
  calcCellHeight,
  calcMinuteHeight,
  getResourcedEvents,
} from "../helpers/generals";
import { WithResources } from "../components/common/WithResources";
import CSS from "../assets/css/styles.module.css";
import { Cell } from "../components/common/Cell";
import TodayEvents from "../components/events/TodayEvents";

export interface WeekProps {
  weekDays: WeekDays[];
  weekStartOn: WeekDays;
  startHour: DayHours;
  endHour: DayHours;
  step: number;
  cellRenderer?(props: CellRenderedProps): JSX.Element;
}

const Week = () => {
  const {
    week,
    selectedDate,
    height,
    events,
    triggerDialog,
    handleGotoDay,
    remoteEvents,
    triggerLoading,
    handleState,
    resources,
    resourceFields,
    fields,
    direction,
    locale,
  } = useAppState();

  const { weekStartOn, weekDays, startHour, endHour, step, cellRenderer } =
    week!;
  const _weekStart = startOfWeek(selectedDate, { weekStartsOn: weekStartOn });
  const daysList = weekDays.map((d) => addDays(_weekStart, d));
  console.log(daysList)
  const weekStart = startOfDay(daysList[0]);
  const weekEnd = endOfDay(daysList[daysList.length - 1]);
  const START_TIME = setMinutes(setHours(selectedDate, startHour), 0);
  const END_TIME = setMinutes(setHours(selectedDate, endHour), 0);
  const hours = eachMinuteOfInterval(
    {
      start: START_TIME,
      end: END_TIME,
    },
    { step: step }
  );
  const CELL_HEIGHT = calcCellHeight(height, hours.length);
  const MINUTE_HEIGHT = calcMinuteHeight(CELL_HEIGHT, step);
  const MULTI_SPACE = 28;

  const fetchEvents = useCallback(async () => {
    try {
      triggerLoading(true);
      const query = `?start=${weekStart}&end=${weekEnd}`;
      const events = await remoteEvents!(query);
      if (Array.isArray(events)) {
        handleState(events, "events");
      }
    } catch (error) {
      throw error;
    } finally {
      triggerLoading(false);
    }
    // eslint-disable-next-line
  }, [selectedDate]);

  useEffect(() => {
    if (remoteEvents instanceof Function) {
      fetchEvents();
    }
    // eslint-disable-next-line
  }, [fetchEvents]);

  const renderMultiDayEvents = (events: ProcessedEvent[], today: Date) => {
    const isFirstDayInWeek = isSameDay(weekStart, today);
    const allWeekMulti = events.filter(
      (e) =>
        differenceInDays(e.end, e.start) > 0 &&
        daysList.some((weekday) =>
          isWithinInterval(weekday, {
            start: startOfDay(e.start),
            end: endOfDay(e.end),
          })
        )
    );

    const multiDays = allWeekMulti
      .filter((e) =>
        isBefore(e.start, weekStart)
          ? isFirstDayInWeek
          : isSameDay(e.start, today)
      )
      .sort((a, b) => b.end.getTime() - a.end.getTime());
    return (
      <div
        className={CSS.events_col}
        // style={{ height: SPACE * allWeekMulti.length }}
      >
        {multiDays.map((event, i) => {
          const hasPrev = isBefore(startOfDay(event.start), weekStart);
          const hasNext = isAfter(endOfDay(event.end), weekEnd);
          const eventLength =
            differenceInDays(
              hasNext ? weekEnd : event.end,
              hasPrev ? weekStart : event.start
            ) + 1;
          const prevNextEvents = events.filter((e) =>
            isFirstDayInWeek
              ? false
              : e.event_id !== event.event_id && //Exclude it's self
                isWithinInterval(today, { start: e.start, end: e.end })
          );

          let index = i;
          if (prevNextEvents.length) {
            index += prevNextEvents.length;
          }

          return (
            <div
              key={event.event_id}
              className={`${CSS.allday_event} ${CSS.event__item}`}
              style={{
                top: index * MULTI_SPACE,
                width: `${100 * eventLength}%`,
              }}
            >
              <EventItem
                event={event}
                hasPrev={hasPrev}
                hasNext={hasNext}
                multiday
              />
            </div>
          );
        })}
      </div>
    );
  };

  const renderTable = (resource?: DefaultRecourse) => {
    let recousedEvents = events;
    if (resource) {
      recousedEvents = getResourcedEvents(
        events,
        resource,
        resourceFields,
        fields
      );
    }

    const allWeekMulti = events.filter(
      (e) =>
        differenceInDays(e.end, e.start) > 0 &&
        daysList.some((weekday) =>
          isWithinInterval(weekday, {
            start: startOfDay(e.start),
            end: endOfDay(e.end),
          })
        )
    );

    return (
      <Fragment>
        <tr>
          <td className={`${CSS.indent} ${CSS.borderd}`}></td>
          <td className={CSS.borderd}>
            <table className={`${CSS.table} ${CSS.week_day_table}`}>
              <tbody>
                <tr>
                  {daysList.map((date, i) => (
                    <td
                      key={i}
                      className={isToday(date) ? CSS.today_cell : ""}
                      style={{
                        height: MULTI_SPACE * allWeekMulti.length + 40,
                        borderBottom: 0,
                        borderRight:
                          direction === "rtl"
                            ? i === 0
                              ? 0
                              : "1px solid #eeeeee"
                            : "",
                        borderLeft:
                          direction === "ltr"
                            ? i === 0
                              ? 0
                              : "1px solid #eeeeee"
                            : "",
                      }}
                    >
                      <TodayTypo date={date} onClick={handleGotoDay} />
                      {renderMultiDayEvents(recousedEvents, date)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td className={CSS.borderd}>
            <table className={`${CSS.table} ${CSS.hour_table}`}>
              <thead>
                <tr>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {hours.map((h, i) => (
                  <tr key={i}>
                    <td>
                      <div style={{ height: CELL_HEIGHT }}>
                        <Typography variant="caption">
                          {format(h, "HH:mm", { locale: locale })}
                        </Typography>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td className={CSS.borderd}>
            <table
              className={`${CSS.table} ${CSS.cells_table} ${
                CSS[`cells_table_${direction}`]
              } `}
            >
              <thead>
                <tr>
                  {daysList.map((date, i) => (
                    <td key={i}>
                      <TodayEvents
                        todayEvents={recousedEvents
                          .filter(
                            (e) =>
                              isSameDay(date, e.start) &&
                              !differenceInDays(e.end, e.start)
                          )
                          .sort((a, b) => a.end.getTime() - b.end.getTime())}
                        today={date}
                        minuteHeight={MINUTE_HEIGHT}
                        cellHeight={CELL_HEIGHT}
                        startHour={startHour}
                        step={step}
                        direction={direction}
                      />
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map((h, i) => (
                  <tr key={i}>
                    {daysList.map((date, i) => {
                      const start = new Date(
                        `${format(date, "yyyy MM dd")} ${format(h, "hh:mm a")}`
                      );
                      const end = new Date(
                        `${format(date, "yyyy MM dd")} ${format(
                          addMinutes(h, step),
                          "hh:mm a"
                        )}`
                      );
                      const field = resourceFields.idField;
                      return (
                        <td
                          key={i}
                          className={isToday(date) ? CSS.today_cell : ""}
                        >
                          {cellRenderer ? (
                            cellRenderer({
                              day: date,
                              start,
                              end,
                              height: CELL_HEIGHT,
                              onClick: () =>
                                triggerDialog(true, {
                                  start,
                                  end,
                                  [field]: resource ? resource[field] : null,
                                }),
                              [field]: resource ? resource[field] : null,
                            })
                          ) : (
                            <Cell
                              height={CELL_HEIGHT}
                              start={start}
                              end={end}
                              resourceKey={field}
                              resourceVal={resource ? resource[field] : null}
                            />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </Fragment>
    );
  };

  return (
    <tbody className={CSS.borderd}>
      {resources.length ? (
        <WithResources span={daysList.length} renderChildren={renderTable} />
      ) : (
        renderTable()
      )}
    </tbody>
  );
};

export { Week };
