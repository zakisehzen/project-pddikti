import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get("keyword");

  if (!keyword) {
    return Response.json(
      {
        success: false,
        message: "Keyword wajib diisi",
      },
      { status: 400 }
    );
  }

  return Response.json({
    success: true,
    keyword: keyword,
    data: {
      nama: "Data Mahasiswa Contoh",
      nim: keyword,
      perguruanTinggi: "Perguruan Tinggi Contoh",
      programStudi: "Teknologi Sistem Terintegrasi",
      status: "Aktif",
    },
  });
}