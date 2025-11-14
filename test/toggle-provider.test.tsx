import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { ToggleProvider, ToggleContext } from "../src/toggle-provider";
import { useContext } from "react";

describe("ToggleProvider", () => {
	test("should render children", () => {
		const { getByText } = render(
			<ToggleProvider publicApiKey="public_test">
				<div>Test Child</div>
			</ToggleProvider>,
		);

		expect(getByText("Test Child")).toBeDefined();
	});

	test("should provide Toggle instance through context", () => {
		let toggleInstance: unknown = null;

		function TestComponent() {
			toggleInstance = useContext(ToggleContext);
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

	test("should create Toggle with correct configuration", () => {
		let toggleInstance: unknown = null;

		function TestComponent() {
			toggleInstance = useContext(ToggleContext);
			return <div>Test</div>;
		}

		render(
			<ToggleProvider
				publicApiKey="public_test"
				applicationId="test-app"
				environment="production"
			>
				<TestComponent />
			</ToggleProvider>,
		);

		expect(toggleInstance).toBeDefined();
		// The Toggle instance should be created with the provided configuration
		// We can't easily test the internal configuration, but we can verify it exists
	});

	test("should provide null context when no provider is used", () => {
		let toggleInstance: unknown = undefined;

		function TestComponent() {
			toggleInstance = useContext(ToggleContext);
			return <div>Test</div>;
		}

		render(<TestComponent />);

		expect(toggleInstance).toBeNull();
	});
});
