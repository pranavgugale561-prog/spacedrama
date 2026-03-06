import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'prices.json');

// Default prices — matches AstroCart service IDs
const DEFAULT_PRICES: Record<string, string> = {
    "solar-1bhk": "₹4.5L",
    "supernova-2bhk": "₹8.5L",
    "galaxy-estate": "₹25L",
    "nebula-lighting": "₹35K",
    "cosmic-office": "₹80K",
    "astro-vastu": "₹11K",
    "stardust-walls": "₹45K",
    "celestial-upholstery": "₹25K",
    "final-frontier": "₹8K",
    "turnkey-projects": "₹12L",
    "smart-home": "₹1.5L",
    "civil-structural": "₹2.5L",
    "landscape-balcony": "₹40K",
    "commercial": "₹6L",
};

function initStorage(): Record<string, string> {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify(DEFAULT_PRICES, null, 2));
        return DEFAULT_PRICES;
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
}

export async function GET() {
    try {
        const prices = initStorage();
        return NextResponse.json(prices);
    } catch {
        return NextResponse.json(DEFAULT_PRICES);
    }
}

export async function PATCH(req: Request) {
    try {
        const updates: Record<string, string> = await req.json();
        const prices = initStorage();
        const merged = { ...prices, ...updates };
        fs.writeFileSync(FILE_PATH, JSON.stringify(merged, null, 2));
        return NextResponse.json({ success: true, prices: merged });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Failed to update prices' }, { status: 500 });
    }
}
