import { Component, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() correctNameFlag: string = '';
  @Input() duration: number = 2000; // Time in milliseconds
  showPopup: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showAndHidePopup() {
    this.showPopup = true;
    setTimeout(() => {
      this.showPopup = false;
    }, this.duration);
  }


}
