import { ChangeDetectionStrategy, Component, input } from '@angular/core';

interface Needle { x: number; y: number; r: number; d: number }

const COLS = 26;
const ROWS = 12;
const GAP = 46;
/** The one reference that never moves: every other needle settles onto its bearing. */
const REF = { c: 19, r: 4 };

/**
 * Hero figure from the brand's "Calibrated Bearing" idea: a field of compass needles,
 * each with its own drift, that align on north in a wave spreading out from one fixed
 * orange reference. This is the site's single orchestrated motion; it is static under
 * reduced motion. Angles come from a seeded generator so server and browser render the same.
 */
@Component({
  selector: 'tn-needle-field',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.viewBox]="viewBox" preserveAspectRatio="xMidYMid slice" role="img" [attr.aria-label]="label()">
      @for (n of needles; track $index) {
        <g [attr.transform]="'translate(' + n.x + ' ' + n.y + ')'">
          <path class="n" d="M0 -11 L2.2 0 L0 11 L-2.2 0 Z" [style.--r.deg]="n.r" [style.--d.ms]="n.d" />
        </g>
      }
      <g [attr.transform]="'translate(' + ref.x + ' ' + ref.y + ')'" class="ref">
        <circle r="17" />
        <path d="M0 -13 L3.2 0 L-3.2 0 Z" class="ref-n" />
        <path d="M0 13 L-3.2 0 L3.2 0 Z" class="ref-s" />
      </g>
    </svg>
  `,
  styles: `
    :host { display: block; position: absolute; inset: 0; pointer-events: none; }
    svg { width: 100%; height: 100%; display: block;
          -webkit-mask-image: linear-gradient(to right, transparent 8%, rgba(0,0,0,.35) 38%, #000 62%);
          mask-image: linear-gradient(to right, transparent 8%, rgba(0,0,0,.35) 38%, #000 62%); }
    :host-context([dir='rtl']) svg { transform: scaleX(-1); }
    .n { fill: rgba(241,243,239,.34); transform-box: fill-box; transform-origin: center;
         transform: rotate(0deg); animation: align 2600ms cubic-bezier(.2,.75,.25,1) var(--d) both; }
    @keyframes align {
      from { transform: rotate(var(--r)); }
      70% { transform: rotate(calc(var(--r) * -0.06)); }
      to { transform: rotate(0deg); }
    }
    .ref circle { fill: none; stroke: rgba(242,106,27,.55); stroke-width: 1; }
    .ref-n { fill: var(--signal); }
    .ref-s { fill: rgba(241,243,239,.9); }
    @media (prefers-reduced-motion: reduce) { .n { animation: none; } }
  `,
})
export class NeedleFieldComponent {
  readonly label = input('');
  readonly viewBox = `0 0 ${COLS * GAP} ${ROWS * GAP}`;
  readonly ref = { x: REF.c * GAP + GAP / 2, y: REF.r * GAP + GAP / 2 };
  readonly needles: Needle[] = [];

  constructor() {
    let seed = 7;
    const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (r === REF.r && c === REF.c) continue;
        const dist = Math.hypot(c - REF.c, r - REF.r);
        this.needles.push({
          x: c * GAP + GAP / 2,
          y: r * GAP + GAP / 2,
          r: Math.round((rand() * 2 - 1) * (60 + dist * 6)),
          d: Math.round(250 + dist * 85 + rand() * 120),
        });
      }
    }
  }
}
