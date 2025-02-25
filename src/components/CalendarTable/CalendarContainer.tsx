import React, { useMemo, useState } from "react";
import Calendar from "./Calendar";
import { generateSlots } from "./generateSlots";

export interface Reservation {
  startTime: number;
  endTime: number;
}

const CalendarContainer = ({
  startHour = 9,
  endHour = 15,
  slotsPerHour = 4,
  onDateChange,
}: {
  startHour?: number;
  endHour?: number;
  slotsPerHour?: number;
  onDateChange?: (date: number | null) => void;
}) => {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay() + 1);
    firstDayOfWeek.setHours(0, 0, 0, 0); // Zajistí přesnost výpočtů
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isStartSelected, setIsStartSelected] = useState<boolean>(false);

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
    } else if (selectedStartTime) {
      let start = selectedStartTime;
      let end = endTime.getTime();
      if (start && end && start > end) {
        [start, end] = [end, start]; // Swap if end is before start
      }

      // Zabránit výběru přes více dnů
      const startDate = new Date(start).toDateString();
      const endDate = new Date(end).toDateString();
      if (startDate !== endDate) {
        setErrorMessage("Rezervace musí být v rámci jednoho dne.");
        setSelectedStartTime(null);
        setSelectedEndTime(null);
        setIsStartSelected(false);
        return;
      }

      setSelectedStartTime(start);
      setSelectedEndTime(end);
      setIsStartSelected(false);
    }
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    setCurrentWeekStart((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + (direction === "next" ? 7 : -7));

      // Zajistíme, že začátek týdne vždy bude pondělí
      newDate.setDate(newDate.getDate() - newDate.getDay() + 1);
      newDate.setHours(0, 0, 0, 0);
      return newDate;
    });
  };

  return (
    <div className="calendar-container">
      {errorMessage && <div className="error-message">{errorMessage}</div>}
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
            onChange={(e) => {
              const newDate = new Date(e.target.value).getTime();
              setSelectedDate(newDate);
              if (onDateChange) onDateChange(newDate);
            }}
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
              if (!e.target.value) {
                setSelectedStartTime(null);
                return;
              }
              const [hour, minute] = e.target.value.split(":").map(Number);
              const updatedTime = new Date(selectedDate || Date.now());
              updatedTime.setHours(hour, minute, 0, 0);
              setSelectedStartTime(updatedTime.getTime());
            }}
            defaultValue=""
          >
            <option value="">-</option>
            {hours.flatMap((hour) =>
              Array.from({ length: slotsPerHour }, (_, i) => {
                const minutes = (i * 60) / slotsPerHour;
                const formattedTime = `${hour}:${String(minutes).padStart(
                  2,
                  "0"
                )}`;
                return (
                  <option key={formattedTime} value={formattedTime}>
                    {formattedTime}
                  </option>
                );
              })
            )}
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
              if (!e.target.value) {
                setSelectedEndTime(null);
                return;
              }
              const [hour, minute] = e.target.value.split(":").map(Number);
              const updatedTime = new Date(selectedDate || Date.now());
              updatedTime.setHours(hour, minute, 0, 0);
              setSelectedEndTime(updatedTime.getTime());
            }}
            defaultValue=""
          >
            <option value="">-</option>
            {hours.flatMap((hour) =>
              Array.from({ length: slotsPerHour }, (_, i) => {
                const minutes = (i * 60) / slotsPerHour;
                const formattedTime = `${hour}:${String(minutes).padStart(
                  2,
                  "0"
                )}`;
                return (
                  <option key={formattedTime} value={formattedTime}>
                    {formattedTime}
                  </option>
                );
              })
            )}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            setSelectedStartTime(null);
            setSelectedEndTime(null);
            setSelectedDate(null);
            setIsStartSelected(false);
          }}
        >
          Zrušit výběr
        </button>
      </form>

      <div className="week-navigation">
        <button onClick={() => handleWeekChange("prev")}>
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
        <button onClick={() => handleWeekChange("next")}>
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

      <Calendar
        formattedDates={formattedDates}
        hours={hours}
        slotsPerHour={slotsPerHour}
        slots={generateSlots(
          currentWeekStart,
          formattedDates,
          slotsPerHour,
          hours,
          selectedStartTime,
          selectedEndTime
        )}
        handleSlotClick={handleSlotClick}
      />
    </div>
  );
};

export default CalendarContainer;
