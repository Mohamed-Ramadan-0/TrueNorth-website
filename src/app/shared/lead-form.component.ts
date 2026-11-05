import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LangService } from '../core/lang.service';
import { SITE } from '../core/site';

@Component({
  selector: 'tn-lead-form',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './lead-form.component.html',
})
export class LeadFormComponent {
  /** Where the form sits (and which solution, if any), sent with the lead. */
  readonly source = input('home');
  /** Preselects the industry, e.g. on a solution page. */
  readonly industry = input<string>('');

  private readonly i18n = inject(LangService);
  readonly f = computed(() => this.i18n.t().form);
  readonly email = SITE.email;
  readonly state = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  readonly submitted = signal(false);
  private readonly http = inject(HttpClient);

  readonly form = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(80)]],
    company: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(160)]],
    whatsapp: ['', [Validators.pattern(/^\+?[0-9\s-]{9,18}$/)]],
    industry: ['', Validators.required],
    need: ['', Validators.maxLength(1000)],
    website: [''], // honeypot, hidden from people
  });

  ngOnInit(): void {
    if (this.industry()) this.form.controls.industry.setValue(this.industry());
  }

  invalid(name: keyof typeof this.form.controls): boolean {
    const c = this.form.controls[name];
    return c.invalid && (c.touched || this.submitted());
  }

  submit(): void {
    this.submitted.set(true);
    if (this.form.invalid || this.state() === 'sending') return;
    this.state.set('sending');
    this.http
      .post('/api/leads', { ...this.form.getRawValue(), source: this.source(), lang: this.i18n.lang() })
      .subscribe({ next: () => this.state.set('sent'), error: () => this.state.set('error') });
  }
}
