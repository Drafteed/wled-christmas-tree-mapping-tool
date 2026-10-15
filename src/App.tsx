import {useState} from 'react';
import {Button} from './components/Button';
import {Input} from './components/Input';
import {MappingEditor} from './components/MappingEditor';
import {MappingResult} from './components/MappingResult';
import {Preparations} from './components/Preparations';
import {useWledConnection} from './hooks/useWledConnection';
import {createRow, generateMapping, importRows, serializeMapping} from './lib/mapping';
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
  const [rows, setRows] = useState(() => Array.from({length: 3}, createRow));
  const [result, setResult] = useState({mapping: '', width: 0, height: 0});
  const device = useWledConnection();
  const connecting = importing || device.connecting;

  async function start() {
    setImporting(true);
    try {
      const existing = await fetchMapping(ip);
      if (existing) {
        setRows(importRows(existing));
        setResult((current) => ({
          ...current,
          width: existing.width,
          height: existing.height,
        }));
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
    setResult({
      mapping: serializeMapping(matrix),
      width: matrix.width,
      height: matrix.height,
    });
  }

  function highlightLED(start: number, end?: number) {
    setSelectedLed(start);
    setSelectedLedEnd(end);
    device.send(highlightCommand(device.count, start, end));
  }

  return (
    <>
      <Preparations />
      <section className="my-2.5 rounded-xl bg-purple-50 p-5 even:bg-amber-50">
        <form
          className="grid gap-2.5 md:flex md:flex-wrap md:items-center"
          onSubmit={(event) => {
            event.preventDefault();
            if (!connecting) void start();
          }}
        >
          <div>WLED IP:</div>
          <div>
            <Input type="text" aria-label="WLED IP" value={ip} onChange={(event) => setIp(event.target.value)} />
          </div>
          <div>
            <Button type="submit" disabled={connecting}>
              {connecting ? 'Connecting...' : 'Connect'}
            </Button>
          </div>
        </form>
      </section>
      {device.error && (
        <section id="section_error" className="my-2.5 rounded-xl bg-red-500 p-5 text-white">
          😢 Error while connecting to WLED! Reconnecting...
        </section>
      )}
      {device.connected && (
        <section id="section_info" className="my-2.5 rounded-xl bg-purple-700 p-5 text-white">
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
