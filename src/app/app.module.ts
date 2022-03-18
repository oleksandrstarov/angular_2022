import { LoaderService } from './services/loader.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { TestComponent } from './test/test.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { DayForecastComponent } from './day-forecast/day-forecast.component';
import { WeatherService } from './services/weather.service';
import { DetailedColumnComponent } from './week-forecast/detailed-column/detailed-column.component';
import { FavoriteCityListService } from './services/favorite-city-list.service';
import { HttpErrorInterceptor } from 'src/http-interceptors/http-request-interceptor';
import { WeekForecastComponent } from './week-forecast/week-forecast.component';
import { SearchAutocompleteService } from './services/search-autocomplete.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestComponent,
    SearchComponent,
    LandingPageComponent,
    FooterComponent,
    LoaderComponent,
    FavoriteListComponent,
    DayForecastComponent,
    WeekForecastComponent,
    DetailedColumnComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    WeatherService,
    FavoriteCityListService,
    SearchAutocompleteService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
        useClass: HttpErrorInterceptor,
        multi: true,
    }],
  bootstrap: [AppComponent]
})

export class AppModule {
}
