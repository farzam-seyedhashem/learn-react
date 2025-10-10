export default function AddressesPage() {
    // Mock data for addresses
    const addresses = [
        {
            id: 1,
            name: "خانه",
            address: "تهران، خیابان آزادی، کوچه اول، پلاک ۱۰، واحد ۴",
            postalCode: "1419999999",
            recipient: "کاربر نمونه",
        },
        {
            id: 2,
            name: "محل کار",
            address: "تهران، میدان ونک، برج نگار، طبقه ۵، واحد ۱۲",
            postalCode: "1991988888",
            recipient: "کاربر نمونه",
        },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-slate-800">آدرس‌های من</h1>
                <button
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                              clipRule="evenodd"/>
                    </svg>
                    <span>افزودن آدرس</span>
                </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {addresses.map((address) => (
                    <div key={address.id}
                         className="p-5 border border-slate-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="flex justify-between items-start">
                            <h2 className="font-bold text-lg text-slate-800 mb-3">{address.name}</h2>
                            <div className="flex gap-3">
                                <button
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">ویرایش
                                </button>
                                <button
                                    className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">حذف
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-slate-600 border-t border-slate-200 pt-4">
                            <p><span className="font-semibold text-slate-700">گیرنده:</span> {address.recipient}</p>
                            <p><span className="font-semibold text-slate-700">آدرس:</span> {address.address}</p>
                            <p><span className="font-semibold text-slate-700">کدپستی:</span> {address.postalCode}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
