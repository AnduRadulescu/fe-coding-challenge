import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { Product } from 'src/app/products/product';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: Product | null = null;
  private window: Window;

  constructor(@Inject(DOCUMENT) private document: Document) { this.window = this.document.defaultView!;}

  public openCardUrl(url: string | null ): void{
    if(url){
      this.window.open(url, '_blank');
    }
  }

}
