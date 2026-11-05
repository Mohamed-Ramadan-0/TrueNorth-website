import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

export const PLATFORMS = ['سلة', 'زد', 'Shopify', 'WooCommerce', 'موقع خاص', 'لسه معنديش متجر'];
export const ORDER_RANGES = ['أقل من 300', '300 لـ 1,000', '1,000 لـ 3,000', 'أكتر من 3,000'];

@Component({
  selector: 'tn-lead-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lead-form.component.html',
})
export class LeadFormComponent {
  /** Where the form sits, sent with the lead so we know which CTA converts. */
  readonly source = input('home');
  readonly platforms = PLATFORMS;
  readonly ranges = ORDER_RANGES;
  readonly state = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  readonly submitted = signal(false);

  private readonly http = inject(HttpClient);
  readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    store: ['', [Validators.required, Validators.maxLength(120)]],
    platform: ['', Validators.required],
    monthlyOrders: ['', Validators.required],
    whatsapp: ['', [Validators.required, Validators.pattern(/^\+?[0-9\s-]{9,18}$/)]],
    website: [''], // honeypot, hidden from people
  });

  invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.invalid || this.state() === 'sending') return;
    this.state.set('sending');
    this.http.post('/api/leads', { ...this.form.getRawValue(), source: this.source() }).subscribe({
      next: () => this.state.set('sent'),
      error: () => this.state.set('error'),
    });
  }
}
