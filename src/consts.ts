// Central business info (NAP) — used across pages, footer and schema.
// TODO: verificare indirizzo/telefono esatti con il cliente prima del go-live.
export const SITE = {
	name: 'Utah Stem Cells',
	brandLine: 'Utah Stem Cells & USC MedSpa',
	url: 'https://utahstemcells.com',
	tagline: 'Regenerative medicine & aesthetics in Sandy, Utah',
	phone: '(801) 999-4860',
	phoneHref: '+18019994860',
	fax: '(801) 948-4120',
	email: 'info@utahstemcells.com',
	// Sistema di prenotazione online (scheduler esterno)
	bookingUrl: 'https://d2oe0ra32qx05a.cloudfront.net/?practiceKey=k_1_60294',
	address: {
		street: '9980 S 300 W, Suite 150',
		city: 'Sandy',
		region: 'UT',
		postal: '84070',
		country: 'US',
	},
	geo: { lat: 40.5651, lng: -111.9016 },
	hours: {
		display: 'Monday – Friday: 10:00 AM – 6:00 PM',
		closed: 'Saturday & Sunday: Closed',
		schema: ['Mo-Fr 10:00-18:00'],
	},
	doctor: 'Dr. William Cimikoski',
	social: {
		facebook: 'https://www.facebook.com/UTAHSTEMCELLS/',
		instagram: 'https://www.instagram.com/utahstemcells/',
		youtube: 'https://www.youtube.com/channel/UCC5KEPKF3aCg563rMpEngzQ',
	} as Record<string, string>,
};

export const NAV = [
	{ label: 'Treatments', href: '/treatments/' },
	{ label: 'Conditions', href: '/conditions/' },
	{ label: 'Locations', href: '/locations/' },
	{ label: 'About', href: '/about/' },
	{ label: 'Reviews', href: '/reviews/' },
	{ label: 'Blog', href: '/blog/' },
];

export const TREATMENT_CATEGORIES: Record<string, string> = {
	regenerative: 'Regenerative medicine',
	'hair-restoration': 'Hair restoration',
	'sexual-wellness': 'Sexual wellness',
	hormones: 'Hormone optimization',
	aesthetics: 'Medical aesthetics',
	'body-contouring': 'Body contouring & skin tightening',
	'weight-loss': 'Medical weight loss',
	'iv-therapy': 'IV therapy & wellness',
	ketamine: 'Ketamine therapy',
};
