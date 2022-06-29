import { Component, Input } from '@angular/core'

@Component({
  selector: 'ns-card',
  templateUrl: './card.component.html',
})
export class CardComponent {
    @Input() title: string | undefined = 'Bali';
    @Input() content: string | undefined = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    @Input() imageSrc: string | undefined = 'https://images.unsplash.com/photo-1571984405176-5958bd9ac31d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80';
    @Input() boxShadow: string | undefined = '1 1 5 5 rgba(0,0,0,0.5)'
    @Input() borderRadius: number | undefined = 30;

    ngOnChanges(): void {}
}
