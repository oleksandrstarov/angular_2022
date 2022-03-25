import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DayTimeService {
  
  getBackgroundClassName(localDateTime: string) {
    const hour: number = parseInt(localDateTime.split(' ')[1]);
    switch (true) {
      case (hour >= 0 && hour < 6):
        return 'night';
      case (hour >= 6 && hour < 12):
        return 'morning';
      case (hour >= 18 && hour < 24):
        return 'evening';
      default:
        return 'day';
    }
  }

}
