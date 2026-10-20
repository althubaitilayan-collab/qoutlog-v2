"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ar";

interface Translations {
  [key: string]: string;
}

const translations: Record<Language, Translations> = {
  en: {
    "brand.name": "Qout",
    "nav.marketplace": "Marketplace",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.signIn": "Sign In",
    "home.turningWaste": "Turning Waste into Value",
    "home.title": "From Surplus to Sustenance",
    "home.subtitle": "Connecting surplus food with those who need it through an AI-powered smart marketplace.",
    "home.browseDeals": "Browse Food Deals",
    "home.postFood": "Post Surplus Food",
    "stats.mealsSaved": "Meals Saved",
    "stats.charitiesSupported": "Charities Supported",
    "stats.partnerBusinesses": "Partner Businesses",
    "stats.co2Reduced": "Tons of CO₂ Reduced",
    "howItWorks.title": "How It Works",
    "howItWorks.step1Title": "Register Your Business",
    "howItWorks.step1Desc": "Sign up as a factory, supermarket, restaurant, or charity.",
    "howItWorks.step2Title": "Post or Request",
    "howItWorks.step2Desc": "List your surplus food or use AI to find exactly what you need.",
    "howItWorks.step3Title": "Complete Transaction",
    "howItWorks.step3Desc": "Negotiate, confirm, and arrange pickup or delivery seamlessly.",
    "footer.tagline": "Connecting surplus food with those who need it.",
    "footer.copyright": "© 2026 Qout. All rights reserved.",
    "marketplace.title": "Smart Marketplace",
    "marketplace.subtitle": "Find the best surplus food deals matched to your needs.",
    "marketplace.noListings": "No listings available",
    "marketplace.checkBack": "Check back later or post your own surplus.",
    "marketplace.claimButton": "Request Purchase",
    "dashboard.title": "Your Impact Dashboard",
    "dashboard.welcomeBack": "Welcome back,",
    "dashboard.foodSaved": "Food Saved",
    "dashboard.co2Reduced": "CO₂ Reduced",
    "dashboard.waterSaved": "Water Saved",
    "dashboard.pointsEarned": "Points Earned",
    "dashboard.recentClaims": "Recent Claims",
    "dashboard.goToMarketplace": "Go to Marketplace",
    "dashboard.noClaims": "No recent claims.",
    
    // AI Assistant
    "ai.welcome": "Welcome to Qout! 🌱\nI am your smart assistant for managing food surplus.\n\nHow can I help you today?",
    "ai.placeholder": "Write your request here... Example: I need 500kg of sauce",
    "ai.quickActions": "Quick Actions:",
    "ai.disclaimer": "Qout can make mistakes. Verify important information.",
    "ai.searchSuppliers": "🔍 Search for Suppliers",
    "ai.viewStats": "📊 View Statistics",
    "ai.dashboard": "🏭 Supplier Dashboard",
    "ai.checkout": "💳 Complete Order",
    "ai.example1": "I need 500kg of sauce from Riyadh",
    "ai.example2": "Surplus oils for sale",
    "ai.example3": "Canned goods in large quantities",
    "ai.example4": "Fresh juices in large quantities",
    "ai.responseStats": "📊 Here are Qout's statistics:\n\n• 40+ registered businesses\n• 120 tons of surplus food\n• 85% match rate\n• 3 cities covered\n\nWould you like to see full details?",
    "ai.responseMarketplace": "🔍 Searching for suitable suppliers...\n\nFound 3 matching results:\n\n1. Golden Factory - Nakiba Sauce (2000 kg)\n2. Palm Workshop - Surplus Oils (800 kg)\n3. Al-Amin Warehouse - Canned Goods (5000 units)\n\nWould you like to open the full marketplace?",
    "ai.responseDashboard": "🏭 Welcome to the Dashboard!\n\nYou have:\n• 12 active products\n• 5 pending requests\n• 28 completed deals\n• 3 new messages\n\nWould you like to enter the dashboard?",
    "ai.responseCheckout": "💳 Your order summary:\n\n• Product value: 9,000 SAR\n• Delivery fee: 350 SAR\n• Service fee: 270 SAR\n• Total: 9,620 SAR\n\nWould you like to complete payment?",
    "ai.responseDefault": "I understood your request: \"{query}\"\n\nI can help you with:\n🔍 Searching for suppliers\n📊 Viewing statistics\n🏭 Managing the dashboard\n💳 Completing orders\n\nWhat would you like to do?",
    
    // Sidebar & Header
    "sidebar.marketplace": "Marketplace",
    "sidebar.stats": "Statistics",
    "sidebar.dashboard": "Dashboard",
    "sidebar.orders": "Orders",
    "sidebar.signIn": "Sign In",
    "header.aiAssistant": "Qout Smart Assistant",
    
    // Actions
    "action.viewStats": "View Full Statistics",
    "action.openMarket": "Open Marketplace",
    "action.enterDashboard": "Enter Dashboard",
    "action.completeOrder": "Complete Order",
  },
  ar: {
    "brand.name": "قوت",
    "nav.marketplace": "السوق",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.signIn": "تسجيل الدخول",
    "home.turningWaste": "تحويل الهدر إلى قيمة",
    "home.title": "من الفائض إلى الاستدامة",
    "home.subtitle": "نربط فائض الطعام بمن يحتاجه من خلال سوق ذكي مدعوم بالذكاء الاصطناعي.",
    "home.browseDeals": "تصفح عروض الطعام",
    "home.postFood": "أضف فائض الطعام",
    "stats.mealsSaved": "وجبة تم إنقاذها",
    "stats.charitiesSupported": "جمعية مدعومة",
    "stats.partnerBusinesses": "شركة شريكة",
    "stats.co2Reduced": "طن CO₂ تم توفيره",
    "howItWorks.title": "كيف تعمل المنصة",
    "howItWorks.step1Title": "سجل منشأتك",
    "howItWorks.step1Desc": "سجل كـ مصنع، سوبرماركت، مطعم، أو جمعية خيرية.",
    "howItWorks.step2Title": "أضف أو اطلب",
    "howItWorks.step2Desc": "أضف فائض طعامك أو استخدم الذكاء الاصطناعي للعثور على ما تحتاجه بالضبط.",
    "howItWorks.step3Title": "أكمل الصفقة",
    "howItWorks.step3Desc": "تفاوض، أكد، ونظم الاستلام أو التوصيل بسلاسة.",
    "footer.tagline": "نربط فائض الطعام بمن يحتاجه.",
    "footer.copyright": "© 2026 قوت. جميع الحقوق محفوظة.",
    "marketplace.title": "السوق الذكي",
    "marketplace.subtitle": "اعثر على أفضل عروض الطعام الفائض المطابقة لاحتياجاتك.",
    "marketplace.noListings": "لا توجد عروض حالياً",
    "marketplace.checkBack": "تحقق لاحقاً أو أضف فائضك الخاص.",
    "marketplace.claimButton": "طلب شراء",
    "dashboard.title": "لوحة تحكم الأثر الخاص بك",
    "dashboard.welcomeBack": "مرحباً بعودتك،",
    "dashboard.foodSaved": "طعام تم إنقاذه",
    "dashboard.co2Reduced": "كربون تم توفيره",
    "dashboard.waterSaved": "مياه تم توفيرها",
    "dashboard.pointsEarned": "نقاط مكتسبة",
    "dashboard.recentClaims": "آخر الطلبات",
    "dashboard.goToMarketplace": "الذهاب للسوق",
    "dashboard.noClaims": "لا توجد طلبات حديثة.",

    // AI Assistant
    "ai.welcomeAr": "مرحباً بك في قوت! 🌱\nأنا مساعدك الذكي لإدارة فائض الطعام.\n\nكيف يمكنني مساعدتك اليوم؟",
    "ai.placeholderAr": "اكتب طلبك هنا... مثال: أحتاج 500 كجم صلصة",
    "ai.quickActionsAr": "إجراءات سريعة:",
    "ai.disclaimerAr": "قوت يمكن أن يرتكب أخطاء. تحقق من المعلومات المهمة.",
    "ai.searchSuppliersAr": "🔍 ابحث عن موردين",
    "ai.viewStatsAr": "📊 عرض الإحصائيات",
    "ai.dashboardAr": "🏭 لوحة تحكم المورد",
    "ai.checkoutAr": "💳 إتمام طلب",
    "ai.example1Ar": "أحتاج 500 كجم صلصة من الرياض",
    "ai.example2Ar": "فائض زيوت للبيع",
    "ai.example3Ar": "تابلعات بكميات كبيرة",
    "ai.example4Ar": "عصائر طازجة بكميات كبيرة",
    "ai.responseStatsAr": "📊 إليك إحصائيات منصة قوت:\n\n• 40+ منشأة مسجلة\n• 120 طن فائض غذائي\n• 85% معدل المطابقة\n• 3 مدن مغطاة\n\nهل تريد عرض التفاصيل الكاملة؟",
    "ai.responseMarketplaceAr": "🔍 جاري البحث عن الموردين المناسبين...\n\nوجدت 3 نتائج مطابقة لطلبك:\n\n1. مصنع الذهب - صلصة ناكيبا (2000 كجم)\n2. معمل النخيل - فائض زيوت (800 كجم)\n3. مستودع الأمين - تابلعات (5000 كجم)\n\nهل تريد عرض السوق الكامل؟",
    "ai.responseDashboardAr": "🏭 مرحباً بك في لوحة التحكم!\n\nلديك:\n• 12 منتج نشط\n• 5 طلبات قيد الانتظار\n• 28 صفقة مكتملة\n• 3 رسائل جديدة\n\nهل تريد الدخول للوحة التحكم؟",
    "ai.responseCheckoutAr": "💳 ملخص طلبك:\n\n• قيمة المنتجات: 9,000 ر.س\n• رسوم التوصيل: 350 ر.س\n• رسوم الخدمة: 270 ر.س\n• الإجمالي: 9,620 ر.س\n\nهل تريد إتمام الدفع؟",
    "ai.responseDefaultAr": "فهمت طلبك: \"{query}\"\n\nيمكنني مساعدتك في:\n🔍 البحث عن موردين\n📊 عرض الإحصائيات\n🏭 إدارة لوحة التحكم\n💳 إتمام الطلبات\n\nما الذي تريد فعله؟",

    // Sidebar & Header
    "sidebar.marketplaceAr": "السوق",
    "sidebar.statsAr": "الإحصائيات",
    "sidebar.dashboardAr": "لوحة التحكم",
    "sidebar.ordersAr": "الطلبات",
    "sidebar.signInAr": "تسجيل الدخول",
    "header.aiAssistantAr": "مساعد قوت الذكي",

    // Actions
    "action.viewStatsAr": "عرض الإحصائيات الكاملة",
    "action.openMarketAr": "فتح السوق",
    "action.enterDashboardAr": "دخول لوحة التحكم",
    "action.completeOrderAr": "إتمام الطلب",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar");

  useEffect(() => {
    const savedLang = localStorage.getItem("qout-language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("qout-language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string, fallback?: string) => {
    if (language === "ar") {
      const arKey = `${key}Ar`;
      if (translations.ar[arKey]) {
        return translations.ar[arKey];
      }
    }
    return translations[language][key] || fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}