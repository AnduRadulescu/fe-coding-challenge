import { Component, Input } from '@angular/core';
import { Page } from 'src/app/products/page';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent {

  @Input() products: Page<Product> | null = null;

}
