import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { PaymentDetail } from '../../shared/models/payment-detail.model';
import { CommonModule } from '@angular/common';
import { PaymentDetailService } from '../../shared/services/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { SucessMessageEnum } from '../../shared/enums/success-message.enum';
import { ErrorMessageEnum } from '../../shared/enums/error-message.enum';

@Component({
  selector: 'app-payment-detail-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './payment-detail-list.component.html',
  styles: ``
})
export class PaymentDetailListComponent {
  @Input() renderList: PaymentDetail[] = [];
  @Input() selectedPaymentDetail: PaymentDetail = new PaymentDetail();
  @Output() onDeleteCard = new EventEmitter();
  @Output() onSelectCard = new EventEmitter<PaymentDetail>();
  
  constructor(
    private readonly paymentDetailService: PaymentDetailService,
    private readonly toastrService: ToastrService
  ) { }

  deleteCard(paymentDetailId: number){
    this.paymentDetailService.deleteCard(paymentDetailId).subscribe({
      next: _ => {
        this.toastrService.success(SucessMessageEnum.DeletedCard, SucessMessageEnum.Title);
        this.onDeleteCard.emit();
      },
      error: err => {
        this.toastrService.error(err.error.detail, ErrorMessageEnum.Title);
      }
    });
  }

  selectCard(selectedCard: PaymentDetail){
    this.onSelectCard.emit(selectedCard);
  }

  getCardStyles(card: PaymentDetail) {
    return {
      'background': card.paymentDetailId === this.selectedPaymentDetail.paymentDetailId ? '#B3E6B3' : 'white',
      'border-radius': card.paymentDetailId === this.selectedPaymentDetail.paymentDetailId ? '10px' : '0px'
    };
  }
}
