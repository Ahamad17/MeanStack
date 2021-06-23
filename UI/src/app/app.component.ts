import { Component } from '@angular/core';
import { PortfolioService } from 'src/app/portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portfolio';
  details = null;
  constructor(private portfolioService: PortfolioService) {
    this.portfolioService.getDetails().subscribe((data: any) => {
      this.details = data[0].details;
      console.log(this.details);
    });
  }
}
