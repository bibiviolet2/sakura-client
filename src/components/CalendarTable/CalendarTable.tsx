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

  const mockReservations: Reservation[] = [
    {
      startTime: new Date(currentWeekStart.getTime() + 0 * 86400000).setHours(
        9,
        0,
        0,
        0
      ),
      endTime: new Date(currentWeekStart.getTime() + 0 * 86400000).setHours(
        14,
        0,
        0,
        0
      ),
    }, // Pondělí: 9:00 - 14:00
    {
      startTime: new Date(currentWeekStart.getTime() + 1 * 86400000).setHours(
        10,
        0,
        0,
        0
      ),
      endTime: new Date(currentWeekStart.getTime() + 1 * 86400000).setHours(
        15,
        0,
        0,
        0
      ),
    }, // Úterý: 10:00 - 15:00
    {
      startTime: new Date(currentWeekStart.getTime() + 2 * 86400000).setHours(
        12,
        0,
        0,
        0
      ),
      endTime: new Date(currentWeekStart.getTime() + 2 * 86400000).setHours(
        17,
        0,
        0,
        0
      ),
    }, // Středa: 12:00 - 17:00
    {
      startTime: new Date(currentWeekStart.getTime() + 3 * 86400000).setHours(
        9,
        0,
        0,
        0
      ),
      endTime: new Date(currentWeekStart.getTime() + 3 * 86400000).setHours(
        14,
        0,
        0,
        0
      ),
    }, // Čtvrtek: 9:00 - 14:00
    {
      startTime: new Date(currentWeekStart.getTime() + 4 * 86400000).setHours(
        10,
        0,
        0,
        0
      ),
      endTime: new Date(currentWeekStart.getTime() + 4 * 86400000).setHours(
        15,
        0,
        0,
        0
      ),
    }, // Pátek: 10:00 - 15:00
    {
      startTime: new Date(currentWeekStart.getTime() + 5 * 86400000).setHours(
        14,
        0,
        0,
        0
      ),
      endTime: new Date(currentWeekStart.getTime() + 5 * 86400000).setHours(
        19,
        0,
        0,
        0
      ),
    }, // Sobota: 14:00 - 19:00
    {
      startTime: new Date(currentWeekStart.getTime() + 6 * 86400000).setHours(
        11,
        0,
        0,
        0
      ),
      endTime: new Date(currentWeekStart.getTime() + 6 * 86400000).setHours(
        16,
        0,
        0,
        0
      ),
    }, // Neděle: 11:00 - 16:00
  ];

  const isSlotReserved = (dayIndex: number, hour: number, slot: number) => {
    const slotTime = new Date(currentWeekStart.getTime() + dayIndex * 86400000);
    slotTime.setHours(hour, (slot * 60) / slotsPerHour, 0, 0);
    const slotTimestamp = slotTime.getTime();

    return mockReservations.some(
      (reservation) =>
        slotTimestamp >= reservation.startTime &&
        slotTimestamp < reservation.endTime
    );
  };

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
    if (!selectedStartTime) return false;
    const selectedStart = selectedStartTime;
    const selectedEnd = selectedEndTime;
    const slotTime = new Date(currentWeekStart.getTime() + dayIndex * 86400000);
    slotTime.setHours(hour, (slot * 60) / slotsPerHour, 0, 0);
    const slotTimestamp = slotTime.getTime();
    return Boolean(
      (selectedEnd &&
        slotTimestamp >= selectedStart &&
        slotTimestamp < selectedEnd) ||
        (selectedStartTime && slotTimestamp === selectedStart)
    );
  };

  const handleSlotClick = (dayIndex: number, hour: number, slot: number) => {
    if (selectedStartTime && selectedEndTime) {
      // Pokud už jsou oba časy vybrané, resetujeme výběr a začínáme znovu
      setSelectedStartTime(null);
      setSelectedEndTime(null);
      setIsStartSelected(false);
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
            onChange={(e) =>
              setSelectedDate(new Date(e.target.value).getTime())
            }
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
            onChange={(e) => {
              const [hour, minute] = e.target.value.split(":").map(Number);
              const updatedTime = new Date(selectedDate || Date.now());
              updatedTime.setHours(hour, minute, 0, 0);
              setSelectedStartTime(updatedTime.getTime());
            }}
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
            onChange={(e) => {
              const [hour, minute] = e.target.value.split(":").map(Number);
              const updatedTime = new Date(selectedDate || Date.now());
              updatedTime.setHours(hour, minute, 0, 0);
              setSelectedEndTime(updatedTime.getTime());
            }}
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
        Vybraný čas:{" "}
        {selectedDate
          ? new Date(selectedDate).toLocaleDateString("cs-CZ")
          : "Není vybrán"}{" "}
        {selectedStartTime
          ? new Date(selectedStartTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "--:--"}
        {selectedEndTime
          ? ` - ${new Date(selectedEndTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}`
          : ""}
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
                    } ${
                      isSlotReserved(dayIndex, hour, slot) ? "reserved" : ""
                    }`}
                    onClick={() =>
                      !isSlotReserved(dayIndex, hour, slot) &&
                      handleSlotClick(dayIndex, hour, slot)
                    }
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
