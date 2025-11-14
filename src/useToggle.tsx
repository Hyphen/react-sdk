import { useContext } from "react";
import type { Toggle } from "@hyphen/browser-sdk";
import { ToggleContext } from "./ToggleProvider";

/**
 * Hook to access the Toggle instance from the ToggleProvider
 *
 * @throws {Error} If used outside of a ToggleProvider
 * @returns {Toggle} The Toggle instance from the provider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const toggle = useToggle();
 *   const isEnabled = toggle.getBoolean('my-feature', false);
 *
 *   return <div>{isEnabled ? 'Feature enabled' : 'Feature disabled'}</div>;
 * }
 * ```
 */
export function useToggle(): Toggle {
	const toggle = useContext(ToggleContext);

	if (!toggle) {
		throw new Error(
			"useToggle must be used within a ToggleProvider. " +
				"Wrap your component tree with <ToggleProvider> or use withToggleProvider().",
		);
	}

	return toggle;
}
