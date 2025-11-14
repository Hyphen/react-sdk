import type { ComponentType } from "react";
import type { ToggleOptions } from "@hyphen/browser-sdk";
import { ToggleProvider } from "./toggle-provider";

/**
 * Higher-order component that wraps a component with ToggleProvider
 *
 * @param options - Configuration options for the Toggle instance
 * @returns A function that wraps a component with ToggleProvider
 *
 * @example
 * ```tsx
 * export default withToggleProvider({
 *   publicApiKey: "public_...",
 *   applicationId: "my-app",
 *   environment: "production",
 *   defaultContext: {
 *     user: { id: "user-123" }
 *   }
 * })(App);
 * ```
 */
export function withToggleProvider(options: ToggleOptions) {
	return function <P extends object>(
		Component: ComponentType<P>,
	): ComponentType<P> {
		const WrappedComponent = (props: P) => {
			return (
				<ToggleProvider {...options}>
					<Component {...props} />
				</ToggleProvider>
			);
		};

		// Preserve the original component name for debugging
		const componentName =
			Component.displayName || Component.name || "Component";
		WrappedComponent.displayName = `withToggleProvider(${componentName})`;

		return WrappedComponent;
	};
}
