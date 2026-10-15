import type { Dispatch, SetStateAction } from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { createRow, type MappingRowValues } from '../lib/mapping';

interface Props {
  rows: MappingRowValues[];
  count: number;
  connected: boolean;
  selectedLed: number;
  selectedLedEnd: number | undefined;
  highlightLED: (start: number, end?: number) => void;
  highlightCenterLEDs: () => void;
  generateMapping: () => void;
  setRows: Dispatch<SetStateAction<MappingRowValues[]>>;
}

export function MappingEditor({
  rows,
  count,
  connected,
  selectedLed,
  selectedLedEnd,
  highlightLED,
  highlightCenterLEDs,
  generateMapping,
  setRows,
}: Props) {
  function updateRow(index: number, field: keyof MappingRowValues, value: string) {
    setRows((current) =>
      current.map((row, i) =>
        i === index ? { ...row, [field]: value === '' ? '' : parseInt(value, 10) } : row,
      ),
    );
  }

  function highlightRow(row: MappingRowValues) {
    if (row.left === '' || row.right === '') {
      alert('Please fill in all the values in the row!');
      return;
    }
    highlightLED(Math.min(row.left, row.right), Math.max(row.left, row.right));
  }

  return (
    <section className="my-2.5 rounded-xl bg-purple-50 p-5 even:bg-amber-50">
      <div className="my-2.5 text-xl font-bold">
        <h3>Let's generate your matrix!</h3>
      </div>
      <div className="my-4 max-w-3xl space-y-4">
        <p>
          🎄 Take a look at your beautiful tree! Calculate the number of rows (lines) vertically and add the
          corresponding number of rows. Then, for each row, find the <b>leftmost</b> and <b>rightmost</b> LED
          number.
        </p>
        <p>
          🔎 The slider below will help you locate and identify the number of each LED.<br/>
          ✅ You can verify that the row is filled correctly by clicking the <b>Highlight</b> button.<br/>
          ⚠️ For the initial setup, you can leave the offsets at 0.<br/>
          ℹ️ Once the rows are set, you can highlight the center LED in each row to adjust the offsets.
        </p>
      </div>

      <hr className="my-4 border-gray-800" />
      <div className="my-2.5">
        {connected ? (
          <div className="my-2.5">
            Highlighted LED Number: {selectedLed}
            {selectedLedEnd && ` - ${selectedLedEnd}`}
          </div>
        ) : (
          <div className="my-2.5 text-red-600">
            WLED disconnected. Reconnecting...
          </div>
        )}

        <input
          type="range"
          min="0"
          max={count - 1}
          disabled={!connected}
          value={selectedLed}
          onChange={(e) => highlightLED(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
      <hr className="my-4 border-gray-800" />
      <div className="overflow-auto">
        <table className="border-separate border-spacing-0.5 [&_td]:p-1 [&_td]:whitespace-nowrap md:[&_td]:px-2.5">
          <thead>
            <tr>
              <td></td>
              <td>Left LED</td>
              <td>Right LED</td>
              <td>Offset</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {rows
              .map((row, i) => (
                <tr key={i}>
                  <td>Row {i + 1}</td>
                  {(['left', 'right', 'offset'] as const).map((field) => (
                    <td key={field}>
                      <Input
                        type="number"
                        min={field === 'offset' ? -count - 1 : 0}
                        max={count - 1}
                        aria-label={`Row ${i + 1} ${field}`}
                        value={row[field]}
                        onChange={(event) => updateRow(i, field, event.target.value)}
                      />
                    </td>
                  ))}
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div>
                        <Button disabled={!connected} onClick={() => highlightRow(row)}>
                          Highlight
                        </Button>
                      </div>
                      <div>
                        <Button
                          onClick={() => setRows((current) => current.filter((_, index) => index !== i))}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
      <div className="mt-5">
        <div className="grid gap-2.5 md:flex md:flex-wrap md:items-center">
          <div>
            <Button onClick={generateMapping}>
              Generate mapping
            </Button>
          </div>
          <div>
            <Button onClick={() => setRows((current) => [...current, createRow()])}>
              Add row
            </Button>
          </div>
          <div>
            <Button disabled={!connected} onClick={highlightCenterLEDs}>
              Highlight center LEDs
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
