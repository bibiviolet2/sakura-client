import React, { FC } from "react";
import "./CalendarTable.scss";

interface CalendarProps {
  formattedDates: string[];
  hours: number[];
  slotsPerHour: number;
  handleSlotClick: (dayIndex: number, hour: number, slot: number) => void;
  slots: { dayIndex: number; hour: number; slot: number; status: string }[];
}

const Calendar: FC<CalendarProps> = ({
  formattedDates,
  hours,
  slotsPerHour,
  handleSlotClick,
  slots,
}) => {
  return (
    <table className="calendar-table">
      <thead>
        <tr>
          <th className="sticky-column">🕒 / 📅</th>
          {hours.map((hour) => (
            <th key={hour} colSpan={slotsPerHour}>
              {hour}:00
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {formattedDates.map((date, dayIndex) => (
          <tr key={dayIndex}>
            <td className="sticky-column">{date}</td>
            {hours.flatMap((hour) =>
              Array.from({ length: slotsPerHour }, (_, slot) => {
                const slotData = slots.find(
                  (s) =>
                    s.dayIndex === dayIndex &&
                    s.hour === hour &&
                    s.slot === slot
                );

                return (
                  <td
                    key={`${dayIndex}-${hour}-${slot}`}
                    className={`time-slot ${slotData?.status || ""}`}
                    onClick={(e) => {
                      if (
                        slotData?.status === "reserved" ||
                        slotData?.status === "closed"
                      ) {
                        e.stopPropagation();
                        return;
                      }
                      handleSlotClick(dayIndex, hour, slot);
                    }}
                    title={
                      slotData?.status === "reserved"
                        ? "Tento čas je již rezervovaný"
                        : slotData?.status === "closed"
                        ? "Minimální rozestup mezi rezervacemi je 1 hodina"
                        : ""
                    }
                    aria-selected={slotData?.status === "selected"}
                  ></td>
                );
              })
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
