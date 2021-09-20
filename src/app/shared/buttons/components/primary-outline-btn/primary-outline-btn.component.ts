import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-primary-outline-btn',
  templateUrl: './primary-outline-btn.component.html',
  styleUrls: ['./primary-outline-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimaryOutlineBtnComponent {
  @Input() text: string = '';
  @Input() icon?: string = '';
  @Input() fullWidth: boolean = false;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() ghost: boolean = false;
  @Input() iconStatus: string = '';
  @Input() styles: any;
}
