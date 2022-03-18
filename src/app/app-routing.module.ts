import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DayForecastComponent } from './day-forecast/day-forecast.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { WeekForecastComponent } from './week-forecast/week-forecast.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'details/', component: DayForecastComponent },
  { path: 'details/:city', component: DayForecastComponent },
  { path: 'forecast', component: WeekForecastComponent },
  { path: 'forecast/:city', component: WeekForecastComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
