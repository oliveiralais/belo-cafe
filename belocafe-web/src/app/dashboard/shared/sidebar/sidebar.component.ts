import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  showInputs: boolean = false;
  showActivities: boolean = false;
  showMachineSummaries: boolean = false;
  showBudgets: boolean = false;
  showEntries: boolean = false;
  showFinancialSummary: boolean = false;
}
