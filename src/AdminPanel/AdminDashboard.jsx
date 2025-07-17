import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    male: 0,
    female: 0,
    premium: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [totalRes, maleRes, femaleRes, premiumRes, revenueRes] =
          await Promise.all([
            fetch('http://localhost:3000/biodatas/count'),
            fetch('http://localhost:3000/biodatas/count?type=male'),
            fetch('http://localhost:3000/biodatas/count?type=female'),
            fetch('http://localhost:3000/biodatas/count?premium=true'),
            fetch('http://localhost:3000/contact-request/revenue'),
          ]);

        const [total, male, female, premium, revenue] = await Promise.all([
          totalRes.json(),
          maleRes.json(),
          femaleRes.json(),
          premiumRes.json(),
          revenueRes.json(),
        ]);

        setStats({
          total: total.count,
          male: male.count,
          female: female.count,
          premium: premium.count,
          revenue: revenue.totalRevenue,
        });
      } catch (err) {
        console.error('Failed to load dashboard stats', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-pink-600">
        📊 Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded p-4 border-l-4 border-blue-500">
          <h3 className="text-lg font-semibold">Total Biodatas</h3>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border-l-4 border-green-500">
          <h3 className="text-lg font-semibold">Male Biodatas</h3>
          <p className="text-2xl font-bold">{stats.male}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border-l-4 border-pink-500">
          <h3 className="text-lg font-semibold">Female Biodatas</h3>
          <p className="text-2xl font-bold">{stats.female}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border-l-4 border-purple-500">
          <h3 className="text-lg font-semibold">Premium Biodatas</h3>
          <p className="text-2xl font-bold">{stats.premium}</p>
        </div>
        <div className="bg-white shadow rounded p-4 border-l-4 border-yellow-500">
          <h3 className="text-lg font-semibold">Total Revenue</h3>
          <p className="text-2xl font-bold">${stats.revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
