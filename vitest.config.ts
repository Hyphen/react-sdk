import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'jsdom',
		coverage: {
			reporter: ['text', 'json', 'lcov'],
			exclude: [
				'dist/**',
				'vitest.config.ts',
				'tsup.config.ts',
				'src/types.ts',
			],
		},
	},
});
