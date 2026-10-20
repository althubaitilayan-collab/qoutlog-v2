      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="Qout Logo" width={40} height={40} className="object-contain" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">{t("brand.name")}</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/marketplace" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <ShoppingBag className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {isArabic ? t("sidebar.marketplaceAr") : t("sidebar.marketplace")}
            </span>
          </Link>
          
          <Link 
            href="/stats" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <BarChart3 className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {isArabic ? t("sidebar.statsAr") : t("sidebar.stats")}
            </span>
          </Link>
          
          <Link 
            href="/supplier/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <Package className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {isArabic ? t("sidebar.dashboardAr") : t("sidebar.dashboard")}
            </span>
          </Link>
          
          <Link 
            href="/checkout" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <TrendingUp className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {isArabic ? t("sidebar.ordersAr") : t("sidebar.orders")}
            </span>
          </Link>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link 
            href="/auth/signin" 
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
          >
            <User className="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {isArabic ? t("sidebar.signInAr") : t("sidebar.signIn")}
            </span>
          </Link>
        </div>
      </aside>