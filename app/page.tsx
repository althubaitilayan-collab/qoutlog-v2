"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "./components/LanguageThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { Leaf, Heart, Users, TrendingUp, ArrowRight, BarChart3 } from "lucide-react";

export default function Home() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors duration-300">
      {/* Language & Theme Switcher - Fixed Top Right */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageThemeSwitcher />
      </div>

      {/* Navigation Header */}
      <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Qout Logo" width={40} height={40} className="object-contain" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/marketplace" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 font-medium transition-colors">
              {t("nav.marketplace")}
            </Link>
            <Link href="/stats" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 font-medium transition-colors">
              {language === "ar" ? "الإحصائيات" : "Stats"}
            </Link>
            <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 font-medium transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-teal-600 font-medium transition-colors">
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                {t("nav.signIn")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full mb-6">
            <Leaf className="w-4 h-4" />
            <span className="text-sm font-semibold">{t("home.turningWaste")}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t("home.title")}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            {t("home.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
                {t("home.browseDeals")} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="lg" variant="outline" className="border-amber-600 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-6 text-lg">
                {t("home.postFood")}
              </Button>
            </Link>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gray-50 dark:bg-gray-800 py-16 border-y border-gray-100 dark:border-gray-700 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {language === "ar" ? "أثرنا على أرض الواقع" : "Our Real-World Impact"}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {language === "ar" ? "أرقام تعكس التزامنا بتقليل الهدر الغذائي" : "Numbers reflecting our commitment to reducing food waste"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <Leaf className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">1,000+</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{t("stats.mealsSaved")}</p>
              </div>
              <div className="p-6">
                <Heart className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">50+</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{t("stats.charitiesSupported")}</p>
              </div>
              <div className="p-6">
                <Users className="w-10 h-10 text-teal-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">200+</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{t("stats.partnerBusinesses")}</p>
              </div>
              <div className="p-6">
                <TrendingUp className="w-10 h-10 text-amber-600 mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">2.5T</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{t("stats.co2Reduced")}</p>
              </div>
            </div>

            {/* New Button to link to the full Stats page */}
            <div className="text-center mt-10">
              <Link href="/stats">
                <Button variant="outline" size="lg" className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20 px-8 py-3 text-base">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  {language === "ar" ? "عرض التقرير الكامل" : "View Full Report"}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-16">
            {t("howItWorks.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{t("howItWorks.step1Title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("howItWorks.step1Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-amber-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{t("howItWorks.step2Title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("howItWorks.step2Desc")}</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-teal-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{t("howItWorks.step3Title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">{t("howItWorks.step3Desc")}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Image src="/logo.png" alt="Qout Logo" width={30} height={30} className="object-contain" />
            <span className="text-xl font-bold">{t("brand.name")}</span>
          </div>
          <p className="text-gray-400 mb-6">{t("footer.tagline")}</p>
          <p className="text-gray-500 text-sm">{t("footer.copyright")}</p>
        </div>
      </footer>
    </div>
  );
}