import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Fetch all listings for the Marketplace
export async function GET() {
  try {
    const listings = await prisma.foodListing.findMany({
      include: {
        business: true, // Include business name
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(listings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
  }
}

// POST: Create a new listing from the Supplier Dashboard
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, quantity, expiry, description, imageUrl } = body;

    // For this demo, we automatically find or create a default business to link the food to
    let business = await prisma.business.findFirst();
    
    if (!business) {
      const user = await prisma.user.create({
        data: {
          email: "demo@qout.com",
          name: "Demo Supplier",
          role: "SUPPLIER",
        },
      });
      business = await prisma.business.create({
        data: {
          userId: user.id,
          businessName: "Qout Demo Bakery",
          address: "123 Main Street",
        },
      });
    }

    const listing = await prisma.foodListing.create({
      data: {
        title: title,
        quantityKg: parseFloat(quantity),
        expiryDate: new Date(expiry),
        description: description || "",
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800",
        businessId: business.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
  }
}