import { NextResponse } from "next/server";

// Mock database of available surplus (in production, this comes from Supabase/Neon)
const availableListings = [
  {
    id: "1",
    title: "صلصة ناكيبا",
    businessName: "مصنع الذهب",
    quantityKg: 2000,
    pricePerKg: 18,
    city: "الرياض",
    expiryMonths: 14,
    category: "صلصات",
  },
  {
    id: "2",
    title: "فائض زيوت",
    businessName: "معمل النخيل",
    quantityKg: 800,
    pricePerKg: 22,
    city: "جدة",
    expiryMonths: 8,
    category: "زيوت",
  },
  {
    id: "3",
    title: "تابلعات متنوعة",
    businessName: "مستودع الأمين",
    quantityKg: 5000,
    pricePerKg: 4.5,
    city: "الدمام",
    expiryMonths: 18,
    category: "تابلعات",
  },
  {
    id: "4",
    title: "عصائر طازجة",
    businessName: "مصنع الفواكه",
    quantityKg: 1500,
    pricePerKg: 12,
    city: "الرياض",
    expiryMonths: 6,
    category: "مشروبات",
  },
];

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "يرجى إدخال طلب صالح" },
        { status: 400 }
      );
    }

    // Simple keyword-based matching (replace with LLM API call in production)
    const normalizedQuery = query.toLowerCase().trim();
    const matchedListings = availableListings.filter((listing) => {
      const titleMatch = listing.title.includes(normalizedQuery);
      const categoryMatch = listing.category.includes(normalizedQuery);
      const businessMatch = listing.businessName.includes(normalizedQuery);
      const cityMatch = listing.city.includes(normalizedQuery);

      // Also match partial keywords for better UX
      const queryWords = normalizedQuery.split(/\s+/);
      const wordMatch = queryWords.some(
        (word) =>
          listing.title.includes(word) ||
          listing.category.includes(word) ||
          listing.city.includes(word)
      );

      return titleMatch || categoryMatch || businessMatch || cityMatch || wordMatch;
    });

    // If no exact matches, return all listings as fallback
    const results = matchedListings.length > 0 ? matchedListings : availableListings;

    return NextResponse.json({
      success: true,
      query,
      matchesCount: results.length,
      listings: results,
      message:
        results.length > 0
          ? `تم العثور على ${results.length} نتيجة مطابقة لطلبك`
          : "لم يتم العثور على نتائج مطابقة، إليك جميع المنتجات المتاحة",
    });
  } catch (error) {
    console.error("AI Match Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء معالجة الطلب" },
      { status: 500 }
    );
  }
}