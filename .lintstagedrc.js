export default {
  'apps/web/**/*.{ts,tsx,js,jsx}': (files) => {
    const relativeFiles = files.map((f) => f.replace(/.*\/apps\/web\//, ''));
    return [
      `prettier --write ${files.join(' ')}`,
      `pnpm --filter web exec eslint --fix ${relativeFiles.join(' ')}`,
    ];
  },
  'apps/api/**/*.{ts,js}': (files) => {
    const relativeFiles = files.map((f) => f.replace(/.*\/apps\/api\//, ''));
    return [
      `prettier --write ${files.join(' ')}`,
      `pnpm --filter api exec eslint --fix ${relativeFiles.join(' ')}`,
    ];
  },
  '*.{json,md,yml,yaml}': 'prettier --write',
};
