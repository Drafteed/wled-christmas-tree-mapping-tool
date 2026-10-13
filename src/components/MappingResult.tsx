import { useEffect, useRef } from 'react';

interface Props {
  mapping: string;
  width: number;
  height: number;
  ip: string;
  connected: boolean;
  exportMapping: () => void;
  configure2DMatrix: () => void;
  reboot: () => void;
  testWLED: () => void;
}

export function MappingResult({
  mapping,
  width,
  height,
  ip,
  connected,
  exportMapping,
  configure2DMatrix,
  reboot,
  testWLED,
}: Props) {
  const mappingSection = useRef<HTMLElement>(null);
  useEffect(() => {
    mappingSection.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mapping]);

  return (
    <section ref={mappingSection}>
      <div className="header">
        <h3>Magic is coming!</h3>
      </div>
      <div className="text">
        <p>
          🎉 Your mapping is done!
          <br />
          Upload mapping to WLED, configure 2D matrix and reboot device.
        </p>
      </div>
      <textarea value={mapping} readOnly />
      <div className="submit">
        <div className="grid">
          <div className="col">
            <button disabled={!connected} onClick={exportMapping}>
              Upload mapping to WLED
            </button>
          </div>
          <div className="col">
            <button disabled={!connected} onClick={configure2DMatrix}>
              Configure 2D matrix in WLED
            </button>
          </div>
          <div className="col">
            <button disabled={!connected} onClick={reboot}>
              Reboot WLED
            </button>
          </div>
          <div className="col">
            <button disabled={!connected} onClick={testWLED}>
              Test run
            </button>
          </div>
        </div>
      </div>
      <div className="text">
        {/* Preserve text-node boundaries and link underline spacing from the original UI. */}
        {/* prettier-ignore */}
        <p>
          <b>Manual configuration</b>:<br/>
          Upload mapping to WLED via the <a href={`http://${ip}/edit`} target="_blank">File
          Editor</a> into <b>/ledmap.json</b> (create the file if it does not exist).<br/> Then
          setup <a href={`http://${ip}/settings/2D`} target="_blank">WLED into 2D
          mode</a> in <b>Setup &gt; 2D Configuration &gt; 2D Matrix &gt; Panel Dimensions</b> and
          enter your matrix dimensions (<b>{width}x{height}</b>).<br/>
          Save and <a href={`http://${ip}/reset`} target="_blank">fully reboot WLED</a>.
        </p>
      </div>
    </section>
  );
}
