"use client";

import { LanguageThemeSwitcher } from "../../components/LanguageThemeSwitcher";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { Building2, Store, Utensils, Heart, Truck, Factory, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const businessTypes = [
  { id: "FACTORY", label: "مصنع", icon: Factory },
  { id: "DISTRIBUTOR", label: "مورد", icon: Truck },
  { id: "SUPERMARKET", label: "سوبرماركت", icon: Store },
  { id: "RESTAURANT", label: "مطعم", icon: Utensils },
  { id: "CHARITY", label: "جمعية خيرية", icon: Heart },
];

export default function SignInPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: "",
    businessName: "",
    city: "",
    contactEmail: "",
    contactPhone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleTypeSelect = (type: string) => {
    setFormData({ ...formData, businessType: type });
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      router.push("/supplier/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col" dir="rtl">
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <LanguageThemeSwitcher />
      </div>

      <header className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Qout Logo" width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">قوت</span>
          </div>
          {step === 2 && (
            <button onClick={() => setStep(1)} className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-600">
              <ArrowLeft className="w-4 h-4 rotate-180" /> رجوع
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
            
            {step === 1 && (
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">سجل منشأتك اليوم</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">اختر نوع حسابك للبدء في استخدام منصة قوت</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {businessTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTypeSelect(type.id)}
                      className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-800 hover:border-teal-600 dark:hover:border-teal-600 bg-gray-50 dark:bg-gray-800 transition-all flex flex-col items-center gap-3 group"
                    >
                      <type.icon className="w-8 h-8 text-gray-400 group-hover:text-teal-600 transition-colors" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-teal-600">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">أكمل بيانات المنشأة</h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">نوع الحساب: <span className="font-bold text-teal-600">{businessTypes.find(t => t.id === formData.businessType)?.label}</span></p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">اسم المنشأة / الشركة</label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="مثال: مصنع الذهب للأغذية"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">المدينة</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    >
                      <option value="">اختر المدينة</option>
                      <option value="الرياض">الرياض</option>
                      <option value="جدة">جدة</option>
                      <option value="الدمام">الدمام</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">رقم الجوال</label>
                    <input
                      type="tel"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="05xxxxxxxx"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="example@company.com"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg font-semibold rounded-lg"
                >
                  {isLoading ? "جاري إنشاء الحساب..." : "ادخل لوحة التحكم"}
                </Button>
              </form>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}