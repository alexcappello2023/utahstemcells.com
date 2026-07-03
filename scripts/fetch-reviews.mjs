// Fetches Google reviews (via Featurable, free — no Google Cloud billing) and
// writes them to src/data/reviews.json (used by /reviews/).
// Run: npm run fetch-reviews   (reads .env: FEATURABLE_WIDGET_ID)
import { writeFileSync } from 'node:fs';

const ID = process.env.FEATURABLE_WIDGET_ID;
if (!ID) {
	console.error('✗ Missing FEATURABLE_WIDGET_ID in .env');
	process.exit(1);
}

const ENDPOINT =
	process.env.FEATURABLE_API || `https://featurable.com/api/v1/widgets/${ID}`;

const res = await fetch(ENDPOINT, { headers: { accept: 'application/json' } });
const data = await res.json().catch(() => ({}));

if (!res.ok) {
	console.error(`✗ Featurable API error (${res.status}):`, JSON.stringify(data, null, 2));
	process.exit(1);
}

// tolerate a couple of response shapes
const w = data.widget ?? data;
const list = data.reviews ?? w.reviews ?? [];

const relTime = (iso) => {
	if (!iso) return '';
	const then = new Date(iso).getTime();
	const days = Math.round((Date.now() - then) / 86400000);
	if (days < 30) return days <= 1 ? 'recently' : `${days} days ago`;
	const months = Math.round(days / 30);
	if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
	const years = Math.round(months / 12);
	return `${years} year${years > 1 ? 's' : ''} ago`;
};

const reviews = list
	.map((r) => ({
		author: r.reviewer?.displayName ?? r.author ?? 'Google user',
		photo: r.reviewer?.profilePhotoUrl ?? '',
		profileUrl: r.reviewer?.profileUrl ?? '',
		rating: r.starRating ?? r.rating ?? 5,
		text: (r.comment ?? r.text ?? '').trim(),
		when: r.relativeTime ?? relTime(r.createTime ?? r.updateTime),
		reviewUrl: r.reviewUrl ?? '',
	}))
	.filter((r) => r.text.length > 0);

const rating =
	w.averageRating ??
	data.averageRating ??
	(reviews.length
		? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
		: 0);

const out = {
	placeName: w.name ?? 'Utah Stem Cells',
	placeUrl: w.googleUrl ?? w.url ?? '',
	rating,
	total: w.totalReviewCount ?? data.totalReviewCount ?? reviews.length,
	fetchedAt: new Date().toISOString().slice(0, 10),
	reviews,
};

writeFileSync(
	new URL('../src/data/reviews.json', import.meta.url),
	JSON.stringify(out, null, 2) + '\n'
);
console.log(`✓ Saved ${out.reviews.length} reviews — ${out.rating}★ from ${out.total} ratings.`);
