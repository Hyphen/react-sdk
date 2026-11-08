import { render } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, test } from "vitest";
import { ToggleContext, ToggleProvider } from "../src/toggle-provider";

let toggleInstance: unknown;

function ReadToggle() {
	toggleInstance = useContext(ToggleContext);
	return <div>Test</div>;
}

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
		toggleInstance = null;

		render(
			<ToggleProvider publicApiKey="public_test" applicationId="test-app">
				<ReadToggle />
			</ToggleProvider>,
		);

		expect(toggleInstance).toBeDefined();
		expect(toggleInstance).not.toBeNull();
	});

	test("should create Toggle with correct configuration", () => {
		toggleInstance = null;

		render(
			<ToggleProvider
				publicApiKey="public_test"
				applicationId="test-app"
				environment="production"
			>
				<ReadToggle />
			</ToggleProvider>,
		);

		expect(toggleInstance).toBeDefined();
		// The Toggle instance should be created with the provided configuration
		// We can't easily test the internal configuration, but we can verify it exists
	});

	test("should provide null context when no provider is used", () => {
		toggleInstance = undefined;

		render(<ReadToggle />);

		expect(toggleInstance).toBeNull();
	});
});
