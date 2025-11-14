import {
	createContext,
	useMemo,
	useEffect,
	type Context,
} from "react";
import { Toggle } from "@hyphen/browser-sdk";
import type { ToggleProviderProps } from "./types";

/**
 * React Context for the Toggle instance
 */
export const ToggleContext: Context<Toggle | null> = createContext<Toggle | null>(null);

/**
 * Provider component that creates and provides a Toggle instance to the React tree
 *
 * @example
 * ```tsx
 * <ToggleProvider publicApiKey="public_..." applicationId="my-app">
 *   <App />
 * </ToggleProvider>
 * ```
 */
export function ToggleProvider({
	children,
	publicApiKey,
	applicationId,
	environment,
	defaultContext,
	horizonUrls,
	defaultTargetKey,
}: ToggleProviderProps) {
	// Create Toggle instance, memoized by configuration
	const toggle = useMemo(() => {
		return new Toggle({
			publicApiKey,
			applicationId,
			environment,
			defaultContext,
			horizonUrls,
			defaultTargetKey,
		});
	}, [
		publicApiKey,
		applicationId,
		environment,
		defaultContext,
		horizonUrls,
		defaultTargetKey,
	]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			// Toggle cleanup if needed (currently Toggle doesn't have a destroy method)
			// This is here for future-proofing
		};
	}, [toggle]);

	return (
		<ToggleContext.Provider value={toggle}>{children}</ToggleContext.Provider>
	);
}
