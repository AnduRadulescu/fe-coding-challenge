import { LoadMoreButtonComponent } from './components/load-more-button/load-more-button.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockProductService } from './components/load-more-button/load-more-button.component.spec';
import { ProductService } from './products/product.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-card-container',
  template: ''
})
class MockAppCardContainerComponent {
  @Input() products: any = null;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let debugElement: DebugElement;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, MockAppCardContainerComponent, LoadMoreButtonComponent],
      providers: [{ provide: ProductService, useClass: MockProductService}]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    productService = TestBed.inject(ProductService);
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a div as main first element with app-card-container as child, then app-load-more-button', () => {
    spyOn(productService, 'get').and.callThrough();
    productService.loadMoreSubject.next();

    fixture.detectChanges();

    const div = debugElement.query(By.css('.products'));
    const appCardContainer = debugElement.query(By.css('app-card-container'));
    const appLoadMoreButton = debugElement.query(By.css('app-load-more-button'));

    expect(div.children[0]).toBe(appCardContainer);
    expect(debugElement.children[1]).toBe(appLoadMoreButton);
  });

  it('should show alert with error message when error is thorown', () => {
    spyOn(productService, 'get').and.callFake(() => {return throwError(() => new Error('400 Bad Request')) });
    spyOn(window, 'alert');
    spyOn(productService.isLoading$, 'next');

    productService.loadMoreSubject.next();
    fixture.detectChanges();
    const errorElement = debugElement.query(By.css('.error'));

    expect(window.alert).toHaveBeenCalled();
    expect(productService.isLoading$.next).toHaveBeenCalledWith(false);
  });

  it('should show loading icon when button is clicked', () => {
    spyOn(productService, 'get').and.callThrough();
    spyOn(productService.isLoading$, 'next');

    productService.loadMoreSubject.next();
    fixture.detectChanges();

    expect(productService.isLoading$.next).toHaveBeenCalledWith(false);
  });

  xit('should acumulate products when button is clicked', () => {
    spyOn(productService, 'get').and.callThrough();
    spyOn(productService.isLoading$, 'next');

    productService.loadMoreSubject.next();
    // productService.loadMoreSubject.next();
    fixture.detectChanges();

    component.products$.subscribe((products) => {
      expect(products.content.length).toBeGreaterThan(4);
    });
  });
});
