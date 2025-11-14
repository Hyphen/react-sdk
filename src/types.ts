import type { ToggleOptions } from "@hyphen/browser-sdk";
import type { ReactNode } from "react";

/**
 * Props for the ToggleProvider component
 * Extends ToggleOptions from @hyphen/browser-sdk
 */
export interface ToggleProviderProps extends ToggleOptions {
	/**
	 * React children to be wrapped by the provider
	 */
	children: ReactNode;
}
