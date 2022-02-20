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
    console.log(`search ${input}`);
  }

  autocomplete(input: string) {
    console.log(`autocompeate ${input}`);
  }
}
