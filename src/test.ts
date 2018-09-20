import inputFixture from "./fixtures/input.json";
import expectedFixture from "./fixtures/expectedOutput.json";
import { validateAndCostBooking } from ".";

describe("Booking Validation Function", () => {
  inputFixture.map((input, i) => {
    it("should handle case " + i, () => {
      expect(validateAndCostBooking(input)).toEqual(expectedFixture[i]);
    });
  });
});
