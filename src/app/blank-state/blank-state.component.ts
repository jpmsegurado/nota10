import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'blank-state',
  templateUrl: './blank-state.component.html',
  styleUrls: ['./blank-state.component.css']
})
export class BlankStateComponent implements OnInit {

  @Input() icon;

  constructor() { }

  ngOnInit() {
  }

}
