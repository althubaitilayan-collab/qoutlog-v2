"use client";

import { useState } from "react";
import { LanguageThemeSwitcher } from "../../components/LanguageThemeSwitcher";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { ArrowRight, Send, Package, CheckCircle } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "buyer" | "supplier";
  time: string;
}

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "مرحباً، أنا مهتم بطلب 500 كجم من صلصة ناكيبا. هل السعر قابل للتفاوض؟", sender: "buyer", time: "10:30 ص" },
    { id: 2, text: "أهلاً بك! نعم، يمكننا مناقشة السعر للكميات الكبيرة. ما هو العرض الذي تقترحه؟", sender: "supplier", time: "10:32 ص" },
    { id: 3, text: "أقترح 16 ريال للكيلوغرام بدلاً من 18، مع استلام فوري.", sender: "buyer", time: "10:35 ص" },
    { id: 4, text: "يمكنني تقديم 17 ريال كحد أدنى، مع توصيل مجاني للرياض.", sender: "supplier", time: "10:38 ص" },
  ]);
  const [input, setInput] = useState("");
  const [offerSent, setOfferSent] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "buyer",
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  const handleSendOffer = () => {
    setOfferSent(true);
    const offerMessage: Message = {
      id: Date.now(),
      text: "✅ تم إرسال عرض رسمي: 500 كجم بسعر 17 ريال/كجم = 8,500 ريال إجمالي",
      sender: "buyer",
      time: new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, offerMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col" dir="rtl">
      {/* Header - Fixed */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/supplier/dashboard" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600">
            <ArrowRight className="w-4 h-4" /> العودة للوحة التحكم
          </Link>
          <div className="flex items-center gap-3">
            <LanguageThemeSwitcher />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white">مصنع الذهب</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span> متصل الآن
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full flex flex-col">
        <div className="bg-amber-50 dark:bg-amber-900/10 border-b border-amber-200 dark:border-amber-900/30 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-amber-600" />
            <div>
              <p className="font-bold text-gray-900 dark:text-white text-sm">طلب: صلصة ناكيبا - 500 كجم</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">حالة التفاوض: <span className="text-amber-600 font-semibold">قيد المناقشة</span></p>
            </div>
          </div>
          <Button
            onClick={handleSendOffer}
            disabled={offerSent}
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm"
          >
            {offerSent ? <><CheckCircle className="w-4 h-4 ml-2" /> تم إرسال العرض</> : "إرسال عرض رسمي"}
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-950">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === "buyer" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[70%] ${msg.sender === "buyer" ? "order-2" : "order-1"}`}>
                <div
                  className={`p-4 rounded-2xl ${
                    msg.sender === "buyer"
                      ? "bg-teal-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
                <p className={`text-xs text-gray-500 mt-1 ${msg.sender === "buyer" ? "text-right" : "text-left"}`}>
                  {msg.time}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Button onClick={handleSend} className="bg-teal-600 hover:bg-teal-700 text-white px-6">
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}