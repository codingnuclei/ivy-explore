import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nested-component',
  templateUrl: './nested-component.component.html',
  styleUrls: ['./nested-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NestedComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
