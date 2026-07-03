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

// Menu label + keyword-rich, persuasive `title` attribute for each treatment
// (used in the Treatments mega-menu). Keyword up front for SEO, benefit +
// soft invitation to click for the user.
export const TREATMENT_LINKS: Record<string, { label: string; title: string }> = {
	'stem-cell-joint-regeneration': {
		label: 'Stem Cell Joint Regeneration',
		title: 'Stem cell joint regeneration in Utah — non-surgical relief for knees, shoulders, hips and back. Discover a path beyond surgery.',
	},
	'prp-joint-treatment': {
		label: 'PRP Joint Treatment',
		title: 'PRP joint injections in Utah — harness your own platelets to calm joint pain and support natural repair.',
	},
	'iv-stem-cell-therapy': {
		label: 'IV Stem Cell Therapy',
		title: 'IV stem cell therapy in Utah — whole-body regenerative support delivered intravenously. Explore the benefits.',
	},
	'hair-restoration': {
		label: 'Hair Restoration',
		title: 'PRP and stem cell hair restoration in Utah — regrow thinning hair naturally, without a transplant. See how it works.',
	},
	'p-shot': {
		label: 'P-Shot',
		title: "The P-Shot in Utah — a discreet, regenerative boost for men's performance and confidence. Learn more.",
	},
	'o-shot': {
		label: 'O-Shot',
		title: "The O-Shot in Utah — a natural, regenerative approach to women's intimate wellness. Discover the treatment.",
	},
	gainswave: {
		label: 'GAINSWave Therapy',
		title: "GAINSWave therapy in Utah — non-invasive acoustic-wave treatment for men's performance. No needles, no downtime.",
	},
	'votiva-femtite': {
		label: 'Votiva / FemTite',
		title: "Votiva and FemTite in Utah — gentle radiofrequency for women's intimate comfort and confidence.",
	},
	'penile-enhancement': {
		label: 'Penile Enhancement',
		title: 'Penile enhancement in Utah — a discreet, physician-performed procedure. Book a private consultation.',
	},
	'hormone-pellet-therapy': {
		label: 'Hormone Pellet Therapy',
		title: 'Hormone pellet therapy in Utah for men and women — steady energy, mood and vitality. Rebalance naturally.',
	},
	botox: {
		label: 'Botox & Jeuveau',
		title: 'Botox and Jeuveau in Utah — smooth fine lines and wrinkles for a refreshed, natural look. Book your visit.',
	},
	'dermal-fillers': {
		label: 'Dermal Fillers',
		title: 'Dermal fillers in Utah — restore volume to cheeks and lips for natural facial contours. Explore your options.',
	},
	sculptra: {
		label: 'Sculptra',
		title: 'Sculptra in Utah — stimulate your own collagen for gradual, natural-looking volume. See the difference.',
	},
	kybella: {
		label: 'Kybella (Double-Chin)',
		title: 'Kybella in Utah — dissolve stubborn under-chin fat without surgery. Refine your profile.',
	},
	morpheus8: {
		label: 'Morpheus8',
		title: 'Morpheus8 in Utah — microneedling with radiofrequency to firm and tighten skin. Reveal smoother skin.',
	},
	microneedling: {
		label: 'Microneedling',
		title: 'Microneedling in Utah — stimulate natural skin renewal for smoother tone and texture. Learn more.',
	},
	'vampire-facial': {
		label: 'Vampire Facial',
		title: 'Vampire Facial in Utah — microneedling plus your own PRP for a radiant glow. Book your treatment.',
	},
	'ipl-photofacial': {
		label: 'IPL Photofacial',
		title: 'IPL photofacial in Utah — fade sun damage and even your complexion with light therapy.',
	},
	'facetite-bodytite': {
		label: 'FaceTite & BodyTite',
		title: 'FaceTite and BodyTite in Utah — minimally invasive skin tightening for face and body. Firm up without surgery.',
	},
	'rf-body-contouring': {
		label: 'RF Body Contouring',
		title: 'Radiofrequency body contouring in Utah — tighten and refine the abdomen, arms and thighs.',
	},
	liposuction: {
		label: 'Liposuction',
		title: 'Liposuction with skin tightening in Utah — sculpt away stubborn fat for a smoother contour.',
	},
	'fat-transfer': {
		label: 'Fat Transfer',
		title: 'Fat transfer in Utah — use your own fat to naturally enhance volume and shape. Explore the procedure.',
	},
	'medical-weight-loss': {
		label: 'Medical Weight Loss',
		title: 'Medically supervised weight loss in Utah — a physician-guided plan for lasting, healthy results.',
	},
	'iv-therapy': {
		label: 'IV Therapy — overview',
		title: 'IV therapy in Utah — vitamin drips, NAD+ and wellness infusions for energy, immunity and recovery.',
	},
	'iv-therapy/nad': {
		label: 'NAD+ Infusions',
		title: 'NAD+ IV infusions in Utah — recharge cellular energy, recovery and vitality. Discover the benefits.',
	},
	'iv-therapy/vitamin-infusions': {
		label: 'IV Vitamin Infusions',
		title: 'IV vitamin infusions in Utah — custom nutrient blends for hydration, immunity and wellness.',
	},
	'iv-therapy/vitamin-c': {
		label: 'IV Vitamin C',
		title: 'High-dose IV vitamin C in Utah — powerful immune and wellness support delivered intravenously.',
	},
	'wellness-injections': {
		label: 'Wellness Injections',
		title: 'Wellness injections in Utah — quick B12 and nutrient shots for energy and metabolism.',
	},
	'ketamine-therapy': {
		label: 'Ketamine Therapy',
		title: "Ketamine therapy in Utah — physician-supervised in-office sessions. Learn if it's right for you.",
	},
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

// Menu label + keyword-rich, persuasive `title` for each condition.
export const CONDITION_LINKS: Record<string, { label: string; title: string }> = {
	'knee-osteoarthritis': {
		label: 'Knee Osteoarthritis',
		title: 'Knee osteoarthritis treatment in Utah — reduce knee pain and improve mobility without surgery. See your options.',
	},
	osteoarthritis: {
		label: 'Osteoarthritis',
		title: 'Osteoarthritis treatment in Utah — non-surgical, regenerative relief for worn joints. Explore how we can help.',
	},
	'rheumatoid-arthritis': {
		label: 'Rheumatoid Arthritis',
		title: 'Rheumatoid arthritis support in Utah — regenerative options for joint comfort alongside your care.',
	},
	'shoulder-pain': {
		label: 'Shoulder Pain',
		title: 'Shoulder pain treatment in Utah — non-surgical, regenerative relief for injury and arthritis. Learn more.',
	},
	'hip-pain': {
		label: 'Hip Pain',
		title: 'Hip pain treatment in Utah — regenerative options to ease pain and restore mobility, no surgery.',
	},
	'back-pain': {
		label: 'Back Pain',
		title: 'Back pain treatment in Utah — non-surgical, regenerative care for chronic, spine-related pain.',
	},
	'neck-pain': {
		label: 'Neck Pain',
		title: 'Neck pain treatment in Utah — regenerative options to relieve stiffness and chronic discomfort.',
	},
	'joint-pain': {
		label: 'Joint Pain',
		title: 'Joint pain treatment in Utah — regenerative relief across knees, shoulders, hips and more.',
	},
	'sacroiliac-joint-dysfunction': {
		label: 'Sacroiliac (SI) Joint',
		title: 'Sacroiliac joint dysfunction treatment in Utah — target SI joint pain without surgery. Discover the approach.',
	},
	autism: {
		label: 'Autism',
		title: 'Regenerative medicine and autism in Utah — a physician-led, individualized evaluation. Learn what to expect.',
	},
	'multiple-sclerosis': {
		label: 'Multiple Sclerosis',
		title: 'Regenerative medicine and MS in Utah — physician-led, individualized care. Explore your options honestly.',
	},
	'cerebral-palsy': {
		label: 'Cerebral Palsy',
		title: 'Regenerative medicine and cerebral palsy in Utah — an individualized, physician-led evaluation. Learn more.',
	},
	'spinal-cord-injury': {
		label: 'Spinal Cord Injury',
		title: 'Regenerative medicine and spinal cord injury in Utah — careful, individualized physician evaluation.',
	},
	neuropathy: {
		label: 'Neuropathy',
		title: 'Regenerative options for neuropathy in Utah — physician-led care for nerve-related pain. Explore the approach.',
	},
	'heart-failure': {
		label: 'Heart Failure',
		title: 'Regenerative medicine and heart failure in Utah — physician-led, in coordination with your cardiac care.',
	},
	'autoimmune-conditions': {
		label: 'Autoimmune Conditions',
		title: 'Regenerative medicine and autoimmune conditions in Utah — individualized options alongside your care.',
	},
	'erectile-dysfunction': {
		label: 'Erectile Dysfunction',
		title: 'Erectile dysfunction treatment in Utah — discreet, physician-led options like the P-Shot and GAINSWave.',
	},
	'hair-loss': {
		label: 'Hair Loss',
		title: 'Hair loss treatment in Utah — natural, non-surgical PRP options for men and women. See how it works.',
	},
};
