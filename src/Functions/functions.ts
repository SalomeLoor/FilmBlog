
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

