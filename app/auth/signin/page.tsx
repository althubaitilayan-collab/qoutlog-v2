"use client";

import { useLanguage } from "@/context/LanguageContext";
import { LanguageThemeSwitcher } from "../../components/LanguageThemeSwitcher";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import { User, Mail, Briefcase, Leaf } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "CONSUMER",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (formData.role === "SUPPLIER") {
        router.push("/supplier/dashboard");
      } else {
        router.push("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors duration-300">
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageThemeSwitcher />
      </div>

      <header className="w-full bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-2">
          <Image src="/logo.png" alt="Qout Logo" width={40} height={40} className="object-contain" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
              <Image src="/logo.png" alt="Qout Logo" width={60} height={60} className="mx-auto mb-4 object-contain" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {t("signIn.title")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t("home.subtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("signIn.name")}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("signIn.email")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("signIn.role")}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "CONSUMER" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "CONSUMER"
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {t("signIn.consumer")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "CHARITY" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "CHARITY"
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <Leaf className="w-6 h-6 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {t("signIn.charity")}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: "SUPPLIER" })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.role === "SUPPLIER"
                        ? "border-teal-600 bg-teal-50 dark:bg-teal-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400"
                    }`}
                  >
                    <Briefcase className="w-6 h-6 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {t("signIn.supplier")}
                    </span>
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 text-lg font-semibold"
              >
                {isLoading ? t("signIn.signingIn") : t("signIn.getStarted")}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}