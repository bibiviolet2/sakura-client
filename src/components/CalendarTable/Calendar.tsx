import React, { useMemo, useState } from "react";
import "./CalendarTable.scss"; // Importujeme styly pro tabulku

interface Reservation {
  startTime: number;
  endTime: number;
}

const CalendarTable = ({ startHour = 9, endHour = 15, slotsPerHour = 4 }) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1);
    return firstDayOfWeek;
  });

  const formattedDates = useMemo(() => {
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const currentDate = new Date(
        currentWeekStart.getTime() + dayIndex * 86400000
      );
      return `${currentDate.toLocaleDateString("cs-CZ", {
        weekday: "long",
      })} ${currentDate.getDate()}.${currentDate.getMonth() + 1}.`;
    });
  }, [currentWeekStart]);

  const hours = Array.from(
    { length: endHour - startHour + 1 },
    (_, i) => i + startHour
  );

  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedStartTime, setSelectedStartTime] = useState<number | null>(
    null
  );
  const [selectedEndTime, setSelectedEndTime] = useState<number | null>(null);
  const [isStartSelected, setIsStartSelected] = useState<boolean>(false);

  const isSlotSelected = (dayIndex: number, hour: number, slot: number) => {
    if (!selectedStartTime || !selectedEndTime) return false;
    const selectedStart = new Date(
      `${selectedDate}T${selectedStartTime}`
    ).getTime();
    const selectedEnd = new Date(
      `${selectedDate}T${selectedEndTime}`
    ).getTime();
    const slotTime = new Date(currentWeekStart.getTime() + dayIndex * 86400000);
    slotTime.setHours(hour, (slot * 60) / slotsPerHour);
    const slotTimestamp = slotTime.getTime();
    return slotTimestamp >= selectedStart && slotTimestamp <= selectedEnd;
  };

  const handleSlotClick = (dayIndex: number, hour: number, slot: number) => {
    if (selectedStartTime && selectedEndTime) {
      // Pokud už jsou oba časy vybrané, resetujeme výběr a začínáme znovu
      setSelectedStartTime(null);
      setSelectedEndTime(null);
      setIsStartSelected(false);
      return;
    }

    const slotStartHour = hour;
    const slotStartMinute = (slot * (60 / slotsPerHour)) % 60;
    const startTime = new Date(
      currentWeekStart.getTime() + dayIndex * 86400000
    );
    startTime.setHours(slotStartHour, slotStartMinute, 0, 0);

    const slotEndHour = hour + Math.floor((slot + 1) / slotsPerHour);
    const slotEndMinute = ((slot + 1) * (60 / slotsPerHour)) % 60;
    const endTime = new Date(currentWeekStart.getTime() + dayIndex * 86400000);
    endTime.setHours(slotEndHour, slotEndMinute, 0, 0);

    if (!isStartSelected) {
      setSelectedStartTime(startTime.getTime());
      setSelectedDate(startTime.getTime());
      setIsStartSelected(true);
    } else {
      let start = selectedStartTime;
      let end = endTime.getTime();
      if (start && end && start > end) {
        [start, end] = [end, start]; // Swap if end is before start
      }
      setSelectedStartTime(start);
      setSelectedEndTime(end);
      setIsStartSelected(false);
    }
  };

  return (
    <div className="calendar-container">
      <form className="time-selection-form">
        <label>
          Datum:
          <input
            type="date"
            value={
              selectedDate
                ? new Date(selectedDate).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => setSelectedDate(Number(e.target.value))}
          />
        </label>
        <label>
          Počáteční čas:
          <select
            value={
              selectedStartTime
                ? new Date(selectedStartTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }
            onChange={(e) => setSelectedStartTime(Number(e.target.value))}
          >
            {hours.map((hour) => (
              <option key={hour} value={`${hour}:00`}>
                {hour}:00
              </option>
            ))}
          </select>
        </label>
        <label>
          Koncový čas:
          <select
            value={
              selectedEndTime
                ? new Date(selectedEndTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""
            }
            onChange={(e) => setSelectedEndTime(Number(e.target.value))}
          >
            {hours.map((hour) => (
              <option key={hour} value={`${hour}:00`}>
                {hour}:00
              </option>
            ))}
          </select>
        </label>
      </form>

      <div className="week-navigation">
        <button
          onClick={() =>
            setCurrentWeekStart((prev) => {
              const newDate = new Date(prev);
              newDate.setDate(prev.getDate() + 7);
              return newDate;
            })
          }
        >
          ◀ Předchozí týden
        </button>
        <span>
          {currentWeekStart.toLocaleDateString("cs-CZ", {
            day: "2-digit",
            month: "2-digit",
          })}{" "}
          -{" "}
          {new Date(
            currentWeekStart.getTime() + 6 * 86400000
          ).toLocaleDateString("cs-CZ", { day: "2-digit", month: "2-digit" })}
        </span>
        <button
          onClick={() =>
            setCurrentWeekStart((prev) => {
              const newDate = new Date(prev);
              newDate.setDate(prev.getDate() + 7);
              return newDate;
            })
          }
        >
          Následující týden ▶
        </button>
      </div>
      <h3>
        Vybraný čas: {selectedDate} {selectedStartTime} - {selectedEndTime}
      </h3>

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
          {Array.from({ length: 7 }, (_, dayIndex) => (
            <tr key={dayIndex}>
              <td className="sticky-column">{formattedDates[dayIndex]}</td>
              {hours.flatMap((hour) =>
                Array.from({ length: slotsPerHour }, (_, slot) => (
                  <td
                    key={`${dayIndex}-${hour}-${slot}`}
                    className={`time-slot ${
                      isSlotSelected(dayIndex, hour, slot) ? "selected" : ""
                    }`}
                    onClick={() => handleSlotClick(dayIndex, hour, slot)}
                    aria-selected={isSlotSelected(dayIndex, hour, slot)}
                  ></td>
                ))
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarTable;
