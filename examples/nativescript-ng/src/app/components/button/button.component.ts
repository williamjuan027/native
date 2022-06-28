import { Component, Input } from '@angular/core'

@Component({
  selector: 'ns-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
    @Input() text: string | undefined = 'BUTTON';
    @Input() color: string | undefined  = 'yellow';
    @Input() backgroundColor: string | undefined  = 'red';

    ngOnChanges(): void {}
}
