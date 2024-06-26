import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadMoreButtonComponent } from './load-more-button.component';
import { ProductService } from 'src/app/products/product.service';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { Page } from 'src/app/products/page';
import { Product } from 'src/app/products/product';

export class MockProductService {
  public loadMoreSubject = new Subject<void>();
  public isLoading$ = new BehaviorSubject<boolean>(false);
  get():  Observable<Page<Product>> {
    return of(
      {
        content: [
          {
            url: 'https://example.com/image.png',
            title: 'Product 1',
            description: 'Description 1',
            image: '',
            categories: [''],
          },
        ],
        more: true,
      },
    );
  }
}

describe('LoadMoreButtonComponent', () => {
  let component: LoadMoreButtonComponent;
  let fixture: ComponentFixture<LoadMoreButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadMoreButtonComponent],
      providers: [{ provide: ProductService, useClass: MockProductService }],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadMoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get true value from isLoading subject when this one is triggered', () => {
    const productService = TestBed.inject(ProductService);

    productService.isLoading$.next(true);

    component.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBeTrue();
    });
  });

  it('should load more ', () => {
    const productService = TestBed.inject(ProductService);
    const spy = spyOn(productService.loadMoreSubject, 'next');

    component.loadMore();

    expect(spy).toHaveBeenCalled();
  });
});
