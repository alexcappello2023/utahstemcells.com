import { glob } from 'astro/loaders';
import { defineCollection, reference, z } from 'astro:content';

// SEO fields shared by every content type
const seo = {
	title: z.string(), // <title> / H1
	metaTitle: z.string().optional(), // override for <title> if different from H1
	description: z.string(), // meta description
	slug: z.string().optional(),
	draft: z.boolean().default(false),
	updated: z.coerce.date().optional(),
};

// Trattamenti — /treatments/[slug]/
const treatments = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/treatments' }),
	schema: ({ image }) =>
		z.object({
		...seo,
		category: z.enum([
			'regenerative',
			'hair-restoration',
			'sexual-wellness',
			'hormones',
			'aesthetics',
			'body-contouring',
			'weight-loss',
			'iv-therapy',
			'ketamine',
			'peptides',
		]),
		summary: z.string(), // frase breve per card e hub
		// Landing-page fields (opzionali → propagabili a tutte le schede)
		usp: z.string().optional(), // promessa/differenziante sotto l'H1 (above the fold)
		image: image().optional(), // immagine hero rappresentativa (ottimizzata)
		imageAlt: z.string().optional(), // testo alternativo dell'immagine hero
		videoUrl: z.string().optional(), // embed video (es. YouTube) — slot futuro
		faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
		// interlink del cluster
		conditions: z.array(reference('conditions')).default([]),
		relatedTreatments: z.array(reference('treatments')).default([]),
		order: z.number().default(50),
	}),
});

// Patologie — /conditions/[slug]/
const conditions = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/conditions' }),
	schema: ({ image }) =>
		z.object({
			...seo,
			summary: z.string(),
			// Landing-page fields (come i treatments)
			usp: z.string().optional(),
			image: image().optional(),
			imageAlt: z.string().optional(),
			videoUrl: z.string().optional(),
			faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
			treatments: z.array(reference('treatments')).default([]),
			order: z.number().default(50),
		}),
});

// Città / aree servite — /locations/[slug]/
const locations = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/locations' }),
	schema: z.object({
		...seo,
		city: z.string(),
		region: z.string().default('Utah'),
		driveTime: z.string(), // es. "12 minutes from our Sandy clinic"
		direction: z.string().optional(), // es. "west of Sandy"
		isPrimary: z.boolean().default(false), // sede fisica
		featuredTreatments: z.array(reference('treatments')).default([]),
		order: z.number().default(50),
	}),
});

// Blog — /blog/[slug]/
const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		...seo,
		pubDate: z.coerce.date(),
		author: z.string().default('Dr. William Cimikoski'),
		hero: z.string().optional(),
		relatedTreatments: z.array(reference('treatments')).default([]),
		relatedConditions: z.array(reference('conditions')).default([]),
	}),
});

export const collections = { treatments, conditions, locations, blog };
