export function Preparations() {
  return (
    <section className="my-2.5 rounded-xl bg-purple-50 p-5 even:bg-amber-50">
      <div className="my-2.5 text-xl font-bold">
        <h3>Preparations</h3>
      </div>
      <div className="grid gap-5 md:grid-flow-col md:items-center md:justify-start">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 70 90" className="w-30">
            <path
              fill="#6bb42e"
              d="M27.22 90V75.17H0l19.44-24.73H7.78l19.44-24.72H15.56L35 1l19.44 24.72H42.78l19.44 24.72H50.56L70 75.17H42.78V90z"
            />
            <mask
              id="a"
              width="70"
              height="89"
              x="0"
              y="1"
              maskUnits="userSpaceOnUse"
              className="[mask-type:alpha]"
            >
              <path
                fill="#6bb42e"
                d="M27.22 90V75.17H0l19.44-24.73H7.78l19.44-24.72H15.56L35 1l19.44 24.72H42.78l19.44 24.72H50.56L70 75.17H42.78V90z"
              />
            </mask>
            <g stroke="#ffff05" strokeDasharray="0.1 3" strokeLinecap="round" mask="url(#a)">
              <path
                d="M.5-.5h63.14"
                transform="matrix(-0.999391 -0.0348995 0.02673 -0.999643 67.0532 69.9836)"
              />
              <path
                d="M.5-.5h63.14"
                transform="matrix(-0.999391 -0.0348995 0.02673 -0.999643 68.0537 58.2383)"
              />
              <path
                d="M.5-.5h63.14"
                transform="matrix(-0.999391 -0.0348995 0.02673 -0.999643 69.0532 46.4919)"
              />
              <path
                d="M.5-.5h63.14"
                transform="matrix(-0.999391 -0.0348995 0.02673 -0.999643 69.0527 34.7468)"
              />
              <path
                d="M.5-.5h63.14"
                transform="matrix(-0.999391 -0.0348995 0.02673 -0.999643 72.0532 23.0005)"
              />
              <path
                d="M.5-.5h63.14"
                transform="matrix(-0.999391 -0.0348995 0.02673 -0.999643 74.0532 11.2554)"
              />
            </g>
          </svg>
        </div>
        <div>
          <div className="my-4 max-w-3xl space-y-4">
            <p>Welcome to WLED Christmas Tree Lights Mapping Tool!</p>
            <p>
              Wrap your addressable LED strip around the tree from bottom to top so that you get even
              horizontal rows. Configure the required number of LEDs in WLED in the regular 1D mode. Make sure
              everything works correctly. Also make sure that the files <b>ledmap.json</b> (
              <b>ledmapX.json</b>) and <b>2d-gaps.json</b> are not present in the WLED File Editor.
            </p>
            <p className="opacity-50">
              <a className="underline" href="https://github.com/Drafteed/wled-christmas-tree-mapping-tool" target="_blank">
                Open project on GitHub
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
