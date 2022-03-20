import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {

  private isLoadingSource = new BehaviorSubject<boolean>(false);

  public isLoading: Observable<boolean> = this.isLoadingSource.asObservable();

  constructor() {
  }

  show() {
    this.isLoadingSource.next(true);
  }

  hide() {
    this.isLoadingSource.next(false);
  }
}

