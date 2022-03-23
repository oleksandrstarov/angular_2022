import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map, Observable, of, startWith, switchMap } from 'rxjs';
import { SearchAutocompleteService } from '../services/search-autocomplete.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  @ViewChild(MatAutocompleteTrigger) autocomplete: MatAutocompleteTrigger = {} as MatAutocompleteTrigger;

  defaultCity = "Kyiv";
  public myControl = new FormControl();
  public filteredOptions: Observable<any[]> = new Observable();
  public array = [];
  public showNotFoundError = false;
  public inputValue: string = '';

  private isInputValid: boolean = false;

  constructor(private searchAutoCompleteService: SearchAutocompleteService, private router: Router) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(val => {
        return this.filter(val || '')
      })
    )
  }

  filter(val: string): Observable<any[]> {
    this.showNotFoundError = false;
    this.isInputValid = false;
    if (val.length < 3) {
      return of([]);
    }
    return this.searchAutoCompleteService.getCities(val)
      .pipe(
        map((response: any) => {
          const filteredOptions: any[] = response.filter(
            (option: any) => option.name.toLowerCase().indexOf(val.toLowerCase()) === 0);

            this.showNotFoundError = !filteredOptions.length

            this.isInputValid = filteredOptions.some( (option: any) => option.name.toLowerCase() === this.inputValue.toLowerCase());

          return filteredOptions;
        })
      );
  }

  routeToDayForecast(event: any): void {
    if (this.showNotFoundError === false && this.isInputValid && this.inputValue !== '') {
      this.autocomplete.closePanel();
      this.router.navigate(['details', this.inputValue]);
      this.inputValue = ''; 
    }

    event.stopPropagation();
  }

  selectCity(event: any) {
    const selectedValue = event.option.value;
    this.autocomplete.closePanel();
    this.inputValue = ''; 

    this.router.navigate(['details', selectedValue]);
 }
}
