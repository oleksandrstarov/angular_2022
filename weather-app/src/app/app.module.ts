import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestComponent } from './test/test.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { FovoritesListComponent } from './fovorites-list/fovorites-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestComponent,
    SearchComponent,
    LandingPageComponent,
    FooterComponent,
    LoaderComponent,
    FovoritesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
