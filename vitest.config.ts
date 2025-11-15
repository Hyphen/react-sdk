import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		environment: 'happy-dom',
		setupFiles: ['./test/setup.ts'],
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
