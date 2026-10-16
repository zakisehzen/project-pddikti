"use client";

import { useEffect, useRef, useState } from "react";
import {
  isCampusPage,
  type CampusPage,
} from "../app/data/campusData";

interface ProvinceCampusListProps {
  province: string;
}

export default function ProvinceCampusList({
  province,
}: ProvinceCampusListProps) {
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<CampusPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [province]);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCampuses() {
      setLoading(true);
      setError(null);
      setResult(null);

      try {
        const query = new URLSearchParams({
          provinsi: province,
          page: String(page),
        });
        const response = await fetch(
          `/api/pddikti/perguruan-tinggi?${query.toString()}`,
          { signal: controller.signal }
        );
        const data: unknown = await response.json();

        if (!response.ok) {
          const message =
            typeof data === "object" &&
            data !== null &&
            "message" in data &&
            typeof data.message === "string"
              ? data.message
              : "Daftar perguruan tinggi gagal dimuat.";
          throw new Error(message);
        }

        if (!isCampusPage(data)) {
          throw new Error("Format daftar perguruan tinggi tidak valid.");
        }

        setResult(data);
      } catch (caughtError) {
        if (controller.signal.aborted) return;
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Daftar perguruan tinggi gagal dimuat."
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadCampuses();

    return () => controller.abort();
  }, [page, province]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="campus-list-title"
      aria-live="polite"
      className="mt-6 rounded-2xl border border-blue-100 bg-blue-50/60 p-5"
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            Daftar perguruan tinggi
          </p>
          <h3
            id="campus-list-title"
            className="mt-1 text-xl font-bold text-gray-900"
          >
            {province}
          </h3>
          {result && (
            <p className="mt-1 text-sm text-gray-600">
              {result.totalItems.toLocaleString("id-ID")} kampus ·{" "}
              {result.totalStudents.toLocaleString("id-ID")} mahasiswa
            </p>
          )}
        </div>

        <p className="text-sm text-gray-500">
          Jumlah mahasiswa mengacu pada file PDDikti yang diberikan. Jika
          tertulis “Tidak tercantum di file PDDikti”, berarti file tersebut tidak
          mencantumkan jumlah mahasiswa kampus itu—bukan berarti kampusnya tidak
          memiliki mahasiswa.
        </p>
      </div>

      {loading && (
        <p className="mt-5 rounded-xl bg-white p-4 text-gray-600">
          Memuat daftar kampus...
        </p>
      )}

      {error && (
        <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-red-700">
          {error}
        </p>
      )}

      {!loading && result && (
        <>
          {result.campuses.length > 0 ? (
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {result.campuses.map((campus) => (
                <li
                  key={campus.id}
                  className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
                >
                  <h4 className="font-semibold text-gray-900">{campus.name}</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    {campus.city} · {campus.type}
                  </p>
                  <span className="mt-3 inline-flex rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-800">
                    {campus.students === 0
                      ? "Jumlah mahasiswa tidak tercantum di file PDDikti"
                      : `${campus.students.toLocaleString("id-ID")} mahasiswa (file PDDikti)`}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 rounded-xl bg-white p-4 text-gray-600">
              Belum ada data perguruan tinggi untuk provinsi ini.
            </p>
          )}

          {result.totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage - 1)}
                disabled={page <= 1 || loading}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Sebelumnya
              </button>
              <p className="text-sm text-gray-600">
                Halaman {result.page.toLocaleString("id-ID")} dari{" "}
                {result.totalPages.toLocaleString("id-ID")}
              </p>
              <button
                type="button"
                onClick={() => setPage((currentPage) => currentPage + 1)}
                disabled={page >= result.totalPages || loading}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Berikutnya
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
