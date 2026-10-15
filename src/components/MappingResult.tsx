import { useEffect, useRef } from 'react';
import { Button } from './Button';

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
    <section ref={mappingSection} className="my-2.5 rounded-xl bg-purple-50 p-5 even:bg-amber-50">
      <div className="my-2.5 text-xl font-bold">
        <h3>Magic is coming!</h3>
      </div>
      <div className="my-4 max-w-3xl space-y-4">
        <p>
          🎉 Your mapping is done!
          <br />
          Upload mapping to WLED, configure 2D matrix and reboot device.
        </p>
      </div>
      <textarea
        className="h-100 w-full rounded border-0 bg-white p-2 font-mono text-base"
        value={mapping}
        readOnly
      />
      <div className="mt-5">
        <div className="grid gap-2.5 md:flex md:flex-wrap md:items-center">
          <div>
            <Button disabled={!connected} onClick={exportMapping}>
              Upload mapping to WLED
            </Button>
          </div>
          <div>
            <Button disabled={!connected} onClick={configure2DMatrix}>
              Configure 2D matrix in WLED
            </Button>
          </div>
          <div>
            <Button disabled={!connected} onClick={reboot}>
              Reboot WLED
            </Button>
          </div>
          <div>
            <Button disabled={!connected} onClick={testWLED}>
              Test run
            </Button>
          </div>
        </div>
      </div>
      <div className="my-4 max-w-3xl space-y-4">
        <p>
          <b>Manual configuration</b>:<br/>
          Upload mapping to WLED via the <a className="underline" href={`http://${ip}/edit`} target="_blank">File
          Editor</a> into <b>/ledmap.json</b> (create the file if it does not exist).<br/> Then
          setup <a className="underline" href={`http://${ip}/settings/2D`} target="_blank">WLED into 2D
          mode</a> in <b>Setup &gt; 2D Configuration &gt; 2D Matrix &gt; Panel Dimensions</b> and
          enter your matrix dimensions (<b>{width}x{height}</b>).<br/>
          Save and <a className="underline" href={`http://${ip}/reset`} target="_blank">fully reboot WLED</a>.
        </p>
      </div>
    </section>
  );
}
