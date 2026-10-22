"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "./components/LanguageThemeSwitcher";
import { BarakahPopup } from "./components/BarakahPopup";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { BarChart3, Package, TrendingUp, Sparkles, Send, ArrowLeft, ShoppingBag, User, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  action?: {
    label: string;
    href: string;
    variant?: "primary" | "success";
  };
  isNegotiation?: boolean;
}

export default function Home() {
  const { t, language } = useLanguage();
  const isArabic = language === "ar";
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [negotiationStep, setNegotiationStep] = useState(0);

  // Initialize welcome message when language changes
  useEffect(() => {
    setMessages([
      {
        id: 1,
        text: isArabic ? t("ai.welcomeAr") : t("ai.welcome"),
        isUser: false,
      },
    ]);
    setNegotiationStep(0);
  }, [language, isArabic, t]);

  const quickActions = [
    { label: isArabic ? t("ai.searchSuppliersAr") : t("ai.searchSuppliers"), href: "/marketplace" },
    { label: isArabic ? t("ai.viewStatsAr") : t("ai.viewStats"), href: "/stats" },
    { label: isArabic ? t("ai.dashboardAr") : t("ai.dashboard"), href: "/supplier/dashboard" },
    { label: isArabic ? t("ai.checkoutAr") : t("ai.checkout"), href: "/checkout" },
  ];

  const exampleQueries = [
    isArabic ? t("ai.example1Ar") : t("ai.example1"),
    isArabic ? t("ai.example2Ar") : t("ai.example2"),
    isArabic ? t("ai.example3Ar") : t("ai.example3"),
    isArabic ? t("ai.example4Ar") : t("ai.example4"),
  ];

  const startNegotiation = () => {
    setNegotiationStep(1);
    
    const supplierMessage: Message = {
      id: Date.now(),
      text: isArabic 
        ? "🏭 **مصنع الذهب** يرحب بك!\n\nلدينا عرض خاص:\n• المنتج: صلصة ناكيبا\n• الكمية المتاحة: 2,000 كجم\n• السعر: 18 ريال/كجم\n\nهل تريد التفاوض على السعر أو الكمية؟"
        : "🏭 **Golden Factory** welcomes you!\n\nWe have a special offer:\n• Product: Nakiba Sauce\n• Available Quantity: 2,000 kg\n• Price: 18 SAR/kg\n\nWould you like to negotiate the price or quantity?",
      isUser: false,
      isNegotiation: true,
    };
    setMessages((prev) => [...prev, supplierMessage]);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse: Message;

      if (negotiationStep === 1) {
        const lowerPrice = 16;
        setNegotiationStep(2);

        aiResponse = {
          id: Date.now() + 1,
          text: isArabic
            ? `💬 **المشتري:** أقترح ${lowerPrice} ريال للكيلوغرام بدلاً من 18، لكمية 500 كجم.\n\n⏳ جاري إرسال العرض للمورد...`
            : `💬 **Buyer:** I suggest ${lowerPrice} SAR/kg instead of 18, for 500 kg quantity.\n\n⏳ Sending offer to supplier...`,
          isUser: false,
        };

        setTimeout(() => {
          const counterOffer: Message = {
            id: Date.now() + 2,
            text: isArabic
              ? `🏭 **مصنع الذهب** يرد:\n\n"يمكنني تقديم ${lowerPrice + 1} ريال/كجم كحد أدنى، مع توصيل مجاني للرياض."\n\nهل تقبل هذا العرض؟`
              : `🏭 **Golden Factory** responds:\n\n"I can offer ${lowerPrice + 1} SAR/kg as minimum, with free delivery to Riyadh."\n\nDo you accept this offer?`,
            isUser: false,
            isNegotiation: true,
            action: {
              label: isArabic ? "✅ قبول العرض والانتقال للدفع" : "✅ Accept Offer & Proceed to Payment",
              href: `/checkout?product=Nakiba Sauce&price=${lowerPrice + 1}&quantity=500`,
              variant: "success",
            },
          };
          setMessages((prev) => [...prev, counterOffer]);
          setIsTyping(false);
        }, 2000);

        setMessages((prev) => [...prev, aiResponse]);
        return;
      }

      if (text.includes("إحصائ") || text.includes("stats") || text.includes("أرقام") || text.includes("statistics")) {
        aiResponse = {
          id: Date.now() + 1,
          text: isArabic ? t("ai.responseStatsAr") : t("ai.responseStats"),
          isUser: false,
          action: {
            label: isArabic ? t("action.viewStatsAr") : t("action.viewStats"),
            href: "/stats",
          },
        };
      } else if (text.includes("سوق") || text.includes("marketplace") || text.includes("بحث") || text.includes("مورد") || text.includes("search") || text.includes("أحتاج") || text.includes("need")) {
        aiResponse = {
          id: Date.now() + 1,
          text: isArabic ? t("ai.responseMarketplaceAr") : t("ai.responseMarketplace"),
          isUser: false,
        };
        setTimeout(() => startNegotiation(), 500);
      } else if (text.includes("لوحة") || text.includes("dashboard") || text.includes("تحكم")) {
        aiResponse = {
          id: Date.now() + 1,
          text: isArabic ? t("ai.responseDashboardAr") : t("ai.responseDashboard"),
          isUser: false,
          action: {
            label: isArabic ? t("action.enterDashboardAr") : t("action.enterDashboard"),
            href: "/supplier/dashboard",
          },
        };
      } else if (text.includes("دفع") || text.includes("checkout") || text.includes("طلب") || text.includes("order") || text.includes("قبول")) {
        aiResponse = {
          id: Date.now() + 1,
          text: isArabic ? t("ai.responseCheckoutAr") : t("ai.responseCheckout"),
          isUser: false,
          action: {
            label: isArabic ? t("action.completeOrderAr") : t("action.completeOrder"),
            href: "/checkout",
            variant: "success",
          },
        };
      } else {
        const defaultText = isArabic ? t("ai.responseDefaultAr") : t("ai.responseDefault");
        aiResponse = {
          id: Date.now() + 1,
          text: defaultText.replace("{query}", text),
          isUser: false,
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleActionClick = (action: { label: string; href: string; variant?: string }) => {
    if (action.href === "#") {
      startNegotiation();
    } else {
      window.location.href = action.href;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex relative" dir={isArabic ? "rtl" : "ltr"}>
      {/* Sidebar */}
      <aside 
        className={`fixed h-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out z-40 ${
          isArabic ? "right-0 border-l" : "left-0 border-r"
        } ${
          sidebarOpen ? "w-64 translate-x-0" : isArabic ? "w-0 translate-x-full" : "w-0 -translate-x-full"
        } overflow-hidden`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 min-w-[256px]">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Qout Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 min-w-[256px]">
          <Link href="/marketplace" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <ShoppingBag className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{isArabic ? t("sidebar.marketplaceAr") : t("sidebar.marketplace")}</span>
          </Link>
          <Link href="/stats" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <BarChart3 className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{isArabic ? t("sidebar.statsAr") : t("sidebar.stats")}</span>
          </Link>
          <Link href="/supplier/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <Package className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{isArabic ? t("sidebar.dashboardAr") : t("sidebar.dashboard")}</span>
          </Link>
          <Link href="/checkout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <TrendingUp className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{isArabic ? t("sidebar.ordersAr") : t("sidebar.orders")}</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-800 min-w-[256px] space-y-2">
          <Link href="/auth/signin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <User className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">{isArabic ? t("sidebar.signInAr") : t("sidebar.signIn")}</span>
          </Link>
          
          {/* Go to Barakah Button */}
          <a 
            href="https://barakah.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white transition-all group shadow-md hover:shadow-lg"
          >
            <span className="text-xl">🛍️</span>
            <span className="font-bold">{isArabic ? "اذهب إلى بركة" : "Go to Barakah"}</span>
          </a>
        </div>
      </aside>

      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? (isArabic ? "mr-64" : "ml-64") : "mr-0 ml-0"}`}>
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {isArabic ? t("header.aiAssistantAr") : t("header.aiAssistant")}
              </h1>
            </div>
          </div>
          <LanguageThemeSwitcher />
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? (isArabic ? "justify-start" : "justify-end") : (isArabic ? "justify-end" : "justify-start")}`}>
              <div className={`max-w-[75%] ${msg.isUser ? (isArabic ? "order-1" : "order-2") : (isArabic ? "order-2" : "order-1")}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    msg.isUser
                      ? "bg-teal-600 text-white rounded-br-sm"
                      : msg.isNegotiation
                      ? "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-gray-900 dark:text-white border-2 border-amber-300 dark:border-amber-700 rounded-bl-sm shadow-md"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  {msg.action && (
                    <button
                      onClick={() => handleActionClick(msg.action!)}
                      className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        msg.action.variant === "success"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-teal-600 hover:bg-teal-700 text-white"
                      }`}
                    >
                      {msg.action.variant === "success" && <Sparkles className="w-4 h-4" />}
                      {msg.action.label}
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className={`flex ${isArabic ? "justify-end" : "justify-start"}`}>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl rounded-bl-sm border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {messages.length <= 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {isArabic ? t("ai.quickActionsAr") : t("ai.quickActions")}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Button variant="outline" size="sm" className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900/20">
                    {action.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            {messages.length <= 1 && (
              <div className="mb-4 flex flex-wrap gap-2 justify-center">
                {exampleQueries.map((query, index) => (
                  <button
                    key={index}
                    onClick={() => handleSend(query)}
                    className="text-xs px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-teal-50 dark:hover:bg-teal-900/20 hover:text-teal-600 transition-colors border border-gray-200 dark:border-gray-700"
                  >
                    {query}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder={isArabic ? t("ai.placeholderAr") : t("ai.placeholder")}
                className="flex-1 px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base"
              />
              <Button
                onClick={() => handleSend(input)}
                disabled={!input.trim()}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 text-center mt-3">
              {isArabic ? t("ai.disclaimerAr") : t("ai.disclaimer")}
            </p>
          </div>
        </div>
      </main>

      {/* Barakah Discount Popup */}
      <BarakahPopup />
    </div>
  );
}