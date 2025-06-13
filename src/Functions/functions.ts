import { FormatDateTimeOptions } from "../Interface/IMovie";

//funcion para filtrar los dupilicados por nombre
export function getUniqueByName<T extends { name: string; known_for_department: string }>(
  list: T[] | null,
  department: string
): T[] {
  if (!list) return [];
  return Array.from(
    new Map(
      list
        .filter((person) => person.known_for_department === department)
        .map((person) => [person.name, person])
    ).values()
  );
}

//funcion para formtear la fecha
export type FormatDateTimeInput = Date | string | number |null | undefined

export function FormatDateTime(time: FormatDateTimeInput): string {
  const data = time ? (time instanceof Date ? time : new Date(time)) : null;
  return data && !isNaN(data.getTime()) ? data.toLocaleString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  } as FormatDateTimeOptions) : "";
}