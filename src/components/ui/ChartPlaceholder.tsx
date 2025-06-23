// src/components/ui/ChartPlaceholder.tsx (NUEVO ARCHIVO)
import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const ChartPlaceholder = () => {
  return (
    <div className="bg-white/80 backdrop-blur-md p-3 xxs:p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl border border-gray-200/50">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <Skeleton className="h-7 w-2/5" />
        <Skeleton className="h-5 w-1/4" />
      </div>
      <Skeleton className="w-full h-[240px]" />
      <div className="flex flex-wrap justify-between items-center mt-4">
        <Skeleton className="h-4 w-[110px]" />
        <Skeleton className="h-4 w-[90px]" />
        <Skeleton className="h-4 w-[70px]" />
      </div>
    </div>
  );
};

export default ChartPlaceholder;