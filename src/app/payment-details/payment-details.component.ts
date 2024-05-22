import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PaymentDetailFormComponent } from './payment-detail-form/payment-detail-form.component';
import { PaymentDetailService } from '../shared/services/payment-detail.service';
import { PaymentDetail } from '../shared/models/payment-detail.model';
import { PaymentDetailListComponent } from './payment-detail-list/payment-detail-list.component';
import { ErrorMessageEnum } from '../shared/enums/error-message.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [
    CommonModule, 
    PaymentDetailFormComponent,
    PaymentDetailListComponent
  ],
  templateUrl: './payment-details.component.html',
  styles: ``
})
export class PaymentDetailsComponent implements OnInit {

  cardsList: PaymentDetail[] = [];
  paymentDetailItem: PaymentDetail = new PaymentDetail();

  constructor(
    private readonly paymentDetailsService: PaymentDetailService,
    private readonly toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getCards();
  }

  async getCards() {
    this.paymentDetailsService.refreshList().subscribe({
      next: (cards: PaymentDetail[]) => {
        this.cardsList = cards;
      },
      error: (err) => {
        this.toastrService.error(err.error.detail, ErrorMessageEnum.Title);
      },
    });
  }

  populateForm(selectedCard: PaymentDetail){
    this.paymentDetailItem = Object.assign({}, selectedCard);
  }

  resetSelectedItem(){
    this.paymentDetailItem = new PaymentDetail();
  }
  
}
