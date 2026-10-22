"use client";

import { LanguageThemeSwitcher } from "../components/LanguageThemeSwitcher";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { ArrowRight, CheckCircle, CreditCard, Shield, Truck, Package, Leaf } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product") || "صلصة ناكيبا";
  const pricePerKg = parseFloat(searchParams.get("price") || "18");
  const quantity = parseInt(searchParams.get("quantity") || "500");

  const productValue = pricePerKg * quantity;
  const deliveryFee = 350;
  const serviceFee = Math.round(productValue * 0.03); // 3% commission
  const total = productValue + deliveryFee + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950" dir="rtl">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Qout Logo" width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">قوت - إتمام الطلب</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageThemeSwitcher />
            <Link href="/marketplace">
              <Button variant="outline" size="sm">
                <ArrowRight className="w-4 h-4 ml-2" /> العودة للسوق
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Banner */}
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-bold text-green-900 dark:text-green-100">تم الاتفاق على الصفقة!</p>
            <p className="text-sm text-green-700 dark:text-green-300">أكمل الدفع لتأكيد الطلب مع مصنع الذهب</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Status Tracker */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">حالة الطلب</h2>
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-0 transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-0 right-2/3 h-1 bg-teal-600 -z-0 transform -translate-y-1/2"></div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <span className="text-xs mt-2 text-teal-600 font-semibold">التفاوض</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold">2</div>
                  <span className="text-xs mt-2 text-teal-600 font-semibold">الدفع</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 flex items-center justify-center font-bold">3</div>
                  <span className="text-xs mt-2 text-gray-500">التسليم</span>
                </div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-500 flex items-center justify-center font-bold">4</div>
                  <span className="text-xs mt-2 text-gray-500">مكتمل</span>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-teal-600" /> تفاصيل الدفع
              </h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400">قيمة المنتجات ({quantity} كجم × {pricePerKg} ر.س)</span>
                  <span className="font-bold text-gray-900 dark:text-white">{productValue.toLocaleString()} ر.س</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Truck className="w-4 h-4" /> رسوم التوصيل
                  </span>
                  <span className="font-bold text-gray-900 dark:text-white">{deliveryFee.toLocaleString()} ر.س</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Leaf className="w-4 h-4" /> رسوم خدمة قوت (3%)
                  </span>
                  <span className="font-bold text-teal-600">{serviceFee.toLocaleString()} ر.س</span>
                </div>
                
                <div className="flex justify-between items-center pt-4 mt-4 border-t-2 border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-gray-900 dark:text-white">الإجمالي</span>
                  <span className="text-2xl font-bold text-teal-600">{total.toLocaleString()} ر.س</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg flex gap-3">
                <Shield className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  <strong>تنبيه:</strong> هذا نموذج تجريبي. لا يتم خصم أي مبالغ حقيقية. في النسخة النهائية، سيتم ربط بوابة دفع آمنة.
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">ملخص الصفقة</h3>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-900/20 rounded-lg flex items-center justify-center">
                  <Package className="w-8 h-8 text-teal-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{product}</p>
                  <p className="text-sm text-gray-500">مصنع الذهب</p>
                  <p className="text-xs text-teal-600 mt-1 font-semibold">{quantity} كجم</p>
                </div>
              </div>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">سعر الكجم:</span>
                  <span className="font-semibold">{pricePerKg} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">الكمية:</span>
                  <span className="font-semibold">{quantity} كجم</span>
                </div>
                <div className="flex justify-between text-teal-600 font-bold pt-2 border-t border-gray-200 dark:border-gray-700">
                  <span>عمولة قوت:</span>
                  <span>{serviceFee} ر.س</span>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all">
                <CheckCircle className="w-5 h-5 ml-2" />
                تأكيد الدفع التجريبي
              </Button>
              
              <p className="text-xs text-center text-gray-500 mt-4">
                بالضغط على الزر، أنت توافق على شروط وأحكام منصة قوت.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}