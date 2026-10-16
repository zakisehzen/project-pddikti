import { NextRequest } from "next/server";
import { provinceData } from "../../../data/provinceData";
import { campuses, type CampusPage } from "../../../data/campusData";

const PAGE_SIZE = 48;

export async function GET(request: NextRequest) {
  const province = request.nextUrl.searchParams.get("provinsi");
  const page = Number(request.nextUrl.searchParams.get("page") ?? "1");

  if (!province || !provinceData.some((item) => item.provinsi === province)) {
    return Response.json(
      { message: "Provinsi tidak valid." },
      { status: 400 }
    );
  }

  if (!Number.isInteger(page) || page < 1) {
    return Response.json(
      { message: "Nomor halaman tidak valid." },
      { status: 400 }
    );
  }

  const provinceCampuses = campuses.filter(
    (campus) => campus.province === province
  );
  const totalPages = Math.ceil(provinceCampuses.length / PAGE_SIZE);

  if (page > totalPages) {
    return Response.json(
      { message: "Halaman perguruan tinggi tidak ditemukan." },
      { status: 404 }
    );
  }

  const result: CampusPage = {
    campuses: provinceCampuses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    page,
    limit: PAGE_SIZE,
    totalItems: provinceCampuses.length,
    totalPages,
    totalStudents: provinceCampuses.reduce(
      (total, campus) => total + campus.students,
      0
    ),
  };

  return Response.json(result);
}
