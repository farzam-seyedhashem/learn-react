"use client";

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

export default function ProfileLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    // ۱. وضعیت برای نگهداری اطلاعات کاربر
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // وضعیتی برای نمایش حالت بارگذاری اولیه

    const menuItems = [
        { name: "اطلاعات شخصی", href: "/profile" },
        { name: "سفارش‌های من", href: "/profile/orders" },
        { name: "آدرس‌های من", href: "/profile/addresses" },
    ];

    // ۲. افکت برای محافظت از مسیر و خواندن اطلاعات کاربر
    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        // اگر توکن وجود نداشت، کاربر را به صفحه ورود هدایت کن
        if (!token) {
            router.push('/login');
        } else {
            // اگر توکن وجود داشت، اطلاعات کاربر را در وضعیت ذخیره کن
            if (userData) {
                setUser(JSON.parse(userData));
            }
            setLoading(false); // بارگذاری تمام شد
        }
    }, [router]);

    // ۳. تابع برای خروج از حساب کاربری
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    };

    // تا زمانی که در حال بررسی توکن هستیم، یک صفحه لودینگ نمایش بده
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <p className="text-slate-500">در حال بارگذاری اطلاعات...</p>
            </div>
        );
    }

    // اگر کاربر وارد شده بود، لایوت اصلی را نمایش بده
    return (
        <div className="bg-slate-50 min-h-screen font-sans">
            <div className="container mx-auto p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-1/4 lg:w-1/5">
                        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                            {user && (
                                <div className="flex items-center gap-4 mb-6 p-2">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-xl">
                                        {user.name ? user.name.charAt(0) : 'ک'}
                                    </div>
                                    <div>
                                        {/* ۴. نمایش اطلاعات واقعی کاربر */}
                                        <h2 className="font-bold text-slate-800">{user.name}</h2>
                                        <p className="text-sm text-slate-500">{user.email}</p>
                                    </div>
                                </div>
                            )}
                            <nav>
                                <ul>
                                    {menuItems.map((item) => {
                                        const isActive = pathname === item.href;
                                        return (
                                            <li key={item.href} className="mb-1">
                                                <Link href={item.href}>
                                                    <span className={`block py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer ${isActive ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-slate-600 hover:bg-slate-100'}`}>
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        );
                                    })}
                                    <li className="mt-4 pt-4 border-t border-slate-200">
                                        {/* ۵. فعال‌سازی دکمه خروج */}
                                        <button onClick={handleLogout}
                                            className="block w-full text-right py-2.5 px-4 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-200 cursor-pointer">
                                            خروج از حساب
                                        </button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </aside>
                    <main className="w-full md:w-3/4 lg:w-4/5">
                        <div className="p-6 md:p-8 bg-white border border-slate-200 rounded-xl shadow-sm">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
