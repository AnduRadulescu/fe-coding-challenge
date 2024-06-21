import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { ImageContainerComponent } from '../../image-container/image-container/image-container.component';
import { CardContentComponent } from '../../card-content/card-content/card-content.component';
import { DOCUMENT } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComponent,  ImageContainerComponent, CardContentComponent],
      providers: [ { provide: DOCUMENT, useValue: document } ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open card url', () => {
    const url = 'https://www.example.com';
    const windowSpy = spyOn(window, 'open');

    component.openCardUrl(url);

    expect(windowSpy).toHaveBeenCalledWith(url, '_blank');
  });

  it('should have html with following structure', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('.card')).toBeTruthy();
    expect(compiled.querySelector('app-image-container')).toBeTruthy();
    expect(compiled.querySelector('app-card-content')).toBeTruthy();
  });

  it('should have div on first position and children app-img-container and app-card-container', () => {
    const div = debugElement.query(By.css('div'));
    const appImg = debugElement.query(By.css('app-image-container'));
    const appCard = debugElement.query(By.css('app-card-content'));

    expect(div.children[0]).toBe(appImg);
    expect(div.children[1]).toBe(appCard);
  });
});
