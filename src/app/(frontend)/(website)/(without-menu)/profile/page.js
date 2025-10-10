"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({ _id: '', name: '', email: '' });
    const [initialUserInfo, setInitialUserInfo] = useState({ _id: '', name: '', email: '' });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // ۱. خواندن اطلاعات اولیه کاربر از localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUserInfo(parsedUser);
            setInitialUserInfo(parsedUser); // ذخیره حالت اولیه برای دکمه انصراف
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleCancelClick = () => {
        setUserInfo(initialUserInfo); // بازگرداندن به اطلاعات اولیه
        setIsEditing(false);
        setError('');
        setSuccess('');
    };

    // ۲. تابع اصلی برای به‌روزرسانی اطلاعات
    const handleSaveChanges = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        if (!token) {
            setError("شما وارد نشده‌اید. لطفا دوباره وارد شوید.");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch(`/api/users/${userInfo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // ۳. ارسال توکن برای احراز هویت
                },
                body: JSON.stringify({ name: userInfo.name, email: userInfo.email }),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || 'خطا در به‌روزرسانی اطلاعات');
            }

            // ۴. به‌روزرسانی localStorage و وضعیت‌ها
            localStorage.setItem('user', JSON.stringify(data.data));
            setUserInfo(data.data);
            setInitialUserInfo(data.data);
            setSuccess('اطلاعات شما با موفقیت به‌روزرسانی شد.');
            setIsEditing(false);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800">اطلاعات شخصی</h1>
                {!isEditing && (
                    <button
                        onClick={() => {
                            setIsEditing(true);
                            setError('');
                            setSuccess('');
                        }}
                        className="bg-blue-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        ویرایش
                    </button>
                )}
            </div>

            {/* نمایش پیام موفقیت یا خطا */}
            {success && <p className="text-sm text-green-600 bg-green-50 p-3 rounded-lg text-center mb-6">{success}</p>}
            {error && <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg text-center mb-6">{error}</p>}

            {isEditing ? (
                <div className="space-y-6">
                    <div className="grid grid-cols-1">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-600 mb-2">
                                نام و نام خانوادگی
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={userInfo.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2.5 border black border-slate-400 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
                            ایمیل
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userInfo.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
                        />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            onClick={handleCancelClick}
                            className="bg-slate-100 text-slate-800 font-semibold py-2 px-5 rounded-lg hover:bg-slate-200 transition-colors duration-300"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={handleSaveChanges}
                            disabled={loading}
                            className="bg-green-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-sm hover:shadow-md disabled:bg-green-400 disabled:cursor-not-allowed"
                        >
                            {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
                        </button>
                    </div>
                </div>
            ) : (
                <div className="space-y-5 text-slate-700">
                    <div className="flex items-baseline p-3 bg-slate-50 rounded-lg">
                        <p className="w-40 font-semibold text-slate-800">نام و نام خانوادگی:</p>
                        <p>{userInfo.name}</p>
                    </div>
                    <div className="flex items-baseline p-3 bg-slate-50 rounded-lg">
                        <p className="w-40 font-semibold text-slate-800">ایمیل:</p>
                        <p>{userInfo.email}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
