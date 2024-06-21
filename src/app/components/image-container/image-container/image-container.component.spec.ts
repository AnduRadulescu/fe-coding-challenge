import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageContainerComponent } from './image-container.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ImageContainerComponent', () => {
  let component: ImageContainerComponent;
  let fixture: ComponentFixture<ImageContainerComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have div on first position and img as child ', () => {
    const div = debugElement.query(By.css('div'));
    const img = debugElement.query(By.css('img'));

    expect(div.children[0]).toBe(img);
  });

  it('should have div with class image-container and img with src and alt ', () => {
    fixture.componentInstance.product = {image: 'image-url', title: 'Product title', url:'', description: '', categories: ['']};
    fixture.detectChanges();

    const div = debugElement.query(By.css('div'));
    const img = debugElement.query(By.css('img'));

    expect(div.attributes['class']).toBe('image-container');
    expect(img.attributes['src']).toBe('image-url');
    expect(img.attributes['alt']).toBe('Product title');
  });
});
