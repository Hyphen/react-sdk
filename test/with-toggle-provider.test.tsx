import { describe, expect, test } from "vitest";
import { render } from "@testing-library/react";
import { withToggleProvider } from "../src/with-toggle-provider";
import { useToggle } from "../src/use-toggle";

describe("withToggleProvider", () => {
	test("should wrap component with ToggleProvider", () => {
		function TestComponent() {
			return <div>Test Component</div>;
		}

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(TestComponent);

		const { getByText } = render(<WrappedComponent />);

		expect(getByText("Test Component")).toBeDefined();
	});

	test("should provide Toggle instance to wrapped component", () => {
		let toggleInstance: unknown = null;

		function TestComponent() {
			toggleInstance = useToggle();
			return <div>Test</div>;
		}

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
			applicationId: "test-app",
		})(TestComponent);

		render(<WrappedComponent />);

		expect(toggleInstance).toBeDefined();
		expect(toggleInstance).not.toBeNull();
	});

	test("should preserve component display name", () => {
		function TestComponent() {
			return <div>Test</div>;
		}
		TestComponent.displayName = "MyTestComponent";

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(TestComponent);

		expect(WrappedComponent.displayName).toBe(
			"withToggleProvider(MyTestComponent)",
		);
	});

	test("should use component name when displayName is not set", () => {
		function TestComponent() {
			return <div>Test</div>;
		}

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(TestComponent);

		expect(WrappedComponent.displayName).toBe(
			"withToggleProvider(TestComponent)",
		);
	});

	test("should pass props to wrapped component", () => {
		interface TestProps {
			testProp: string;
		}

		function TestComponent({ testProp }: TestProps) {
			return <div>{testProp}</div>;
		}

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
		})(TestComponent);

		const { getByText } = render(<WrappedComponent testProp="Hello World" />);

		expect(getByText("Hello World")).toBeDefined();
	});

	test("should pass Toggle configuration to provider", () => {
		let toggleInstance: unknown = null;

		function TestComponent() {
			toggleInstance = useToggle();
			return <div>Test</div>;
		}

		const WrappedComponent = withToggleProvider({
			publicApiKey: "public_test",
			applicationId: "my-app",
			environment: "production",
		})(TestComponent);

		render(<WrappedComponent />);

		// Verify that Toggle instance was created (configuration is internal)
		expect(toggleInstance).toBeDefined();
		expect(toggleInstance).not.toBeNull();
	});
});
