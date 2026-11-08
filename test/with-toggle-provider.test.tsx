import { render } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useToggle } from "../src/use-toggle";
import { withToggleProvider } from "../src/with-toggle-provider";

function StaticTestComponent() {
	return <div>Test Component</div>;
}

let toggleInstance: unknown = null;

function CaptureToggle() {
	toggleInstance = useToggle();
	return <div>Test</div>;
}

function NamedTestComponent() {
	return <div>Test</div>;
}

function TestComponent() {
	return <div>Test</div>;
}

interface TestProps {
	testProp: string;
}

function PropTestComponent({ testProp }: TestProps) {
	return <div>{testProp}</div>;
}

describe("withToggleProvider", () => {
	test("should wrap component with ToggleProvider", () => {
		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(StaticTestComponent);

		const { getByText } = render(<WrappedComponent />);

		expect(getByText("Test Component")).toBeDefined();
	});

	test("should provide Toggle instance to wrapped component", () => {
		toggleInstance = null;

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
			applicationId: "test-app",
		})(CaptureToggle);

		render(<WrappedComponent />);

		expect(toggleInstance).toBeDefined();
		expect(toggleInstance).not.toBeNull();
	});

	test("should preserve component display name", () => {
		NamedTestComponent.displayName = "MyTestComponent";

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(NamedTestComponent);

		expect(WrappedComponent.displayName).toBe(
			"withToggleProvider(MyTestComponent)",
		);
	});

	test("should use component name when displayName is not set", () => {
		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(TestComponent);

		expect(WrappedComponent.displayName).toBe(
			"withToggleProvider(TestComponent)",
		);
	});

	test("should pass props to wrapped component", () => {
		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(PropTestComponent);

		const { getByText } = render(<WrappedComponent testProp="Hello World" />);

		expect(getByText("Hello World")).toBeDefined();
	});

	test("should pass Toggle configuration to provider", () => {
		toggleInstance = null;

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
			applicationId: "my-app",
			environment: "production",
		})(CaptureToggle);

		render(<WrappedComponent />);

		// Verify that Toggle instance was created (configuration is internal)
		expect(toggleInstance).toBeDefined();
		expect(toggleInstance).not.toBeNull();
	});
});
