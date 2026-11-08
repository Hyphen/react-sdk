import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { ToggleProvider } from "../src/toggle-provider";
import { useToggle } from "../src/use-toggle";

let toggleInstance: unknown = null;

function CaptureToggle() {
	toggleInstance = useToggle();
	return <div>Test</div>;
}

function ThrowToggle() {
	useToggle();
	return <div>Test</div>;
}

let hasGetBooleanMethod = false;
let hasGetStringMethod = false;
let hasGetNumberMethod = false;

function InspectToggle() {
	const toggle = useToggle();
	hasGetBooleanMethod = typeof toggle.getBoolean === "function";
	hasGetStringMethod = typeof toggle.getString === "function";
	hasGetNumberMethod = typeof toggle.getNumber === "function";
	return <div>Test</div>;
}

const instances: unknown[] = [];

function RecordToggle({ renderCount }: { renderCount: number }) {
	const toggle = useToggle();
	instances[renderCount] = toggle;
	return <div>Test</div>;
}

describe("useToggle", () => {
	test("should return Toggle instance when used within ToggleProvider", () => {
		toggleInstance = null;

		render(
			<ToggleProvider publicApiKey="public_test" applicationId="test-app">
				<CaptureToggle />
			</ToggleProvider>,
		);

		expect(toggleInstance).toBeDefined();
		expect(toggleInstance).not.toBeNull();
	});

	test("should throw error when used outside ToggleProvider", () => {
		expect(() => {
			render(<ThrowToggle />);
		}).toThrow(
			"useToggle must be used within a ToggleProvider. " +
				"Wrap your component tree with <ToggleProvider> or use withToggleProvider().",
		);
	});

	test("should provide access to Toggle methods", () => {
		hasGetBooleanMethod = false;
		hasGetStringMethod = false;
		hasGetNumberMethod = false;

		render(
			<ToggleProvider publicApiKey="public_test">
				<InspectToggle />
			</ToggleProvider>,
		);

		expect(hasGetBooleanMethod).toBe(true);
		expect(hasGetStringMethod).toBe(true);
		expect(hasGetNumberMethod).toBe(true);
	});

	test("should return same instance across multiple renders", () => {
		instances.length = 0;

		const { rerender } = render(
			<ToggleProvider publicApiKey="public_test">
				<RecordToggle renderCount={0} />
			</ToggleProvider>,
		);

		rerender(
			<ToggleProvider publicApiKey="public_test">
				<RecordToggle renderCount={1} />
			</ToggleProvider>,
		);

		// Both renders should get the same Toggle instance
		expect(instances[0]).toBe(instances[1]);
	});
});
