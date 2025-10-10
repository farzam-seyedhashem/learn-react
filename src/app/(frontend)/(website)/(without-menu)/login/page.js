'use client'
import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    // ۱. وضعیت برای جابجایی بین حالت ورود و ثبت‌نام
    const [isLoginMode, setIsLoginMode] = useState(true);

    // ۲. وضعیت برای نگهداری مقادیر ورودی فرم
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // ۳. وضعیت برای مدیریت بارگذاری و خطاها
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    // ۴. تابع اصلی برای ارسال اطلاعات به سرور
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
        const payload = isLoginMode ? { email, password } : { name, email, password };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!data.success) {
                throw new Error(data.message || 'خطایی رخ داد.');
            }

            // ذخیره توکن و اطلاعات کاربر در localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.data));

            // هدایت کاربر به صفحه پروفایل
            router.push('/profile');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLoginMode(!isLoginMode);
        setError('');
    };

    return (
        <div className={"bg-white flex items-center justify-center h-dvh w-full"}>
            <div className={"relative w-11/12 md:w-3/12 p-6 border border-zinc-300 rounded-3xl"}>
                <Link href={"/"}>
                    <button
                        className={"flex items-center justify-center absolute top-6 right-6 text-black w-10 h-10 rounded-full hover:bg-black/10 transition-colors"}>
                        <Icon>
                            arrow_forward
                        </Icon>
                    </button>
                </Link>
                <div className={"flex justify-center"}>
                    <Image width={100} height={69} alt={"Logo"} src={"/logo.svg"} />
                </div>
                <h1 className={"mt-6 text-zinc-900 font-bold text-[24px]"}>
                    {isLoginMode ? 'ورود' : 'ثبت‌نام'}
                </h1>
                <p className={"mt-6 text-zinc-700 text-[16px]"}>
                    سلام!
                </p>
                <p className={"text-zinc-700 text-[16px] mb-4"}>
                    {isLoginMode ? 'لطفا ایمیل و رمز عبور خود را وارد کنید' : 'برای ساخت حساب کاربری، اطلاعات زیر را تکمیل کنید'}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLoginMode && (
                        <div>
                            <input
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required={!isLoginMode}
                                className={"caret-sky-500 text-[16px] outline-none focus:border-2 focus:border-sky-500 border border-zinc-300 rounded-lg w-full px-4 h-[56px] text-zinc-900"}
                            />
                        </div>
                    )}
                    <div>
                        <input
                           type="email"
                           placeholder="ایمیل"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required
                           className={"caret-sky-500 text-[16px] outline-none focus:border-2 focus:border-sky-500 border border-zinc-300 rounded-lg w-full px-4 h-[56px] text-zinc-900"}
                        />
                    </div>
                    <div>
                        <input
                           type="password"
                           placeholder="رمز عبور"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           required
                           className={"caret-sky-500 text-[16px] outline-none focus:border-2 focus:border-sky-500 border border-zinc-300 rounded-lg w-full px-4 h-[56px] text-zinc-900"}
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600 text-center pt-2">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className={"h-[56px] hover:bg-rose-700 transition-all duration-300 ease-in-out rounded-lg mt-6 bg-rose-600 text-white font-bold text-[16px] w-full disabled:bg-rose-400 flex items-center justify-center"}>
                        {loading ? 'در حال بررسی...' : (isLoginMode ? 'ورود' : 'ثبت‌نام')}
                    </button>
                </form>

                <p className={"text-center text-zinc-600 text-sm mt-4"}>
                    {isLoginMode ? 'حساب کاربری ندارید؟' : 'قبلا ثبت‌نام کرده‌اید؟'}
                    <button onClick={toggleMode} className={"text-sky-500 font-bold mx-1 hover:underline"}>
                        {isLoginMode ? 'ثبت‌نام' : 'وارد شوید'}
                    </button>
                </p>

                <p className={"text-center text-zinc-500 text-[14px] mt-8"}>
                    ورود شما به معنای پذیرش
                    <a className={"text-sky-500 mx-1"}>
                        شرایط دیجی‌ کالا
                    </a>
                    و
                    <a className={"text-sky-500 mx-1"}>
                        قوانین حریم‌خصوصی
                    </a>
                    است
                </p>
            </div>
        </div>
    );
}
