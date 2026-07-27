// Deploy INCREMENTALE del sito statico (dist/) sull'hosting via FTP/FTPS.
// Carica solo i file NUOVI o CAMBIATI: quelli già presenti sul server con la
// stessa dimensione vengono saltati. NON cancella i file remoti.
//
// Credenziali in .env (vedi .env.example) o nei secret GitHub. NON committare .env.
// Uso:  npm run build && node scripts/deploy-ftp.mjs   (oppure: npm run deploy)

import 'dotenv/config';
import { Client } from 'basic-ftp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import path from 'node:path';
import { readdir, stat } from 'node:fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const {
	FTP_HOST,
	FTP_USER,
	FTP_PASSWORD,
	FTP_PORT = '21',
	FTP_SECURE = 'true',
	FTP_REMOTE_DIR = '/',
} = process.env;

if (!FTP_HOST || !FTP_USER || !FTP_PASSWORD) {
	console.error('Mancano FTP_HOST, FTP_USER o FTP_PASSWORD. Compila .env (vedi .env.example) o i secret.');
	process.exit(1);
}

const ROOT = FTP_REMOTE_DIR.replace(/\/+$/, ''); // senza slash finale ('' = root)

async function localFiles(dir, prefix = '', out = []) {
	for (const e of await readdir(dir, { withFileTypes: true })) {
		const rel = prefix ? `${prefix}/${e.name}` : e.name;
		const full = join(dir, e.name);
		if (e.isDirectory()) await localFiles(full, rel, out);
		else out.push({ rel, full, size: (await stat(full)).size });
	}
	return out;
}

async function remoteIndex(client, dir, prefix = '', map = new Map()) {
	let list;
	try { list = await client.list(dir); } catch { return map; }
	for (const item of list) {
		const rel = prefix ? `${prefix}/${item.name}` : item.name;
		if (item.isDirectory) await remoteIndex(client, `${dir}/${item.name}`, rel, map);
		else map.set(rel, item.size);
	}
	return map;
}

const client = new Client(30_000);
client.ftp.verbose = false;

try {
	await client.access({
		host: FTP_HOST,
		port: Number(FTP_PORT),
		user: FTP_USER,
		password: FTP_PASSWORD,
		secure: FTP_SECURE === 'true',
		secureOptions: { rejectUnauthorized: false },
	});

	const startDir = ROOT || '/';
	await client.ensureDir(startDir);
	console.log(`Connesso a ${FTP_HOST}. Confronto con ${startDir} ...`);

	const remote = await remoteIndex(client, startDir);
	const files = await localFiles(DIST);

	const ensured = new Set();
	let uploaded = 0, skipped = 0, bytes = 0;
	for (const f of files) {
		if (remote.get(f.rel) === f.size) { skipped++; continue; }
		const remotePath = `${ROOT}/${f.rel}`;
		const parent = path.posix.dirname(remotePath);
		if (!ensured.has(parent)) { await client.ensureDir(parent); ensured.add(parent); }
		await client.uploadFrom(f.full, remotePath);
		uploaded++; bytes += f.size;
	}

	console.log(`✓ Deploy incrementale completato: ${uploaded} file caricati, ${skipped} invariati saltati (${(bytes / 1024).toFixed(0)} KB trasferiti).`);
} catch (err) {
	console.error('✗ Deploy fallito:', err.message);
	process.exitCode = 1;
} finally {
	client.close();
}
