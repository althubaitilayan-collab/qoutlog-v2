"use client";

import { useState, useEffect } from "react";
import { X, Tag, Sparkles } from "lucide-react";
import { Button } from "./ui/button";

export function BarakahPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeen = localStorage.getItem("barakah-popup-seen");
    
    // Show popup after 2 seconds if not seen before
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      // Mark as seen so it doesn't show again
      localStorage.setItem("barakah-popup-seen", "true");
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Popup Card */}
      <div 
        className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden transition-all duration-300 ${
          isClosing ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
        dir="rtl"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 left-3 z-10 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>

        {/* Barakah Image */}
        <div className="relative">
          <img 
            src="/barakah.png" 
            alt="Barakah" 
            className="w-full h-48 object-cover"
          />
          {/* Discount Badge */}
          <div className="absolute -bottom-6 right-1/2 translate-x-1/2">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
              <Tag className="w-5 h-5" />
              <span className="font-bold text-lg">خصم 5%</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-10 pb-6 px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              عرض خاص من بركة!
            </h2>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>

          <p className="text-gray-600 dark:text-gray-400 mb-4 text-base leading-relaxed">
            احصل على <span className="font-bold text-pink-600 dark:text-pink-400">خصم 5%</span> على جميع طلباتك من <span className="font-bold text-pink-600 dark:text-pink-400">بركة</span> عند استخدام تطبيق قوت!
          </p>

          <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-pink-700 dark:text-pink-300 font-medium">
              🎉 استخدم كود: <span className="font-bold text-lg mx-1">QOUT5</span> عند الدفع
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleClose}
              variant="outline"
              className="flex-1 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              لاحقاً
            </Button>
            <Button
              onClick={handleClose}
              className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white"
            >
              ابدأ التسوق
            </Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-500 mt-4">
            * العرض ساري لفترة محدودة. تطبق الشروط والأحكام.
          </p>
        </div>
      </div>
    </div>
  );
}