import { Component, Input } from '@angular/core';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.scss']
})
export class CardContentComponent {
  @Input() product: Product | null = null
}
