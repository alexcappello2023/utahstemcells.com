// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://utahstemcells.com',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-sans',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600],
			styles: ['normal'],
		},
		{
			provider: fontProviders.google(),
			name: 'Manrope',
			cssVariable: '--font-display',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [500, 600, 700],
			styles: ['normal'],
		},
	],
});
