import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Tick { x1: number; y1: number; x2: number; y2: number; major: boolean }

/**
 * Hero instrument: a compass dial whose needle drifts and then settles on north.
 * The settling needle is the page's one orchestrated motion; it is skipped under reduced motion.
 */
@Component({
  selector: 'tn-dial',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg viewBox="-210 -210 420 420" role="img" aria-label="بوصلة إبرتها بتستقر على الشمال">
      <circle r="196" class="ring" />
      <circle r="150" class="ring faint" />
      <circle r="92" class="ring faint" />
      @for (t of ticks; track $index) {
        <line [attr.x1]="t.x1" [attr.y1]="t.y1" [attr.x2]="t.x2" [attr.y2]="t.y2" [class.major]="t.major" class="tick" />
      }
      <line x1="0" y1="-200" x2="0" y2="200" class="meridian" />
      <line x1="-200" y1="0" x2="200" y2="0" class="meridian" />
      <text y="-166" class="north">N</text>
      <g class="needle">
        <path d="M0 -140 L13 0 L-13 0 Z" class="n" />
        <path d="M0 140 L-13 0 L13 0 Z" class="s" />
        <circle r="5" class="hub" />
      </g>
    </svg>
  `,
  styles: `
    :host { display: block; }
    svg { width: 100%; height: auto; overflow: visible; }
    .ring { fill: none; stroke: rgba(241,243,239,.42); stroke-width: 1.2; }
    .ring.faint { stroke: rgba(241,243,239,.12); }
    .tick { stroke: rgba(241,243,239,.35); stroke-width: 1; }
    .tick.major { stroke: rgba(241,243,239,.8); stroke-width: 1.6; }
    .meridian { stroke: rgba(241,243,239,.08); stroke-dasharray: 2 6; }
    .north { fill: var(--signal); font: 600 18px var(--display); text-anchor: middle; }
    .needle { transform-origin: 0 0; animation: settle 3.2s cubic-bezier(.3,.7,.2,1) .3s both; }
    .n { fill: var(--signal); }
    .s { fill: rgba(241,243,239,.85); }
    .hub { fill: var(--ink); stroke: var(--paper); stroke-width: 2; }
    @keyframes settle {
      0% { transform: rotate(-52deg); }
      30% { transform: rotate(21deg); }
      52% { transform: rotate(-9deg); }
      70% { transform: rotate(3.5deg); }
      85% { transform: rotate(-1deg); }
      100% { transform: rotate(0deg); }
    }
    @media (prefers-reduced-motion: reduce) { .needle { animation: none; } }
  `,
})
export class DialComponent {
  readonly ticks: Tick[] = Array.from({ length: 120 }, (_, i) => {
    const a = (i * 3 * Math.PI) / 180;
    const major = i % 10 === 0;
    const r1 = 196;
    const r2 = major ? 180 : 188;
    const round = (n: number) => Math.round(n * 100) / 100;
    return {
      x1: round(Math.sin(a) * r1), y1: round(-Math.cos(a) * r1),
      x2: round(Math.sin(a) * r2), y2: round(-Math.cos(a) * r2),
      major,
    };
  });
}
