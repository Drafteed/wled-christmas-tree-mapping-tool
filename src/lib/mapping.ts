export interface MappingRowValues {
  left: number | '';
  right: number | '';
  offset: number | '';
}

export interface LedMapping {
  width: number;
  height: number;
  map: number[];
}

export interface Matrix {
  width: number;
  height: number;
  map: number[][];
}

export function createRow(): MappingRowValues {
  return {left: '', right: '', offset: 0};
}

export function isLedMapping(value: unknown): value is LedMapping {
  if (!value || typeof value !== 'object') return false;
  const {width, height, map} = value as LedMapping;
  return (
    Number.isInteger(width) &&
    width > 0 &&
    Number.isInteger(height) &&
    height > 0 &&
    Array.isArray(map) &&
    map.length === width * height &&
    map.every((led) => Number.isInteger(led) && led >= -1)
  );
}

export function importRows(mapping: LedMapping): MappingRowValues[] {
  return Array.from({length: mapping.height}, (_, i): MappingRowValues => {
    const row = mapping.map.slice(i * mapping.width, (i + 1) * mapping.width);
    const first = row.findIndex((value) => value !== -1);
    const last = row.findLastIndex((value) => value !== -1);
    return {
      left: row.find((value) => value !== -1) ?? '',
      right: row.findLast((value) => value !== -1) ?? '',
      offset: Math.round((first + last) / 2 - (row.length - 1) / 2),
    };
  }).reverse();
}

export function generateMatrix(ranges: [number, number, number?][]): Matrix {
  const height = ranges.length;
  let width = 0;
  for (const [start, end, offset = 0] of ranges) {
    width = Math.max(width, Math.abs(end - start) + 1 + Math.abs(offset) * 2);
  }
  const map = Array.from({length: height}, () => Array<number>(width).fill(-1));
  ranges.forEach(([start, end, offset = 0], row) => {
    const step = start <= end ? 1 : -1;
    const length = Math.abs(end - start) + 1;
    const startCol = Math.floor((width - length) / 2) + offset;
    for (let i = 0; i < length; i++) map[row][startCol + i] = start + i * step;
  });
  return {width, height, map};
}

export function generateMapping(rows: MappingRowValues[]): Matrix | null {
  if (rows.some((row) => Object.values(row).some((value) => value === '' || !Number.isInteger(value)))) {
    return null;
  }
  // The editor stores bottom-to-top rows; WLED expects the top row first.
  return generateMatrix(
    rows
      .map(({left, right, offset}) => [Number(left), Number(right), Number(offset)] as [number, number, number])
      .reverse(),
  );
}

export function serializeMapping(matrix: Matrix): string {
  return (
    `{"width":${matrix.width},"height":${matrix.height},"map":[\n` +
    matrix.map.map((row) => row.toString()).join(',\n') +
    '\n]}'
  );
}
