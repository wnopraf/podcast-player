export class FilterService {
  static byText<T>(items: T[], searchTerm: string, fields: (keyof T)[]): T[] {
    const term = searchTerm.toLowerCase();
    return items.filter((item) =>
      fields.some((field) => {
        const value = item[field];
        return typeof value === 'string' && value.toLowerCase().includes(term);
      })
    );
  }

  static orderBy<T>(items: T[], field: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...items].sort((a, b) => {
      const valA = a[field];
      const valB = b[field];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }

      return 0;
    });
  }
}
