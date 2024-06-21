import { Component, Input } from '@angular/core';
import { Product } from '@ngneat/falso';
import { Page } from 'src/app/products/page';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent {

  @Input() products: any = null;

}
