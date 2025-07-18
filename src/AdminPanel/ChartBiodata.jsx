import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartBiodata = () => {
  const [stats, setStats] = useState({
    totalBiodata: 0,
    maleBiodata: 0,
    femaleBiodata: 0,
    premiumBiodata: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetch('http://localhost:3000/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  const data = [
    { name: 'Total Biodata', value: stats.totalBiodata },
    { name: 'Male Biodata', value: stats.maleBiodata },
    { name: 'Female Biodata', value: stats.femaleBiodata },
    { name: 'Premium Biodata', value: stats.premiumBiodata },
  ];

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">
        Admin Dashboard
      </h2>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg sm:text-xl mb-4">Biodata Statistics</h3>
          <div className="w-full h-72 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <h3 className="text-lg sm:text-xl mb-2">
            Total Revenue from Contact Requests
          </h3>
          <p className="text-2xl font-semibold">${stats.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default ChartBiodata;
