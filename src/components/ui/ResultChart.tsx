// src/components/ui/ResultChart.tsx (NUEVO ARCHIVO)
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ResultChart = memo(() => {
  const { t } = useTranslation();
  const growthData = [
    { month: 'Ene', before: 20, after: 45, projection: 55 },
    { month: 'Feb', before: 25, after: 52, projection: 68 },
    { month: 'Mar', before: 22, after: 68, projection: 85 },
    { month: 'Abr', before: 28, after: 78, projection: 95 },
    { month: 'May', before: 30, after: 95, projection: 120 },
    { month: 'Jun', before: 35, after: 120, projection: 145 }
  ];
  return (
    <div className="bg-white/80 backdrop-blur-md p-3 xxs:p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200/50 hover:shadow-2xl sm:hover:shadow-3xl transition-shadow duration-500">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-md sm:text-xl lg:text-2xl font-bold text-gray-900">{t('charts.results')}</h3>
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm text-gray-600">{t('charts.live')}</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={growthData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
          <defs>
            <>
              <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                <>
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </>
              </linearGradient>
              <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                <>
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </>
              </linearGradient>
            </>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" fontSize={12} tickMargin={5}/>
          <YAxis stroke="#6b7280" fontSize={12} tickMargin={5}/>
          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '10px', boxShadow: '0 4px 10px -3px rgba(0,0,0,0.1)', fontSize: '12px' }} />
          <Area type="monotone" dataKey="before" stroke="#f87171" fillOpacity={1} fill="url(#colorBefore)" strokeWidth={2} name={t('charts.before')} />
          <Area type="monotone" dataKey="after" stroke="#60a5fa" fillOpacity={1} fill="url(#colorAfter)" strokeWidth={2.5} name={t('charts.with_strategy')} />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-between items-center mt-4 text-[9px] xxs:text-[10px] sm:text-xs">
        <div className="flex items-center mb-1 sm:mb-0">
          <div className="w-2.5 h-0.5 sm:w-3 bg-red-400 mr-1 sm:mr-1.5"></div>
          <span className="text-gray-600">{t('charts.traditional_marketing')}</span>
        </div>
        <div className="flex items-center mb-1 sm:mb-0">
          <div className="w-2.5 h-0.5 sm:w-3 bg-blue-400 mr-1 sm:mr-1.5"></div>
          <span className="text-gray-600">{t('charts.with_strategy')}</span>
        </div>
        <div className="flex items-center">
          <div className="w-2.5 h-0.5 sm:w-3 bg-green-400 mr-1 sm:mr-1.5"></div>
          <span className="text-gray-600">{t('charts.projection')}</span>
        </div>
      </div>
    </div>
  );
});
ResultChart.displayName = "ResultChart";

export default ResultChart;