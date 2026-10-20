"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "../components/LanguageThemeSwitcher";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Leaf, MapPin, Clock, ArrowLeft, Package, Apple, Wheat, Carrot, Search, Sparkles } from "lucide-react";
import { useState } from "react";

interface Listing {
  id: string;
  title: string;
  quantityKg: number;
  pricePerKg?: number;
  expiryDate?: string;
  expiryMonths?: number;
  description?: string;
  imageUrl?: string;
  business: {
    businessName: string;
  };
  businessName?: string;
  city?: string;
  category?: string;
}

const foodIcons: Record<string, React.ElementType> = {
  صلصات: Apple,
  زيوت: Wheat,
  تابلعات: Carrot,
  مشروبات: Leaf,
  default: Package,
};

export default function MarketplacePage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [listings, setListings] = useState<Listing[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [matchMessage, setMatchMessage] = useState("");

  const handleAISearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setHasSearched(true);
    try {
      const response = await fetch("/api/ai-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await response.json();
      if (data.success) {
        setListings(data.listings);
        setMatchMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const getIconForListing = (listing: Listing) => {
    if (listing.category && foodIcons[listing.category]) return foodIcons[listing.category];
    return foodIcons.default;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header - Fixed */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Qout Logo" width="40" height="40" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/stats">
              <Button variant="outline" size="sm">الإحصائيات</Button>
            </Link>
            <LanguageThemeSwitcher />
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" /> الرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* AI Search Hero */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h1 className="text-3xl font-bold">مساعد قوت الذكي</h1>
          </div>
          <p className="text-teal-100 mb-8 text-lg">
            اكتب طلبك بالعربية الطبيعية — المساعد يفهم ويبحث عن المورد المناسب تلقائياً
          </p>
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAISearch()}
              placeholder="مثال: أحتاج 500 كجم صلصة من الرياض"
              className="w-full px-6 py-4 pr-12 rounded-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-transparent focus:border-teal-400 focus:outline-none text-lg shadow-lg"
              dir="rtl"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
            <Button
              onClick={handleAISearch}
              disabled={isSearching || !searchQuery.trim()}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg"
            >
              {isSearching ? "جاري البحث..." : "ابحث"}
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="text-teal-200">أمثلة:</span>
            {["أحتاج 500 كجم صلصة", "فائض زيوت للبيع", "تابلعات بكميات كبيرة"].map((example) => (
              <button
                key={example}
                onClick={() => { setSearchQuery(example); handleAISearch(); }}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {hasSearched && (
          <div className="mb-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              {matchMessage}
            </p>
          </div>
        )}

        {!hasSearched ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">ابدأ البحث الذكي</h3>
            <p className="text-gray-500">اكتب ما تحتاجه بالعربية وسنجد لك أفضل الموردين</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500 mb-6">جرب كلمات مختلفة</p>
            <Button onClick={() => { setSearchQuery(""); setHasSearched(false); }} className="bg-teal-600 hover:bg-teal-700 text-white">
              بحث جديد
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((item) => {
              const IconComponent = getIconForListing(item);
              return (
                <div key={item.id} className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-32 bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-teal-950 dark:to-emerald-950 flex items-center justify-center">
                    <IconComponent className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-base">{item.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span>{item.businessName || item.business?.businessName}</span>
                      {item.city && <span className="mx-1">• {item.city}</span>}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-teal-600" /> {item.quantityKg} كجم
                      </span>
                      {item.pricePerKg && (
                        <span className="text-amber-600 font-semibold">{item.pricePerKg} ر.س/كجم</span>
                      )}
                    </div>
                    <Link href="/checkout">
                      <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs py-2 h-9">
                        طلب شراء
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}