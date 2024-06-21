import { Component } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-load-more-button',
  templateUrl: './load-more-button.component.html',
  styleUrls: ['./load-more-button.component.scss']
})
export class LoadMoreButtonComponent {

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private readonly productService: ProductService) { }

  ngOnInit(): void {
    this.isLoading$ = this.productService.isLoading$;
  }

  public loadMore(): void {
    this.productService.loadMoreSubject.next();
  }

}
