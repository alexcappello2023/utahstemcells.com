// Fetches Google reviews (via Featurable, free — no Google Cloud billing) and
// writes them to src/data/reviews.json (used by /reviews/).
// Run: npm run fetch-reviews   (reads .env: FEATURABLE_WIDGET_ID)
import { writeFileSync } from 'node:fs';

const ID = process.env.FEATURABLE_WIDGET_ID;
if (!ID) {
	console.error('✗ Missing FEATURABLE_WIDGET_ID in .env');
	process.exit(1);
}

const MAX_DISPLAY = 15; // how many reviews to show on the page

const res = await fetch(`https://api.featurable.com/v1/widgets/${ID}`, {
	headers: { accept: 'application/json' },
});
const data = await res.json().catch(() => ({}));

if (!res.ok || !data.success) {
	console.error(`✗ Featurable API error (${res.status}):`, JSON.stringify(data, null, 2));
	process.exit(1);
}

const relTime = (iso) => {
	if (!iso) return '';
	const days = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
	if (days < 30) return days <= 1 ? 'recently' : `${days} days ago`;
	const months = Math.round(days / 30);
	if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
	const years = Math.round(months / 12);
	return `${years} year${years > 1 ? 's' : ''} ago`;
};

const clean = (s) =>
	(s ?? '')
		.replace(/^[\s"“”']+/, '')
		.replace(/[\s"“”']+$/, '')
		.trim();

const reviews = (data.reviews ?? [])
	.filter((r) => clean(r.comment).length > 0)
	.slice(0, MAX_DISPLAY)
	.map((r) => ({
		author: r.reviewer?.displayName ?? 'Google user',
		photo: r.reviewer?.profilePhotoUrl ?? '',
		rating: r.starRating ?? 5,
		text: clean(r.comment),
		when: relTime(r.createTime ?? r.updateTime),
	}));

const out = {
	placeName: 'Utah Stem Cells',
	placeUrl: data.profileUrl ?? '',
	rating: Math.round((data.averageRating ?? 0) * 10) / 10,
	total: data.totalReviewCount ?? reviews.length,
	fetchedAt: new Date().toISOString().slice(0, 10),
	reviews,
};

writeFileSync(
	new URL('../src/data/reviews.json', import.meta.url),
	JSON.stringify(out, null, 2) + '\n'
);
console.log(`✓ Saved ${out.reviews.length} reviews — ${out.rating}★ from ${out.total} ratings.`);
