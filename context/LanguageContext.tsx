"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations = {
  en: {
    "brand.name": "Qout",
    "home.title": "From Surplus to Sustenance",
    "home.subtitle": "Qout connects restaurants, factories, and warehouses with charities and consumers.",
    "home.browseDeals": "Browse Food Deals",
    "home.postFood": "Post Surplus Food",
    "home.turningWaste": "Turning Waste into Value",
    "nav.marketplace": "Marketplace",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    "nav.supplierLogin": "Supplier Login",
    "nav.myDashboard": "My Dashboard",
    "nav.signIn": "Sign In",
    "stats.mealsSaved": "Meals Saved",
    "stats.charitiesSupported": "Charities Supported",
    "stats.partnerBusinesses": "Partner Businesses",
    "stats.co2Reduced": "CO2 Reduced (kg)",
    "howItWorks.title": "How Qout Works",
    "howItWorks.step1Title": "Log Surplus",
    "howItWorks.step1Desc": "Businesses list their excess food with quantity and expiry details in seconds.",
    "howItWorks.step2Title": "Connect & Claim",
    "howItWorks.step2Desc": "Charities claim for free, while consumers get access to heavily discounted deals.",
    "howItWorks.step3Title": "Track Impact",
    "howItWorks.step3Desc": "Earn points, track your CO2 savings, and build your sustainability story.",
    "marketplace.title": "Available Surplus Food",
    "marketplace.subtitle": "Claim food to support your community or get great deals.",
    "marketplace.noListings": "No surplus food available right now.",
    "marketplace.checkBack": "Check back soon, or encourage local businesses to join Qout!",
    "marketplace.claimButton": "Claim This Listing",
    "marketplace.claimedButton": "Already Claimed",
    "dashboard.welcomeBack": "Welcome back,",
    "dashboard.backToMarketplace": "Back to Marketplace",
    "dashboard.title": "Your Impact Dashboard",
    "dashboard.foodSaved": "Food Saved",
    "dashboard.co2Reduced": "CO2 Reduced",
    "dashboard.waterSaved": "Water Saved",
    "dashboard.pointsEarned": "Points Earned",
    "dashboard.recentClaims": "Your Recent Claims",
    "dashboard.noClaims": "You haven't claimed any food yet.",
    "dashboard.goToMarketplace": "Go to Marketplace",
    "dashboard.signOut": "Sign Out",
    "signIn.title": "Join Qout",
    "signIn.name": "Your Name",
    "signIn.email": "Email",
    "signIn.role": "I am a:",
    "signIn.consumer": "Consumer",
    "signIn.charity": "Charity",
    "signIn.supplier": "Supplier/Business",
    "signIn.getStarted": "Get Started",
    "signIn.signingIn": "Signing In...",
    "supplier.title": "Post Surplus Food",
    "supplier.subtitle": "Turn your food waste into community value.",
    "supplier.foodName": "Food Name",
    "supplier.quantity": "Quantity (kg)",
    "supplier.expiry": "Expiry Date & Time",
    "supplier.description": "Description (Optional)",
    "supplier.uploadPhoto": "Upload Photo",
    "supplier.clickToUpload": "Click to upload photo",
    "supplier.uploading": "Uploading...",
    "supplier.postButton": "Post Surplus Food",
    "footer.tagline": "Turning food waste into community value.",
    "footer.copyright": "© 2026 Qout. All rights reserved.",
  },
  ar: {
    "brand.name": "قوت",
    "home.title": "من الفائض إلى الاستدامة",
    "home.subtitle": "يربط قوت المطاعم والمصانع والمستودعات مع الجمعيات الخيرية والمستهلكين.",
    "home.browseDeals": "تصفح العروض",
    "home.postFood": "نشر فائض الطعام",
    "home.turningWaste": "تحويل الهدر إلى قيمة",
    "nav.marketplace": "السوق",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.supplierLogin": "دخول الموردين",
    "nav.myDashboard": "لوحتي",
    "nav.signIn": "تسجيل الدخول",
    "stats.mealsSaved": "وجبات تم إنقاذها",
    "stats.charitiesSupported": "جمعيات مدعومة",
    "stats.partnerBusinesses": "شركات شريكة",
    "stats.co2Reduced": "ثاني أكسيد الكربون المخفض (كغ)",
    "howItWorks.title": "كيف يعمل قوت",
    "howItWorks.step1Title": "تسجيل الفائض",
    "howItWorks.step1Desc": "تدرج الشركات طعامها الزائد مع الكمية وتاريخ الانتهاء في ثوانٍ.",
    "howItWorks.step2Title": "التواصل والمطالبة",
    "howItWorks.step2Desc": "تطالب الجمعيات الخيرية مجاناً، بينما يحصل المستهلكون على عروض مخفضة بشكل كبير.",
    "howItWorks.step3Title": "تتبع الأثر",
    "howItWorks.step3Desc": "اكسب النقاط، تتبع توفيرك لثاني أكسيد الكربون، وابنِ قصة استدامتك.",
    "marketplace.title": "فائض الطعام المتاح",
    "marketplace.subtitle": "اطلب الطعام لدعم مجتمعك أو احصل على عروض رائعة.",
    "marketplace.noListings": "لا يوجد فائض طعام متاح حالياً.",
    "marketplace.checkBack": "تحقق مرة أخرى قريباً، أو شجع الشركات المحلية على الانضمام لقوت!",
    "marketplace.claimButton": "اطلب هذه القائمة",
    "marketplace.claimedButton": "تم الطلب بالفعل",
    "dashboard.welcomeBack": "مرحباً بعودتك،",
    "dashboard.backToMarketplace": "العودة للسوق",
    "dashboard.title": "لوحة الأثر الخاصة بك",
    "dashboard.foodSaved": "الطعام المنقذ",
    "dashboard.co2Reduced": "ثاني أكسيد الكربون المخفض",
    "dashboard.waterSaved": "الماء الموفر",
    "dashboard.pointsEarned": "النقاط المكتسبة",
    "dashboard.recentClaims": "طلباتك الأخيرة",
    "dashboard.noClaims": "لم تطلب أي طعام بعد.",
    "dashboard.goToMarketplace": "اذهب للسوق",
    "dashboard.signOut": "تسجيل الخروج",
    "signIn.title": "انضم لقوت",
    "signIn.name": "اسمك",
    "signIn.email": "البريد الإلكتروني",
    "signIn.role": "أنا:",
    "signIn.consumer": "مستهلك",
    "signIn.charity": "جمعية خيرية",
    "signIn.supplier": "مورد/شركة",
    "signIn.getStarted": "ابدأ الآن",
    "signIn.signingIn": "جاري تسجيل الدخول...",
    "supplier.title": "نشر فائض الطعام",
    "supplier.subtitle": "حول هدر طعامك إلى قيمة مجتمعية.",
    "supplier.foodName": "اسم الطعام",
    "supplier.quantity": "الكمية (كغ)",
    "supplier.expiry": "تاريخ ووقت الانتهاء",
    "supplier.description": "الوصف (اختياري)",
    "supplier.uploadPhoto": "رفع صورة",
    "supplier.clickToUpload": "انقر لرفع صورة",
    "supplier.uploading": "جاري الرفع...",
    "supplier.postButton": "نشر فائض الطعام",
    "footer.tagline": "تحويل هدر الطعام إلى قيمة مجتمعية.",
    "footer.copyright": "© 2026 قوت. جميع الحقوق محفوظة.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}