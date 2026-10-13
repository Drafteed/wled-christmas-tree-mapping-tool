import { useState } from 'react';
import { Preparations } from './components/Preparations';
import { MappingEditor } from './components/MappingEditor';
import { MappingResult } from './components/MappingResult';
import { useWledConnection } from './hooks/useWledConnection';
import { createRow, generateMapping, importRows, serializeMapping } from './lib/mapping';
import {
  configureMatrix,
  fetchMapping,
  highlightCentersCommand,
  highlightCommand,
  rebootDevice,
  testCommand,
  uploadMapping,
} from './lib/wled';

async function notify(action: () => Promise<void>, success: string, failure: string) {
  try {
    await action();
    alert(success);
  } catch {
    alert(failure);
  }
}

export function App() {
  const [ip, setIp] = useState('wled-37fdb1.local');
  const [importing, setImporting] = useState(false);
  const [imported, setImported] = useState(false);
  const [selectedLed, setSelectedLed] = useState(0);
  const [selectedLedEnd, setSelectedLedEnd] = useState<number>();
  const [rows, setRows] = useState(() => Array.from({ length: 3 }, createRow));
  const [result, setResult] = useState({ mapping: '', width: 0, height: 0 });
  const device = useWledConnection();
  const connecting = importing || device.connecting;

  async function start() {
    setImporting(true);
    try {
      const existing = await fetchMapping(ip);
      if (existing) {
        setRows(importRows(existing));
        setResult((current) => ({ ...current, width: existing.width, height: existing.height }));
      }
      setImported(Boolean(existing));
    } catch {
      // A missing ledmap is expected during the first setup.
      setImported(false);
    } finally {
      device.connect(ip);
      setImporting(false);
    }
  }

  function generate() {
    const matrix = generateMapping(rows);
    if (!matrix) {
      alert('Please fill in all the values in the table!');
      return;
    }
    setResult({ mapping: serializeMapping(matrix), width: matrix.width, height: matrix.height });
  }

  function highlightLED(start: number, end?: number) {
    setSelectedLed(start);
    setSelectedLedEnd(end);
    device.send(highlightCommand(device.count, start, end));
  }

  return (
    <>
      <Preparations />
      <section>
        <div className="grid">
          <div className="col">WLED IP:</div>
          <div className="col">
            <input
              type="text"
              aria-label="WLED IP"
              value={ip}
              onChange={(event) => setIp(event.target.value)}
            />
          </div>
          <div className="col">
            <button onClick={start} disabled={connecting}>
              {connecting ? 'Connecting...' : 'Connect'}
            </button>
          </div>
        </div>
      </section>
      {device.error && (
        <section id="section_error">😢 Error while connecting to WLED! Reconnecting...</section>
      )}
      {device.connected && (
        <section id="section_info">
          👌 Connected. LED count: {device.count}.{imported && ' Mapping imported.'}
        </section>
      )}
      {device.started && (
        <MappingEditor
          rows={rows}
          setRows={setRows}
          count={device.count}
          connected={device.connected}
          selectedLed={selectedLed}
          selectedLedEnd={selectedLedEnd}
          highlightLED={highlightLED}
          highlightCenterLEDs={() => device.send(highlightCentersCommand(device.count, rows))}
          generateMapping={generate}
        />
      )}
      {result.mapping && (
        <MappingResult
          {...result}
          ip={ip}
          connected={device.connected}
          exportMapping={() =>
            notify(() => uploadMapping(ip, result.mapping), 'Mapping uploaded!', 'Failed saving ledmap.json')
          }
          configure2DMatrix={() =>
            notify(
              () => configureMatrix(ip, result.width, result.height),
              '2D matrix successfully configured!',
              'Failed configure 2D matrix in WLED',
            )
          }
          reboot={() => notify(() => rebootDevice(ip), 'Please wait ~10 seconds...', 'Failed reboot WLED')}
          testWLED={() => device.send(testCommand())}
        />
      )}
    </>
  );
}
