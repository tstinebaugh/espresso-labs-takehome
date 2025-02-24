import { ValidEmail } from "../utils/validation";
describe("Form Validation", () => {
  it("should validate email format", () => {
    expect(ValidEmail("test@example.com")).toBe(true);
    expect(ValidEmail("invalid-email")).toBe(false);
    expect(ValidEmail("")).toBe(false);
    expect(ValidEmail("test@test.")).toBe(false);
  });
});
