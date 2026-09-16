import { NextResponse } from "next/server";

type Block = { x: number; y: number; w: number; h: number };
type Reservation = Block & { id: string; email: string; expiresAt: number };

const SOLD: Block[] = [
  { x: 2, y: 3, w: 13, h: 9 }, { x: 17, y: 5, w: 9, h: 13 },
  { x: 29, y: 2, w: 17, h: 8 }, { x: 49, y: 4, w: 12, h: 14 },
  { x: 64, y: 2, w: 20, h: 10 }, { x: 87, y: 5, w: 10, h: 17 },
  { x: 5, y: 24, w: 18, h: 15 }, { x: 26, y: 20, w: 11, h: 18 },
  { x: 40, y: 22, w: 22, h: 12 }, { x: 66, y: 20, w: 14, h: 18 },
  { x: 83, y: 26, w: 12, h: 12 }, { x: 3, y: 43, w: 10, h: 18 },
  { x: 16, y: 42, w: 21, h: 11 }, { x: 40, y: 39, w: 13, h: 20 },
  { x: 57, y: 42, w: 19, h: 13 }, { x: 80, y: 41, w: 17, h: 19 }
];

const reservations: Reservation[] = [];
const TTL_MS = 10 * 60 * 1000;

function overlaps(a: Block, b: Block) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function isAvailable(block: Block) {
  return ![...SOLD, ...reservations.filter(r => r.expiresAt > Date.now())].some(existing => overlaps(block, existing));
}

function validBlock(block: Block) {
  return Number.isInteger(block.x) && Number.isInteger(block.y) && Number.isInteger(block.w) && Number.isInteger(block.h)
    && block.w >= 1 && block.h >= 1 && block.w <= 25 && block.h <= 25
    && block.x >= 0 && block.y >= 0 && block.x + block.w <= 100 && block.y + block.h <= 100;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const block: Block = { x: Number(body.x), y: Number(body.y), w: Number(body.w), h: Number(body.h) };
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!validBlock(block) || !email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: "Invalid block or email." }, { status: 400 });
    }

    if (!isAvailable(block)) {
      return NextResponse.json({ error: "That pixel area is no longer available. Please choose another area." }, { status: 409 });
    }

    const reservation: Reservation = {
      ...block,
      email,
      id: crypto.randomUUID(),
      expiresAt: Date.now() + TTL_MS
    };
    reservations.push(reservation);

    return NextResponse.json({
      id: reservation.id,
      block,
      price: block.w * block.h,
      expiresAt: reservation.expiresAt
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}

export async function GET() {
  const now = Date.now();
  for (let i = reservations.length - 1; i >= 0; i--) {
    if (reservations[i].expiresAt <= now) reservations.splice(i, 1);
  }
  return NextResponse.json({ reservations: reservations.map(({ id, x, y, w, h, expiresAt }) => ({ id, x, y, w, h, expiresAt })) });
}
