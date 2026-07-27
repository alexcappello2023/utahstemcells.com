// Central business info (NAP) — used across pages, footer and schema.
// TODO: verificare indirizzo/telefono esatti con il cliente prima del go-live.
export const SITE = {
	name: 'Utah Stem Cells',
	brandLine: 'Utah Stem Cells & USC MedSpa',
	url: 'https://utahstemcells.com',
	tagline: 'Regenerative medicine & aesthetics in Sandy, Utah',
	phone: '(801) 999-4860',
	phoneHref: '+18019994860',
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
	{ label: 'Contact', href: '/contact/' },
];

export const TREATMENT_CATEGORIES: Record<string, string> = {
	regenerative: 'Regenerative medicine',
	'hair-restoration': 'Hair restoration',
	'sexual-wellness': 'Sexual wellness',
	hormones: 'Hormone optimization',
	peptides: 'Peptide therapy',
	aesthetics: 'Medical aesthetics',
	'body-contouring': 'Body contouring & skin tightening',
	'weight-loss': 'Medical weight loss',
	'iv-therapy': 'IV therapy & wellness',
	ketamine: 'Ketamine therapy',
};

// Two macro-buckets for the Treatments mega-menu (à la "Repair / Refine"),
// each grouping its category sections. Keeps the menu organized into two
// scannable columns instead of one long flat list.
export const TREATMENT_BUCKETS: { label: string; categories: string[] }[] = [
	{
		label: 'Regenerative & Wellness',
		categories: [
			'regenerative',
			'hair-restoration',
			'sexual-wellness',
			'hormones',
			'peptides',
			'iv-therapy',
			'ketamine',
		],
	},
	{
		label: 'Aesthetics & Body',
		categories: ['aesthetics', 'body-contouring', 'weight-loss'],
	},
];

// Short menu label for each treatment (used in the Treatments mega-menu and
// hub cards). Labels can differ from the page H1 when a shorter menu wording
// reads better.
export const TREATMENT_LINKS: Record<string, string> = {
	'stem-cell-joint-regeneration': 'Stem Cell Joint Regeneration',
	'prp-joint-treatment': 'PRP Joint Treatment',
	'iv-stem-cell-therapy': 'IV Stem Cell Therapy',
	'hair-restoration': 'Hair Restoration',
	'p-shot': 'P-Shot',
	'o-shot': 'O-Shot',
	gainswave: 'GAINSWave Therapy',
	'votiva-femtite': 'Votiva / FemTite',
	'penile-enhancement': 'Penile Enhancement',
	'hormone-pellet-therapy': 'Hormone Pellet Therapy',
	'peptide-therapy': 'Peptide Therapy',
	botox: 'Botox & Jeuveau',
	'dermal-fillers': 'Dermal Fillers',
	'lip-fillers': 'Lip Fillers',
	sculptra: 'Sculptra',
	kybella: 'Kybella (Double-Chin)',
	morpheus8: 'Morpheus8',
	microneedling: 'Microneedling',
	'vampire-facial': 'Vampire Facial',
	'vampire-facelift': 'Vampire Face Lift',
	'ipl-photofacial': 'IPL Photofacial',
	'facetite-bodytite': 'FaceTite & BodyTite',
	'rf-body-contouring': 'RF Body Contouring',
	'cellulite-treatment': 'Cellulite Treatment',
	liposuction: 'Liposuction',
	'fat-transfer': 'Fat Transfer',
	'medical-weight-loss': 'Medical Weight Loss',
	'iv-therapy': 'IV Therapy — overview',
	'nad-iv-therapy': 'NAD+ IV Therapy',
	'iv-vitamin-infusions': 'IV Vitamin Infusions',
	'iv-vitamin-c-infusions': 'IV Vitamin C Infusions',
	'wellness-injections': 'Wellness Injections',
	'ketamine-therapy': 'Ketamine Therapy',
};

// Grouping for the Conditions mega-menu (conditions have no category field).
export const CONDITION_GROUPS: { label: string; slugs: string[] }[] = [
	{
		label: 'Joint & orthopedic',
		slugs: [
			'knee-osteoarthritis',
			'osteoarthritis',
			'rheumatoid-arthritis',
			'shoulder-pain',
			'hip-pain',
			'back-pain',
			'neck-pain',
			'joint-pain',
			'sacroiliac-joint-dysfunction',
		],
	},
	{
		label: 'Neurological',
		slugs: ['autism', 'multiple-sclerosis', 'cerebral-palsy', 'spinal-cord-injury', 'neuropathy'],
	},
	{
		label: 'Systemic & other',
		slugs: ['heart-failure', 'autoimmune-conditions', 'erectile-dysfunction', 'hair-loss'],
	},
];

// Short menu label for each condition (used in the Conditions mega-menu and hub).
export const CONDITION_LINKS: Record<string, string> = {
	'knee-osteoarthritis': 'Knee Osteoarthritis',
	osteoarthritis: 'Osteoarthritis',
	'rheumatoid-arthritis': 'Rheumatoid Arthritis',
	'shoulder-pain': 'Shoulder Pain',
	'hip-pain': 'Hip Pain',
	'back-pain': 'Back Pain',
	'neck-pain': 'Neck Pain',
	'joint-pain': 'Joint Pain',
	'sacroiliac-joint-dysfunction': 'Sacroiliac (SI) Joint',
	autism: 'Autism',
	'multiple-sclerosis': 'Multiple Sclerosis',
	'cerebral-palsy': 'Cerebral Palsy',
	'spinal-cord-injury': 'Spinal Cord Injury',
	neuropathy: 'Neuropathy',
	'heart-failure': 'Heart Failure',
	'autoimmune-conditions': 'Autoimmune Conditions',
	'erectile-dysfunction': 'Erectile Dysfunction',
	'hair-loss': 'Hair Loss',
};
