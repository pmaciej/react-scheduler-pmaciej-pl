/// <reference types="react" />
import { ProcessedEvent } from "../../types";
interface MonthEventProps {
    events: ProcessedEvent[];
    today: Date;
    eachWeekStart: Date[];
    daysList: Date[];
    onViewMore(day: Date): void;
}
declare const MonthEvents: ({ events, today, eachWeekStart, daysList, onViewMore, }: MonthEventProps) => JSX.Element;
export default MonthEvents;
