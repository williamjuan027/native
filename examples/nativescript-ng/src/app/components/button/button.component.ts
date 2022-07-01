import { Component, Input } from '@angular/core'

@Component({
  selector: 'ns-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
    @Input() text: string | undefined = 'BUTTON';
    @Input() color: string | undefined  = '#FFF';
    @Input() backgroundColor: string | undefined  = '#75ACEB';
    @Input() borderColor: string | undefined = '#75ACEB';

    ngOnChanges(): void {}
}
