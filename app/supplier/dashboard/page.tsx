"use client";

import { LanguageThemeSwitcher } from "../../components/LanguageThemeSwitcher";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { Package, MessageSquare, BarChart3, Plus, ArrowRight, Clock, CheckCircle, AlertCircle } from "lucide-react";

export default function SupplierDashboardPage() {
  // Mock data for the dashboard
  const stats = [
    { label: "المنتجات النشطة", value: "12", icon: Package, color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20" },
    { label: "طلبات قيد الانتظار", value: "5", icon: Clock, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
    { label: "صفقات مكتملة", value: "28", icon: CheckCircle, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20" },
    { label: "رسائل جديدة", value: "3", icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
  ];

  const recentRequests = [
    { id: 1, buyer: "سوبرماركت الأمانة", product: "صلصة ناكيبا", quantity: "500 كجم", status: "pending", time: "منذ ساعتين" },
    { id: 2, buyer: "مطعم البركة", product: "تابلعات متنوعة", quantity: "200 كجم", status: "negotiating", time: "منذ 5 ساعات" },
    { id: 3, buyer: "جمعية إطعام", product: "عصائر طازجة", quantity: "100 كجم", status: "completed", time: "أمس" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending": return <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">قيد الانتظار</span>;
      case "negotiating": return <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">تفاوض</span>;
      case "completed": return <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">مكتمل</span>;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950" dir="rtl">
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <LanguageThemeSwitcher />
      </div>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Qout Logo" width={40} height={40} style={{ width: "40px", height: "40px", objectFit: "contain" }} />
            <span className="text-xl font-bold text-gray-900 dark:text-white">قوت - لوحة التحكم</span>
          </Link>
          <Link href="/marketplace">
            <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700">
              <ArrowRight className="w-4 h-4 ml-2" /> السوق العام
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">مرحباً بك في لوحة التحكم</h1>
            <p className="text-gray-600 dark:text-gray-400">تابع طلباتك، أضف منتجاتك، وأدر محادثاتك مع المشترين.</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700 text-white">
            <Plus className="w-4 h-4 ml-2" /> إضافة منتج جديد
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-5 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center gap-4 shadow-sm">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Recent Requests Table */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-600" /> آخر الطلبات الواردة
              </h2>
              <button className="text-sm text-teal-600 hover:underline">عرض الكل</button>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentRequests.map((req) => (
                <div key={req.id} className="p-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center">
                      <Package className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{req.buyer}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        يطلب: {req.product} ({req.quantity}) • {req.time}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(req.status)}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions / Info Panel */}
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-600" /> إجراءات سريعة
            </h2>
            <div className="space-y-4">
              <button className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-teal-600 dark:hover:border-teal-600 text-right transition-colors flex items-center justify-between group">
                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600">إدارة المحادثات</span>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">3 جديدة</span>
              </button>
              <button className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-teal-600 dark:hover:border-teal-600 text-right transition-colors flex items-center justify-between group">
                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600">تقارير المبيعات</span>
                <ArrowRight className="w-4 h-4 text-gray-400 rotate-180" />
              </button>
              <button className="w-full p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-teal-600 dark:hover:border-teal-600 text-right transition-colors flex items-center justify-between group">
                <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-teal-600">إعدادات المنشأة</span>
                <ArrowRight className="w-4 h-4 text-gray-400 rotate-180" />
              </button>
            </div>

            <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-lg flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                هذا نموذج تجريبي. في النسخة النهائية، ستكون جميع البيانات مرتبطة بقاعدة بيانات سحابية ونظام دفع حقيقي.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}