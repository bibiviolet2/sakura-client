import React, { useMemo, useState } from "react";
import "./CalendarTable.scss"; // Importujeme styly pro tabulku

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

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedStartTime, setSelectedStartTime] = useState<string>("");
  const [selectedEndTime, setSelectedEndTime] = useState<string>("");
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
      setSelectedStartTime("");
      setSelectedEndTime("");
      setIsStartSelected(false);
    }
    const slotStartHour = hour;
    const slotStartMinute = (slot * (60 / slotsPerHour)) % 60;
    const startTime = `${slotStartHour}:${String(slotStartMinute).padStart(
      2,
      "0"
    )}`;

    const slotEndHour = hour + Math.floor((slot + 1) / slotsPerHour);
    const slotEndMinute = ((slot + 1) * (60 / slotsPerHour)) % 60;
    const endTime = `${slotEndHour}:${String(slotEndMinute).padStart(2, "0")}`;

    const date = new Date(currentWeekStart.getTime() + dayIndex * 86400000)
      .toISOString()
      .split("T")[0];

    if (!isStartSelected) {
      setSelectedStartTime(startTime);
      setSelectedDate(date);
      setIsStartSelected(true);
    } else {
      let start = `${selectedDate}T${selectedStartTime}`;
      let end = `${date}T${endTime}`;
      if (new Date(start) > new Date(end)) {
        [start, end] = [end, start]; // Swap if end is before start
      }
      setSelectedStartTime(start.split("T")[1]);
      setSelectedEndTime(end.split("T")[1]);
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
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>
        <label>
          Počáteční čas:
          <select
            value={selectedStartTime}
            onChange={(e) => setSelectedStartTime(e.target.value)}
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
            value={selectedEndTime}
            onChange={(e) => setSelectedEndTime(e.target.value)}
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
