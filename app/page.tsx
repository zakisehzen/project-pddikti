"use client";

import { useState } from "react";
import { provinceData, totalMahasiswa } from "./data/provinceData";
import ProvinceChart from "../components/ProvinceChart";

export default function Home() {
  const [search, setSearch] = useState("");

  const sortedData = [...provinceData].sort(
    (a, b) => b.jumlah - a.jumlah
  );

  const provinsiTerbanyak = sortedData[0];
  const provinsiTerkecil = sortedData[sortedData.length - 1];

  const filteredData = sortedData.filter((item) =>
    item.provinsi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">

        <header className="rounded-2xl bg-blue-700 p-8 text-white shadow-lg">
          <p className="text-sm font-semibold uppercase tracking-widest">
            PDDIKTI Statistics
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Dashboard Mahasiswa Indonesia
          </h1>

          <p className="mt-3 max-w-3xl text-blue-100">
            Statistik jumlah mahasiswa perguruan tinggi se-Indonesia
            berdasarkan data PDDIKTI Tahun 2025.
          </p>
        </header>

        <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-medium text-gray-600">
              Total Mahasiswa Terdaftar
            </p>

            <h2 className="mt-3 text-4xl font-bold text-blue-700">
              {totalMahasiswa.toLocaleString("id-ID")}
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Mahasiswa se-Indonesia
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-medium text-gray-600">
              Provinsi dengan Jumlah Terbanyak
            </p>

            <h2 className="mt-3 text-xl font-bold text-blue-700">
              {provinsiTerbanyak.provinsi}
            </h2>

            <p className="mt-2 text-3xl font-bold text-gray-800">
              {provinsiTerbanyak.jumlah.toLocaleString("id-ID")}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              mahasiswa
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
            <p className="text-sm font-medium text-gray-600">
              Provinsi dengan Jumlah Terendah
            </p>

            <h2 className="mt-3 text-xl font-bold text-blue-700">
              {provinsiTerkecil.provinsi}
            </h2>

            <p className="mt-2 text-3xl font-bold text-gray-800">
              {provinsiTerkecil.jumlah.toLocaleString("id-ID")}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              mahasiswa
            </p>
          </div>

        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800">
            Grafik Jumlah Mahasiswa per Provinsi
          </h2>

          <p className="mt-2 mb-6 text-gray-600">
            Perbandingan jumlah mahasiswa terdaftar pada setiap provinsi.
          </p>

          <ProvinceChart />
        </section>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
          <div className="mb-5">
            <h2 className="text-2xl font-bold text-gray-800">
              Data Jumlah Mahasiswa per Provinsi
            </h2>

            <p className="mt-2 text-gray-600">
              Gunakan kolom pencarian untuk menemukan provinsi tertentu.
            </p>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Cari Provinsi
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Ketik nama provinsi..."
              className="w-full rounded-xl border-2 border-gray-300 bg-white p-3 text-gray-900 placeholder-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">

              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="p-3 text-left">
                    No
                  </th>

                  <th className="p-3 text-left">
                    Provinsi
                  </th>

                  <th className="p-3 text-right">
                    Jumlah Mahasiswa
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr
                      key={item.provinsi}
                      className="border-b border-gray-200 hover:bg-blue-50"
                    >
                      <td className="p-3 text-gray-700">
                        {index + 1}
                      </td>

                      <td className="p-3 font-medium text-gray-800">
                        {item.provinsi}
                      </td>

                      <td className="p-3 text-right font-semibold text-gray-800">
                        {item.jumlah.toLocaleString("id-ID")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="p-6 text-center text-gray-500"
                    >
                      Provinsi tidak ditemukan.
                    </td>
                  </tr>
                )}

                {search === "" && (
                  <tr className="bg-blue-50 font-bold">
                    <td colSpan={2} className="p-3 text-gray-800">
                      Grand Total
                    </td>

                    <td className="p-3 text-right text-blue-700">
                      {totalMahasiswa.toLocaleString("id-ID")}
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </section>

        <footer className="mt-6 pb-6 text-center text-sm text-gray-500">
          <p>
            Sumber data: PDDIKTI — Data Jumlah Mahasiswa Terdaftar Tahun 2025
          </p>

          <p className="mt-1">
            Dashboard Statistik Mahasiswa Perguruan Tinggi Indonesia
          </p>
        </footer>

      </div>
    </main>
  );
}