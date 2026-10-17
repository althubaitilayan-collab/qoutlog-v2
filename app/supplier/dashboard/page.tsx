"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "../../components/LanguageThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { ArrowLeft, Upload } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SupplierDashboardPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [isPosting, setIsPosting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    quantity: "",
    expiry: "",
    description: "",
  });

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPosting(true);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Food posted successfully!");
        router.push("/marketplace"); // Redirect to marketplace to see it
      } else {
        alert("Failed to post food.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred.");
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageThemeSwitcher />
      </div>

      <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Qout Logo" width={40} height={40} className="object-contain" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-gray-300 dark:border-gray-600">
              <ArrowLeft className="w-4 h-4 mr-2" /> Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-4 py-12 w-full">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t("supplier.title")}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t("supplier.subtitle")}</p>
          </div>

          <form onSubmit={handlePost} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("supplier.foodName")}</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                placeholder={t("supplier.foodNamePlaceholder")} 
                required 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("supplier.quantity")}</label>
                <input 
                  type="number" 
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  placeholder="10" 
                  required 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("supplier.expiry")}</label>
                <input 
                  type="datetime-local" 
                  value={formData.expiry}
                  onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" 
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{t("supplier.description")}</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white h-32" 
                placeholder={t("supplier.descriptionPlaceholder")} 
              />
            </div>

            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
              <Upload className="w-10 h-10 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600 dark:text-gray-400">{t("supplier.clickToUpload")}</p>
            </div>

            <Button type="submit" disabled={isPosting} className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 text-lg font-semibold">
              {isPosting ? t("supplier.uploading") : t("supplier.postButton")}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}