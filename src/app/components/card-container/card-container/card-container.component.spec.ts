import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardContainerComponent } from './card-container.component';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, Input } from '@angular/core';
import { CardComponent } from '../../card/card/card.component';

@Component({
  selector: 'app-card',
  template: `
  <div class="card-container">
    <ng-container *ngFor="let product of products?.content">
      <app-card [product]="product"></app-card>
    </ng-container>
  </div>`,
})
class MockCardComponent {
  @Input() product: any = null;
}

describe('CardContainerComponent', () => {
  let component: CardContainerComponent;
  let fixture: ComponentFixture<CardContainerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardContainerComponent, MockCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have div on first position and app card as it s children ', () => {
    fixture.componentInstance.products = {
      content: [
        {
          title: 'Product title',
          description: 'some description',
          categories: ['category1', 'category2'],
        },
        {
          title: 'Product title',
          description: 'some description',
          categories: ['category1', 'category2'],
        },
      ],
      more: true,
    };
    fixture.detectChanges();

    const div = debugElement.query(By.css('.card-container'));
    const appCards = debugElement.queryAll(By.css('app-card'));

    expect(div.children[0]).toBe(appCards[0]);
    expect(div.children[1]).toBe(appCards[1]);
  });
});
