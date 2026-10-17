"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "../components/LanguageThemeSwitcher";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Leaf, MapPin, Clock, ArrowLeft, Package, Apple, Wheat, Carrot } from "lucide-react";
import { useState, useEffect } from "react";

interface Listing {
  id: string;
  title: string;
  quantityKg: number;
  expiryDate: string;
  description: string;
  imageUrl: string;
  business: {
    businessName: string;
  };
}

const foodIcons = [Apple, Wheat, Carrot, Leaf];

export default function MarketplacePage() {
  const { t } = useLanguage();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Fixed Switchers */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageThemeSwitcher />
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Qout Logo" 
              width="40"
              height="40"
              style={{ width: "40px", height: "40px", objectFit: "contain" }}
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold mb-2">{t("marketplace.title")}</h1>
          <p className="text-teal-100">{t("marketplace.subtitle")}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
            <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t("marketplace.noListings")}</h3>
            <p className="text-gray-500 mb-6 text-sm">{t("marketplace.checkBack")}</p>
            <Link href="/supplier/dashboard">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                Post Surplus Food
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((item, index) => {
              const IconComponent = foodIcons[index % foodIcons.length];
              return (
                <div 
                  key={item.id} 
                  className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Colored Icon Header */}
                  <div className="h-32 bg-gradient-to-br from-teal-50 to-emerald-100 dark:from-teal-950 dark:to-emerald-950 flex items-center justify-center">
                    <IconComponent className="w-12 h-12 text-teal-600 dark:text-teal-400" />
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-base">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
                      <MapPin className="w-3 h-3" /> 
                      <span>{item.business.businessName}</span>
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-3 line-clamp-2 h-8">
                      {item.description || "No description provided."}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <span className="flex items-center gap-1">
                        <Leaf className="w-3 h-3 text-teal-600" /> 
                        {item.quantityKg}kg
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-600" /> 
                        {new Date(item.expiryDate).toLocaleDateString()}
                      </span>
                    </div>

                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs py-2 h-9">
                      {t("marketplace.claimButton")}
                    </Button>
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