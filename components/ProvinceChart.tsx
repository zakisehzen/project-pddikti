"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { provinceData } from "../app/data/provinceData";

export default function ProvinceChart() {
  const data = [...provinceData].sort(
    (a, b) => b.jumlah - a.jumlah
  );

  return (
    <div className="w-full h-[800px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{
            top: 10,
            right: 40,
            left: 20,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            tickFormatter={(value) =>
              Number(value).toLocaleString("id-ID")
            }
          />

          <YAxis
            dataKey="provinsi"
            type="category"
            width={180}
            tick={{ fontSize: 11 }}
          />

          <Tooltip
            formatter={(value) =>
              `${Number(value).toLocaleString("id-ID")} mahasiswa`
            }
          />

          <Bar
            dataKey="jumlah"
            name="Jumlah Mahasiswa"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}