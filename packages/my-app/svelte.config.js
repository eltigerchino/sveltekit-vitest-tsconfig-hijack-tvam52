import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// Change this to potentially cache-bust when running in `dev` mode to force a
// rebuild of `.svelte-kit/tsconfig.json`.
const CACHE_BUST = '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      $myAlias: 'src/myAlias' + CACHE_BUST,
    },
  },
};

export default config;
