import { getMockForWeek } from "./mock";

export const generateSlots = (
  currentWeekStart: Date,
  formattedDates: string[],
  slotsPerHour: number,
  hours: number[],
  selectedStartTime: number | null,
  selectedEndTime: number | null
) => {
  return formattedDates.flatMap((_, dayIndex) =>
    hours.flatMap((hour) =>
      Array.from({ length: slotsPerHour }, (_, slot) => {
        const slotTime = new Date(
          currentWeekStart.getTime() + dayIndex * 86400000
        );
        slotTime.setHours(hour, (slot * 60) / slotsPerHour, 0, 0);
        const slotTimestamp = slotTime.getTime();

        const isReserved = getMockForWeek(currentWeekStart).some(
          (reservation) =>
            slotTimestamp >= reservation.startTime &&
            slotTimestamp < reservation.endTime
        );

        const isClosed = getMockForWeek(currentWeekStart).some(
          (reservation) => {
            const minGap = 60 * 60 * 1000; // 1 hodina v ms
            return (
              (slotTimestamp < reservation.startTime &&
                reservation.startTime - slotTimestamp < minGap) ||
              (slotTimestamp >= reservation.endTime &&
                slotTimestamp - reservation.endTime < minGap)
            );
          }
        );

        const isSelected =
          selectedStartTime &&
          slotTimestamp >= selectedStartTime &&
          (!selectedEndTime || slotTimestamp < selectedEndTime);

        return {
          dayIndex,
          hour,
          slot,
          status: isSelected
            ? "selected"
            : isReserved
            ? "reserved"
            : isClosed
            ? "closed"
            : "open",
        };
      })
    )
  );
};
