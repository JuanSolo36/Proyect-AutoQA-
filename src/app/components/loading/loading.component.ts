import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
})
export class LoadingComponent implements OnInit {
  @Input() display: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
