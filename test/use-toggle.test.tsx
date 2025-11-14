import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { useToggle } from "../src/use-toggle";
import { ToggleProvider } from "../src/toggle-provider";

describe("useToggle", () => {
	test("should return Toggle instance when used within ToggleProvider", () => {
		let toggleInstance: unknown = null;

		function TestComponent() {
			toggleInstance = useToggle();
			return <div>Test</div>;
		}

		render(
			<ToggleProvider publicApiKey="public_test" applicationId="test-app">
				<TestComponent />
			</ToggleProvider>,
		);

		expect(toggleInstance).toBeDefined();
		expect(toggleInstance).not.toBeNull();
	});

	test("should throw error when used outside ToggleProvider", () => {
		function TestComponent() {
			useToggle();
			return <div>Test</div>;
		}

		// Suppress console.error for this test since we expect an error
		const originalError = console.error;
		console.error = () => {};

		expect(() => {
			render(<TestComponent />);
		}).toThrow(
			"useToggle must be used within a ToggleProvider. " +
				"Wrap your component tree with <ToggleProvider> or use withToggleProvider().",
		);

		// Restore console.error
		console.error = originalError;
	});

	test("should provide access to Toggle methods", () => {
		let hasGetBooleanMethod = false;
		let hasGetStringMethod = false;
		let hasGetNumberMethod = false;

		function TestComponent() {
			const toggle = useToggle();
			hasGetBooleanMethod = typeof toggle.getBoolean === "function";
			hasGetStringMethod = typeof toggle.getString === "function";
			hasGetNumberMethod = typeof toggle.getNumber === "function";
			return <div>Test</div>;
		}

		render(
			<ToggleProvider publicApiKey="public_test">
				<TestComponent />
			</ToggleProvider>,
		);

		expect(hasGetBooleanMethod).toBe(true);
		expect(hasGetStringMethod).toBe(true);
		expect(hasGetNumberMethod).toBe(true);
	});

	test("should return same instance across multiple renders", () => {
		const instances: unknown[] = [];

		function TestComponent({ renderCount }: { renderCount: number }) {
			const toggle = useToggle();
			instances[renderCount] = toggle;
			return <div>Test</div>;
		}

		const { rerender } = render(
			<ToggleProvider publicApiKey="public_test">
				<TestComponent renderCount={0} />
			</ToggleProvider>,
		);

		rerender(
			<ToggleProvider publicApiKey="public_test">
				<TestComponent renderCount={1} />
			</ToggleProvider>,
		);

		// Both renders should get the same Toggle instance
		expect(instances[0]).toBe(instances[1]);
	});
});
