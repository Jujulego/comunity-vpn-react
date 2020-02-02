// Types
export type Comparator<T> = (a: T, b: T) => number;

// Functions
export function asc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] > a[orderBy]) return -1;
  if (b[orderBy] < a[orderBy]) return 1;
  return 0;
}

export function desc<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

export function stableSort<T>(data: T[], cmp: Comparator<T>) {
  const stabilized = data.map((el, index) => [el, index] as [T, number]);

  stabilized.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return stabilized.map(el => el[0]);
}
