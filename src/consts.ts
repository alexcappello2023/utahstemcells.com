// Central business info (NAP) — used across pages, footer and schema.
// TODO: verificare indirizzo/telefono esatti con il cliente prima del go-live.
export const SITE = {
	name: 'Utah Stem Cells',
	brandLine: 'Utah Stem Cells & USC MedSpa',
	url: 'https://utahstemcells.com',
	tagline: 'Regenerative medicine & aesthetics in Sandy, Utah',
	phone: '(801) 231-2360',
	phoneHref: '+18012312360',
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
	doctor: 'Dr. William Cimikoski',
	social: {} as Record<string, string>,
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
