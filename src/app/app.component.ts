import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentDetailFormComponent } from './payment-details/payment-detail-form/payment-detail-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    PaymentDetailsComponent
  ],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'PaymentApp';
}
