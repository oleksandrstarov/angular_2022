import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  defaultCity = "Kyiv";

  constructor() { }

  ngOnInit(): void {
  }

  searchLocation(input: string = this.defaultCity) {
    if (input) {
      console.log(`search ${input}`);
    }
  }

  autocomplete(input: string) {
    if (input.length > 2) {
      console.log(`autocompeate ${input}`);
    }
  }
}
