import { Component, Inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  concatMap,
  of,
  scan,
  startWith,
  tap,
} from 'rxjs';
import { Page } from './products/page';
import { Product } from './products/product';
import { ProductService } from './products/product.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private pageNumber: number = 0;
  public products$: Observable<Page<Product>> = new Observable<Page<Product>>();
  public errorMessage: string | null = null;

  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.initializeProductStream();
  }

  initializeProductStream() {
    this.products$ = this.productService.loadMoreSubject.pipe(
      tap(() => this.setLoading(true)),
      concatMap(() => this.loadProducts()),
      scan(this.accumulateProducts)
    );
  }

  setLoading(isLoading: boolean) {
    this.productService.isLoading$.next(isLoading);
  }

  loadProducts() {
    return this.productService.get(++this.pageNumber).pipe(
      catchError((error) => this.handleError(error)),
      tap(() => this.setLoading(false))
    );
  }

  handleError(error: Error) {
    alert('Failed to load products!');
    console.error('Error loading products:', error);
    this.errorMessage = 'Failed to load products!';
    this.setLoading(false);
    return EMPTY;
  }

  accumulateProducts(acc: Page<Product>, value: Page<Product>) {
    return {
      more: value.more,
      content: [...acc.content, ...value.content]
    };
  }
}
