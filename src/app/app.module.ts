import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoadMoreButtonComponent } from './components/load-more-button/load-more-button.component';
import { CardContainerComponent } from './components/card-container/card-container/card-container.component';
import { CardContentComponent } from './components/card-content/card-content/card-content.component';
import { ImageContainerComponent } from './components/image-container/image-container/image-container.component';
import { CardComponent } from './components/card/card/card.component';

@NgModule({
  imports: [BrowserModule, CommonModule],
  declarations: [AppComponent, LoadMoreButtonComponent, CardContainerComponent, CardContentComponent, ImageContainerComponent, CardComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
