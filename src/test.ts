import inputFixture from "./fixtures/input.json";
import expectedFixture from "./fixtures/expectedOutput.json";
import { validateAndCostBooking } from "./validateBookings";

describe("Booking Validation Function", () => {
  inputFixture.map((input, i) => {
    it("should handle case id:" + input.id, () => {
      expect(validateAndCostBooking(input)).toEqual(expectedFixture[i]);
    });
  });
});
