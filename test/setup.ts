import { afterAll, beforeAll } from "vitest";

// Suppress React error boundary and jsdom error output during tests
// This prevents expected error stack traces from cluttering test output
let originalConsoleError: typeof console.error;
let originalStderrWrite: typeof process.stderr.write;

beforeAll(() => {
	// Suppress console.error for React errors
	originalConsoleError = console.error;
	console.error = (...args: unknown[]) => {
		const message = String(args[0] || "");
		// Suppress known React/testing error messages
		if (
			message.includes("Error: Uncaught") ||
			message.includes("The above error occurred") ||
			message.includes("React will try to recreate") ||
			message.includes("Consider adding an error boundary") ||
			message.includes("useToggle must be used within")
		) {
			return;
		}
		originalConsoleError(...args);
	};

	// Suppress stderr writes for jsdom errors
	originalStderrWrite = process.stderr.write;
	process.stderr.write = ((
		chunk: string | Uint8Array,
		...args: unknown[]
	): boolean => {
		const message = String(chunk);
		// Suppress jsdom error stack traces
		if (
			message.includes("Error: Uncaught") ||
			message.includes("at reportException") ||
			message.includes("useToggle must be used within")
		) {
			return true;
		}
		return originalStderrWrite.call(process.stderr, chunk, ...args);
	}) as typeof process.stderr.write;
});

afterAll(() => {
	console.error = originalConsoleError;
	process.stderr.write = originalStderrWrite;
});
