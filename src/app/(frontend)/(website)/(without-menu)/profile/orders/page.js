export default function OrdersPage() {
  // Mock data for orders
  const orders = [
    { id: 1, date: "1403/04/01", total: "1,250,000 تومان", status: "تحویل شده" },
    { id: 2, date: "1403/03/25", total: "850,000 تومان", status: "لغو شده" },
    { id: 3, date: "1403/04/05", total: "2,500,000 تومان", status: "در حال پردازش" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "تحویل شده":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">{status}</span>;
      case "لغو شده":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">{status}</span>;
      case "در حال پردازش":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">{status}</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-8">سفارش‌های من</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-slate-200">
            <tr>
              <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">سفارش</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">تاریخ</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">وضعیت</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">مبلغ کل</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900"># {order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(order.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
