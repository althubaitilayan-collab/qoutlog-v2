"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "../components/LanguageThemeSwitcher";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { Leaf, TrendingUp, Droplets, Award, ArrowLeft, Package, Clock } from "lucide-react";

export default function DashboardPage() {
  const { t } = useLanguage();

  const stats = [
    { label: t("dashboard.foodSaved"), value: "45 kg", icon: Leaf, color: "text-teal-600", bg: "bg-teal-50" },
    { label: t("dashboard.co2Reduced"), value: "120 kg", icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
    { label: t("dashboard.waterSaved"), value: "500 L", icon: Droplets, color: "text-blue-600", bg: "bg-blue-50" },
    { label: t("dashboard.pointsEarned"), value: "850", icon: Award, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  const recentClaims = [
    { id: 1, title: "Fresh Bread", date: "Oct 15, 2026", status: "Claimed" },
    { id: 2, title: "Assorted Vegetables", date: "Oct 12, 2026", status: "Picked Up" },
  ];

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
            <img src="/logo.png" alt="Qout Logo" width="40" height="40" style={{ width: "40px", height: "40px", objectFit: "contain" }} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
          </Link>
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("dashboard.welcomeBack")} User!</h1>
          <p className="text-gray-600 dark:text-gray-400">{t("dashboard.title")}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-semibold">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-teal-600" /> {t("dashboard.recentClaims")}
            </h2>
            <Link href="/marketplace">
              <Button variant="outline" size="sm" className="text-xs">
                {t("dashboard.goToMarketplace")}
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {recentClaims.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {t("dashboard.noClaims")}
              </div>
            ) : (
              recentClaims.map((claim) => (
                <div key={claim.id} className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center">
                      <Leaf className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{claim.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" /> {claim.date}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400">
                    {claim.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}