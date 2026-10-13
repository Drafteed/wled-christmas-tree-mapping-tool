import type { Dispatch, SetStateAction } from 'react';
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
    <section>
      <div className="header">
        <h3>Let's generate your matrix!</h3>
      </div>
      <div className="text">
        {/* Preserve the original text-node boundaries for identical text layout. */}
        {/* prettier-ignore */}
        <p>
          🎄 Take a look at your beautiful tree! Calculate the number of rows (lines) vertically and add the
          corresponding number of rows. Then, for each row, find the <b>leftmost</b> and <b>rightmost</b> LED
          number.
        </p>
        {/* prettier-ignore */}
        <p>
          🔎 The slider below will help you locate and identify the number of each LED.<br/>
          ✅ You can verify that the row is filled correctly by clicking the <b>Highlight</b> button.<br/>
          ⚠️ For the initial setup, you can leave the offsets at 0.<br/>
          ℹ️ Once the rows are set, you can highlight the center LED in each row to adjust the offsets.
        </p>
      </div>

      <hr />
      <div className="group">
        {connected ? (
          <div className="group">
            Highlighted LED Number: {selectedLed}
            {selectedLedEnd && ` - ${selectedLedEnd}`}
          </div>
        ) : (
          <div className="group" style={{ color: 'red' }}>
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
          style={{ width: '100%' }}
        />
      </div>
      <hr />
      <div className="generator">
        <table className="table">
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
                      <input
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
                    <div className="grid" style={{ display: 'flex' }}>
                      <div className="col">
                        <button disabled={!connected} onClick={() => highlightRow(row)}>
                          Highlight
                        </button>
                      </div>
                      <div className="col">
                        <button
                          onClick={() => setRows((current) => current.filter((_, index) => index !== i))}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
              .reverse()}
          </tbody>
        </table>
      </div>
      <div className="submit">
        <div className="grid">
          <div className="col">
            <button onClick={generateMapping}>Generate mapping</button>
          </div>
          <div className="col">
            <button onClick={() => setRows((current) => [...current, createRow()])}>Add row</button>
          </div>
          <div className="col">
            <button disabled={!connected} onClick={highlightCenterLEDs}>
              Highlight center LEDs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
