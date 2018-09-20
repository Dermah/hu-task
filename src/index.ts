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
    ...booking,
    isValid: true,
    total: 3000
  };
};
