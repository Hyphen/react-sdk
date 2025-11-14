import { describe, expect, test } from "vitest";
import { Toggle } from "../src/index.js";

describe("index", () => {
	test("should export Toggle", () => {
		expect(Toggle).toBeDefined();
	});
});
