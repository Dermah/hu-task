import moment from "moment";

interface Booking {
  id: number;
  from: string;
  to: string;
}

interface CostedBooking extends Booking {
  isValid: boolean;
  total: number;
}

const TIMESTAMP_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";
const ALLOWED_MINUTES = { 0: true, 15: true, 30: true, 45: true };
const RATES = {
  day: 38,
  night: 42.93,
  sat: 45.91,
  sun: 60.85
};

export const validateAndCostBooking = (booking: Booking): CostedBooking => {
  let isValid = true;
  let total = 0;

  const from = moment(booking.from, TIMESTAMP_FORMAT);
  const to = moment(booking.to, TIMESTAMP_FORMAT);

  const duration = moment.duration(to.diff(from));

  if (
    // The minimum booking time is 1 hour
    // The maximum booking time is 24 hours
    // A booking cannot end before it has started
    duration.asHours() < 1 ||
    duration.asHours() > 24
  ) {
    isValid = false;
  } else if (
    // A booking can be booked in 15 min increments e.g. 1600 to 1715
    //   Note: unclear whether this means
    //     * the duration must be a multiple of 15 minutes,
    //     * that bookings must only begin at 0, 15, 30 or 45 minutes past the hour (logically includes the above condition)
    //   Assuming the latter based on input.json
    !ALLOWED_MINUTES[from.minutes()] ||
    !ALLOWED_MINUTES[to.minutes()]
  ) {
    isValid = false;
  }

  if (isValid) {
    // Saturday and Sunday rates apply across the whole day, there's no distinction between day and night:
    // Sat 1800 - 2200 will be charged at the sat rate (4 x 45.91)
    // Sun 0100 - 0700 will be charged at the sun rate (6 x 60.85)
    if (
      // Booking starts on a Sunday
      from.day() === 0
    ) {
      total = RATES.sun * duration.asHours();
    } else if (
      // Booking starts on a Saturday
      from.day() === 6
    ) {
      total = RATES.sat * duration.asHours();
    } else {
      // If any part of a booking is charged at the night rate, the whole booking is charged at the night rate:
      // Fri 1800 - 2100 will be charged at the night rate (3 x 42.93)
      // Wed 0500 - 1000 will be charged at the night rate (5 x 42.93)
    }
  }

  return {
    ...booking,
    isValid,
    total
  };
};
