import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContentComponent } from './card-content.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CardContentComponent', () => {
  let component: CardContentComponent;
  let fixture: ComponentFixture<CardContentComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have div on first position and h3, description-container and categories as children ', () => {
    fixture.componentInstance.product = {
      image: 'image-url',
      title: 'Product title',
      url: '',
      description: '',
      categories: ['category1', 'category2'],
    };
    fixture.detectChanges();

    const div = debugElement.query(By.css('div'));
    const h3 = debugElement.query(By.css('h3'));
    const descriptionContainer = debugElement.query(
      By.css('.description-container')
    );
    const categories = debugElement.queryAll(By.css('.category'));

    expect(div.children[0]).toBe(h3);
    expect(div.children[1]).toBe(descriptionContainer);
    expect(div.children[2]).toBe(categories[0]);
    expect(div.children[3]).toBe(categories[1]);
  });

  it('should have h3 with product title', () => {
    fixture.componentInstance.product = {
      image: 'image-url',
      title: 'Product title',
      url: '',
      description: '',
      categories: ['category1', 'category2'],
    };
    fixture.detectChanges();

    const h3 = debugElement.query(By.css('h3'));

    expect(h3.nativeElement.textContent).toBe('Product title');
  });

  it('should have div with class description-container and p as child with description on it', () => {
    fixture.componentInstance.product = {
      image: 'image-url',
      title: 'Product title',
      url: '',
      description: 'some description',
      categories: ['category1', 'category2'],
    };
    fixture.detectChanges();

    const descriptionContainer = debugElement.query(
      By.css('.description-container')
    );
    const description = debugElement.query(By.css('p'));

    expect(descriptionContainer.children[0]).toBe(description);
    expect(description.attributes['class']).toBe('description');
    expect(description.nativeElement.textContent).toBe('some description');
  });

  it('should have div categories with category name', () => {
    fixture.componentInstance.product = {
      image: 'image-url',
      title: 'Product title',
      url: '',
      description: '',
      categories: ['category1', 'category2'],
    };

    fixture.detectChanges();

    const categories = debugElement.queryAll(By.css('.category'));

    expect(categories[0].attributes['class']).toBe('category');
    expect(categories[0].nativeElement.textContent).toBe('category1');
    expect(categories[1].nativeElement.textContent).toBe('category2');
  });
});
