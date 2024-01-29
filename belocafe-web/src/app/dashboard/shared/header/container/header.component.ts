import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Input() isSidenavOpened!: boolean;
  @Output() showSidebar = new EventEmitter<boolean>();

  public toggleSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
    this.showSidebar.emit(this.isSidenavOpened);
  }
}
