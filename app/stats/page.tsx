"use client";

import { LanguageThemeSwitcher } from "../components/LanguageThemeSwitcher";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight, Building2, Package, Target, MapPin, TrendingUp, Users, Leaf } from "lucide-react";

export default function StatsPage() {
  const mainStats = [
    { label: "منشأة مسجلة", value: "+40", icon: Building2, color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20" },
    { label: "طن فائض غذائي", value: "120", icon: Package, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "معدل المطابقة", value: "85%", icon: Target, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
    { label: "مدن مغطاة", value: "3", icon: MapPin, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  ];

  const cities = [
    { name: "الرياض", businesses: 18, surplus: "52 طن", icon: "🏙️" },
    { name: "جدة", businesses: 14, surplus: "41 طن", icon: "🌊" },
    { name: "الدمام", businesses: 8, surplus: "27 طن", icon: "🏭" },
  ];

  const businessTypes = [
    { type: "مصانع", count: 12, icon: "" },
    { type: "موردون", count: 10, icon: "🚛" },
    { type: "سوبرماركت", count: 9, icon: "🛒" },
    { type: "مطاعم", count: 7, icon: "️" },
    { type: "جمعيات خيرية", count: 5, icon: "🤝" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950" dir="rtl">
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <LanguageThemeSwitcher />
      </div>

      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Qout Logo" width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">قوت - الإحصائيات</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowRight className="w-4 h-4 ml-2" /> الرئيسية
            </Button>
          </Link>
        </div>
      </header>

      <div className="bg-gradient-to-r from-teal-600 to-teal-700 dark:from-teal-800 dark:to-teal-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
          <h1 className="text-4xl font-bold mb-3">إحصائيات منصة قوت</h1>
          <p className="text-teal-100 text-lg">أرقام حقيقية تعكس أثرنا في تقليل الهدر الغذائي</p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainStats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm text-center">
              <div className={`w-16 h-16 rounded-full ${stat.bg} flex items-center justify-center mx-auto mb-4`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</p>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-teal-600" /> تغطية المدن
            </h2>
            <div className="space-y-4">
              {cities.map((city, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{city.icon}</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{city.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{city.businesses} منشأة</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-teal-600">{city.surplus}</p>
                    <p className="text-xs text-gray-500">فائض متاح</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-teal-600" /> أنواع المنشآت
            </h2>
            <div className="space-y-4">
              {businessTypes.map((biz, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{biz.icon}</span>
                    <p className="font-bold text-gray-900 dark:text-white">{biz.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${(biz.count / 12) * 100}%` }}></div>
                    </div>
                    <span className="font-bold text-teal-600 w-8 text-left">{biz.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900/20 dark:to-emerald-900/20 rounded-xl border border-teal-200 dark:border-teal-800 p-8 text-center">
          <Leaf className="w-12 h-12 text-teal-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">أثرنا البيئي</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            كل كيلوغرام من الطعام الذي ننقذه يعني تقليل انبعاثات الكربون وتوفير الموارد. معاً نبني مستقبلاً أكثر استدامة.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div>
              <p className="text-3xl font-bold text-teal-600">240 طن</p>
              <p className="text-sm text-gray-500">CO₂ تم توفيره</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-600">1.2M لتر</p>
              <p className="text-sm text-gray-500">مياه تم توفيرها</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-600">500+</p>
              <p className="text-sm text-gray-500">وجبة تم إنقاذها</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}