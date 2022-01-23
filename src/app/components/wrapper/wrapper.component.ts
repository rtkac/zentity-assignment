import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-wrapper-component',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  @Input() iconPath = '';
  @Input() iconTitle = '';
  @Input() title = '';
}
