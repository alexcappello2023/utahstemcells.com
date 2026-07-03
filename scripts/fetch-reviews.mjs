// Fetches Google reviews at build/refresh time via the Places API (New)
// and writes them to src/data/reviews.json (committed, used by /reviews/).
// Run: npm run fetch-reviews   (reads .env: GOOGLE_MAPS_API_KEY, GOOGLE_PLACE_ID)
import { writeFileSync } from 'node:fs';

const KEY = process.env.GOOGLE_MAPS_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

if (!KEY || !PLACE_ID) {
	console.error('✗ Missing GOOGLE_MAPS_API_KEY or GOOGLE_PLACE_ID in .env');
	process.exit(1);
}

const res = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
	headers: {
		'X-Goog-Api-Key': KEY,
		'X-Goog-FieldMask': 'displayName,rating,userRatingCount,googleMapsUri,reviews',
	},
});
const data = await res.json();

if (!res.ok) {
	console.error('✗ Places API error:', JSON.stringify(data, null, 2));
	process.exit(1);
}

const out = {
	placeName: data.displayName?.text ?? 'Utah Stem Cells',
	placeUrl: data.googleMapsUri ?? '',
	rating: data.rating ?? 0,
	total: data.userRatingCount ?? 0,
	fetchedAt: new Date().toISOString().slice(0, 10),
	reviews: (data.reviews ?? []).map((r) => ({
		author: r.authorAttribution?.displayName ?? 'Google user',
		photo: r.authorAttribution?.photoUri ?? '',
		profileUrl: r.authorAttribution?.uri ?? '',
		rating: r.rating ?? 5,
		text: (r.text?.text ?? r.originalText?.text ?? '').trim(),
		when: r.relativePublishTimeDescription ?? '',
		reviewUrl: r.googleMapsUri ?? r.authorAttribution?.uri ?? '',
	})),
};

writeFileSync(
	new URL('../src/data/reviews.json', import.meta.url),
	JSON.stringify(out, null, 2) + '\n'
);
console.log(
	`✓ Saved ${out.reviews.length} reviews — ${out.rating}★ from ${out.total} ratings.`
);
