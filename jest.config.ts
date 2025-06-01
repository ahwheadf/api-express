// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	preset: 'ts-jest',
	testMatch: ['**/*.spec.ts'], // Запускаем только TS-тесты
	modulePathIgnorePatterns: ['<rootDir>/dist/'], // Игнорируем скомпилированные файлы
};

export default config;
