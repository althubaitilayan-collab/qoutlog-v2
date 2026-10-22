"use client";

import { LanguageThemeSwitcher } from "../components/LanguageThemeSwitcher";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight, Heart, CheckCircle } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Qout Logo" width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
            <span className="text-xl font-bold text-gray-900">قوت</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageThemeSwitcher />
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowRight className="w-4 h-4 ml-2" /> الرئيسية
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Center Content */}
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>

          {/* Main Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-6 leading-relaxed">
            طلبك وصل
          </h1>

          <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
            بنك الطعام يشكرك على إحسانك
          </p>

          {/* Heart Icon */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <Heart className="w-6 h-6 text-red-400 fill-red-400" />
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
          </div>

          {/* Additional Message */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
            <p className="text-green-800 text-lg">
              مساهمتك تساعد في إطعام المحتاجين وتقليل الهدر الغذائي
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <Link href="/">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 text-lg">
                العودة للرئيسية
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-3 text-lg">
                تصفح السوق
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}