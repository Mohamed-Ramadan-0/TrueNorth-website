import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** The TrueNorth compass mark: a ring and a needle whose north half carries the signal orange. */
@Component({
  selector: 'tn-mark',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" stroke-width="1.5" opacity=".55" />
      <path d="M16 3.5 L20 16 L12 16 Z" fill="var(--signal)" />
      <path d="M16 28.5 L12 16 L20 16 Z" fill="currentColor" />
      <circle cx="16" cy="16" r="1.6" fill="var(--paper)" />
    </svg>
  `,
  styles: `:host{display:inline-flex;line-height:0}`,
})
export class MarkComponent {
  readonly size = input(28);
}
