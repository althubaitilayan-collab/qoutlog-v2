"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "./components/LanguageThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./components/ui/button";
import { Leaf, BarChart3, Package, MessageCircle, Settings, TrendingUp, Sparkles, Send, Bot, ArrowLeft, ShoppingBag, User } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  action?: {
    label: string;
    href: string;
  };
}

const quickActions = [
  { label: "🔍 ابحث عن موردين", href: "/marketplace", icon: "search" },
  { label: "📊 عرض الإحصائيات", href: "/stats", icon: "stats" },
  { label: "🏭 لوحة تحكم المورد", href: "/supplier/dashboard", icon: "dashboard" },
  { label: " إتمام طلب", href: "/checkout", icon: "checkout" },
];

const exampleQueries = [
  "أحتاج 500 كجم صلصة من الرياض",
  "فائض زيوت للبيع",
  "تابلعات بكميات كبيرة",
  "عصائر طازجة بكميات كبيرة",
];

export default function Home() {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "مرحباً بك في قوت! 🌱\nأنا مساعدك الذكي لإدارة فائض الطعام.\n\nكيف يمكنني مساعدتك اليوم؟",
      isUser: false,
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

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

    // Simulate AI response with smart routing
    setTimeout(() => {
      let aiResponse: Message;
      
      if (text.includes("إحصائ") || text.includes("stats") || text.includes("أرقام")) {
        aiResponse = {
          id: Date.now() + 1,
          text: " إليك إحصائيات منصة قوت:\n\n• 40+ منشأة مسجلة\n• 120 طن فائض غذائي\n• 85% معدل المطابقة\n• 3 مدن مغطاة\n\nهل تريد عرض التفاصيل الكاملة؟",
          isUser: false,
          action: { label: "عرض الإحصائيات الكاملة", href: "/stats" },
        };
      } else if (text.includes("سوق") || text.includes("marketplace") || text.includes("بحث") || text.includes("مورد")) {
        aiResponse = {
          id: Date.now() + 1,
          text: "🔍 جاري البحث عن الموردين المناسبين...\n\nوجدت 3 نتائج مطابقة لطلبك:\n\n1. مصنع الذهب - صلصة ناكيبا (2000 كجم)\n2. معمل النخيل - فائض زيوت (800 كجم)\n3. مستودع الأمين - تابلعات (5000 كجم)\n\nهل تريد عرض السوق الكامل؟",
          isUser: false,
          action: { label: "فتح السوق", href: "/marketplace" },
        };
      } else if (text.includes("لوحة") || text.includes("dashboard") || text.includes("تحكم")) {
        aiResponse = {
          id: Date.now() + 1,
          text: "🏭 مرحباً بك في لوحة التحكم!\n\nلديك:\n• 12 منتج نشط\n• 5 طلبات قيد الانتظار\n• 28 صفقة مكتملة\n• 3 رسائل جديدة\n\nهل تريد الدخول للوحة التحكم؟",
          isUser: false,
          action: { label: "دخول لوحة التحكم", href: "/supplier/dashboard" },
        };
      } else if (text.includes("دفع") || text.includes("checkout") || text.includes("طلب")) {
        aiResponse = {
          id: Date.now() + 1,
          text: "💳 ملخص طلبك:\n\n• قيمة المنتجات: 9,000 ر.س\n• رسوم التوصيل: 350 ر.س\n• رسوم الخدمة: 270 ر.س\n• الإجمالي: 9,620 ر.س\n\nهل تريد إتمام الدفع؟",
          isUser: false,
          action: { label: "إتمام الطلب", href: "/checkout" },
        };
      } else {
        aiResponse = {
          id: Date.now() + 1,
          text: `فهمت طلبك: "${text}"\n\nيمكنني مساعدتك في:\n البحث عن موردين\n📊 عرض الإحصائيات\n🏭 إدارة لوحة التحكم\n💳 إتمام الطلبات\n\nما الذي تريد فعله؟`,
          isUser: false,
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex" dir="rtl">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Qout Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">قوت</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/marketplace" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <ShoppingBag className="w-5 h-5 text-teal-600" />
            <span className="text-gray-700 dark:text-gray-300">السوق</span>
          </Link>
          <Link href="/stats" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <BarChart3 className="w-5 h-5 text-teal-600" />
            <span className="text-gray-700 dark:text-gray-300">الإحصائيات</span>
          </Link>
          <Link href="/supplier/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Package className="w-5 h-5 text-teal-600" />
            <span className="text-gray-700 dark:text-gray-300">لوحة التحكم</span>
          </Link>
          <Link href="/checkout" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <span className="text-gray-700 dark:text-gray-300">الطلبات</span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link href="/auth/signin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <User className="w-5 h-5 text-teal-600" />
            <span className="text-gray-700 dark:text-gray-300">تسجيل الدخول</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 mr-64 flex flex-col">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">مساعد قوت الذكي</h1>
          </div>
          <LanguageThemeSwitcher />
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.isUser ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[70%] ${msg.isUser ? "order-2" : "order-1"}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    msg.isUser
                      ? "bg-teal-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  {msg.action && (
                    <Link href={msg.action.href} className="mt-3 inline-block">
                      <Button className="bg-teal-600 hover:bg-teal-700 text-white text-sm">
                        {msg.action.label} <ArrowLeft className="w-4 h-4 mr-1" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-end">
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
              <Sparkles className="w-3 h-3" /> إجراءات سريعة:
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
            {/* Example Queries */}
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
                placeholder="اكتب طلبك هنا... مثال: أحتاج 500 كجم صلصة"
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
              قوت يمكن أن يرتكب أخطاء. تحقق من المعلومات المهمة.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}