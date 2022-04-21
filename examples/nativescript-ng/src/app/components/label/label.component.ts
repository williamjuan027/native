import { Component, Input } from '@angular/core'

@Component({
  selector: 'ns-label',
  templateUrl: './label.component.html',
})
export class LabelComponent {
    @Input() text: string | undefined = 'LABEL';
    @Input() color: string | undefined  = '#ffeedd';

    ngOnChanges(): void {}
}
