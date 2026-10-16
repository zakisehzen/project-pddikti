import campusStudentCounts from "./campusStudentCounts.json";

export interface Campus {
  id: string;
  province: string;
  name: string;
  city: string;
  type: string;
  students: number;
}

export interface CampusPage {
  campuses: Campus[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  totalStudents: number;
}

export const campuses: Campus[] = campusStudentCounts;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCampus(value: unknown): value is Campus {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.province === "string" &&
    typeof value.name === "string" &&
    typeof value.city === "string" &&
    typeof value.type === "string" &&
    typeof value.students === "number" &&
    Number.isInteger(value.students)
  );
}

export function isCampusPage(value: unknown): value is CampusPage {
  return (
    isRecord(value) &&
    Array.isArray(value.campuses) &&
    value.campuses.every(isCampus) &&
    typeof value.page === "number" &&
    Number.isInteger(value.page) &&
    typeof value.limit === "number" &&
    Number.isInteger(value.limit) &&
    typeof value.totalItems === "number" &&
    Number.isInteger(value.totalItems) &&
    typeof value.totalPages === "number" &&
    Number.isInteger(value.totalPages) &&
    typeof value.totalStudents === "number" &&
    Number.isInteger(value.totalStudents)
  );
}
