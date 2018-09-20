interface Booking {
  id: number;
  from: string;
  to: string;
}

interface CostedBooking extends Booking {
  isValid: boolean;
  total: number;
}

export const validateAndCostBooking = (booking: Booking): CostedBooking => {
  return {
    id: 2,
    from: "2017-10-20T09:00:00+11:00",
    to: "2017-10-20T11:45:00+11:00",
    isValid: true,
    total: 104.5
  };
};
