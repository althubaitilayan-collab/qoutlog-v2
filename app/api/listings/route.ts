import { NextResponse } from "next/server";

// Mock data for demo (since SQLite doesn't work on Vercel)
const mockListings = [
  {
    id: "1",
    title: "Fresh Bread",
    quantityKg: 5,
    expiryDate: "2026-10-20T10:00:00Z",
    description: "Freshly baked croissants from this morning.",
    imageUrl: "",
    business: {
      businessName: "Qout Demo Bakery",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Grilled Chicken Meals",
    quantityKg: 8,
    expiryDate: "2026-10-19T20:00:00Z",
    description: "Prepared meals ready for pickup.",
    imageUrl: "",
    business: {
      businessName: "City Grill House",
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Assorted Vegetables",
    quantityKg: 25,
    expiryDate: "2026-10-21T18:00:00Z",
    description: "Mixed vegetables, slightly imperfect but perfectly good.",
    imageUrl: "",
    business: {
      businessName: "Green Grocers",
    },
    createdAt: new Date().toISOString(),
  },
];

// GET: Return mock listings
export async function GET() {
  return NextResponse.json(mockListings);
}

// POST: Accept new listings (stored in memory only - resets on redeploy)
let dynamicListings: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, quantity, expiry, description } = body;

    const newListing = {
      id: String(Date.now()),
      title: title,
      quantityKg: parseFloat(quantity),
      expiryDate: expiry,
      description: description || "No description provided.",
      imageUrl: "",
      business: {
        businessName: "Qout Demo Bakery",
      },
      createdAt: new Date().toISOString(),
    };

    dynamicListings = [newListing, ...dynamicListings];

    return NextResponse.json(newListing);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}