import type { MappingRowValues } from './mapping';
import { isLedMapping } from './mapping';

async function request(ip: string, path: string, options?: RequestInit): Promise<Response> {
  const response = await fetch(`http://${ip}${path}`, options);
  if (!response.ok) throw new Error(`WLED request failed: ${response.status}`);
  return response;
}

export async function fetchMapping(ip: string) {
  const response = await request(ip, '/edit?edit=%2Fledmap.json');
  const data: unknown = await response.json();
  return isLedMapping(data) ? data : null;
}

export async function uploadMapping(ip: string, mapping: string) {
  const body = new FormData();
  body.append('data', new Blob([mapping], { type: 'text/json' }), '/ledmap.json');
  await request(ip, '/edit', { method: 'POST', body });
}

export async function configureMatrix(ip: string, width: number, height: number) {
  await request(ip, '/settings/2D', {
    method: 'POST',
    body: `SOMP=1&PW=8&PH=8&MPH=1&MPV=1&PB=0&PR=0&PV=0&MPC=1&P0B=0&P0R=0&P0V=0&P0W=${width}&P0H=${height}&P0X=0&P0Y=0&data=`,
  });
}

export async function rebootDevice(ip: string) {
  await request(ip, '/reset');
}

export function highlightCommand(count: number, start: number, end?: number) {
  return {
    on: true,
    bri: 255,
    ledmap: 9, // Bypass the active mapping while identifying LEDs.
    seg: { i: [0, count, '000000', start, end ? end + 1 : start, 'FFFFFF'], rev: false, mi: false },
  };
}

export function highlightCentersCommand(count: number, rows: MappingRowValues[]) {
  const centers = rows.map(
    (row) =>
      Math.round((parseInt(String(row.left)) + parseInt(String(row.right))) / 2) +
      parseInt(String(row.offset)),
  );
  return {
    on: true,
    bri: 255,
    ledmap: 10,
    seg: {
      i: [0, count, '000000', ...centers.flatMap((led) => [led, 'FFFFFF'])],
      rev: false,
      mi: false,
    },
  };
}

export function testCommand() {
  return { on: true, bri: 255, ledmap: 0, seg: { fx: 180, pal: 48, frz: false } };
}
