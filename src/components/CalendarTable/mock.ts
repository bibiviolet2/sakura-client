import { Reservation } from "./CalendarContainer";

export const getMockForWeek = (currentWeekStart: Date) => {
  const week1Reservations: Reservation[] = [
    { startTime: 1716900600000, endTime: 1716913200000 }, // Pondělí 8:30 - 12:00
    { startTime: 1716986400000, endTime: 1716999000000 }, // Úterý 9:00 - 12:30
    { startTime: 1717010400000, endTime: 1717023000000 }, // Úterý 14:00 - 17:30
    { startTime: 1717086900000, endTime: 1717099200000 }, // Středa 10:15 - 14:00
    { startTime: 1717166700000, endTime: 1717179000000 }, // Čtvrtek 9:45 - 13:30
    { startTime: 1717192800000, endTime: 1717205400000 }, // Čtvrtek 15:00 - 18:30
    { startTime: 1717253700000, endTime: 1717266300000 }, // Pátek 8:15 - 11:45
    { startTime: 1717284600000, endTime: 1717297200000 }, // Pátek 13:30 - 16:30
    { startTime: 1717341600000, endTime: 1717354200000 }, // Sobota 10:00 - 14:30
    { startTime: 1717424100000, endTime: 1717436700000 }, // Neděle 12:15 - 17:00
  ];

  const week2Reservations: Reservation[] = [
    { startTime: 1717509600000, endTime: 1717522200000 }, // Pondělí 9:00 - 13:00
    { startTime: 1717596000000, endTime: 1717608600000 }, // Úterý 10:30 - 15:30
    { startTime: 1717682400000, endTime: 1717695000000 }, // Středa 8:00 - 11:00
    { startTime: 1717759200000, endTime: 1717771800000 }, // Čtvrtek 12:30 - 16:30
    { startTime: 1717845600000, endTime: 1717858200000 }, // Pátek 14:00 - 18:00
    { startTime: 1717928400000, endTime: 1717941000000 }, // Sobota 11:00 - 15:00
    { startTime: 1718014800000, endTime: 1718027400000 }, // Neděle 10:15 - 14:15
  ];

  return Math.floor(currentWeekStart.getTime() / (7 * 86400000)) % 2 === 0
    ? week1Reservations
    : week2Reservations;
};
