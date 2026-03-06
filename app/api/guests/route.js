import { neon } from '@neondatabase/serverless';
import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT * FROM guests ORDER BY created_at DESC`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Failed to fetch guests', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');
    const name = formData.get('name');
    const bio = formData.get('bio');
    const answers = formData.get('answers');

    if (!image || !name || !bio || !answers) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // Upload image to Vercel Blob
    const blob = await put(image.name, image, { access: 'public' });

    // Save to Neon Postgres
    const sql = neon(process.env.DATABASE_URL);
    await sql`
      INSERT INTO guests (name, bio, answers, image_url)
      VALUES (${name}, ${bio}, ${answers}, ${blob.url})
    `;

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    console.error('Failed to save guest', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
