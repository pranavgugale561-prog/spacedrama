import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the file path safely
const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'leads.json');

// Helper to ensure data directory and file exist
function initializeStorage() {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        initializeStorage();

        const dbData = fs.readFileSync(FILE_PATH, 'utf-8');
        const leads = JSON.parse(dbData);

        const newLead = {
            id: Date.now().toString(),
            name: body.name,
            business: body.business || '',
            phone: body.phone,
            area: body.area,
            budget: body.budget || '',
            services: body.services,
            type: body.type || 'cart',
            status: 'New',
            timestamp: new Date().toISOString()
        };

        leads.push(newLead);
        fs.writeFileSync(FILE_PATH, JSON.stringify(leads, null, 2));

        return NextResponse.json({ success: true, lead: newLead });
    } catch (error) {
        console.error('Lead sync failed:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function GET() {
    try {
        initializeStorage();
        const dbData = fs.readFileSync(FILE_PATH, 'utf-8');
        const leads = JSON.parse(dbData);

        // Return sorted newest first
        leads.sort((a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

        return NextResponse.json(leads);
    } catch (error) {
        console.error('Lead fetch failed:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { id, status } = await req.json();
        initializeStorage();

        const dbData = fs.readFileSync(FILE_PATH, 'utf-8');
        const leads = JSON.parse(dbData);

        const updated = leads.map((l: any) => l.id === id ? { ...l, status } : l);
        fs.writeFileSync(FILE_PATH, JSON.stringify(updated, null, 2));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Lead patch failed:', error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
