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
		street: '10121 S 1300 E',
		city: 'Sandy',
		region: 'UT',
		postal: '84094',
		country: 'US',
	},
	geo: { lat: 40.5726, lng: -111.855 },
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
	'sexual-health': 'Sexual health',
	'hormones-wellness': 'Hormones & wellness',
	'iv-therapy': 'IV therapy',
	'weight-loss': 'Weight loss',
	aesthetics: 'Aesthetics & MedSpa',
};
