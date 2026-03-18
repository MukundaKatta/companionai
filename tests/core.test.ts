import { describe, it, expect } from "vitest";
import { Companionai } from "../src/core.js";
describe("Companionai", () => {
  it("init", () => { expect(new Companionai().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Companionai(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Companionai(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
