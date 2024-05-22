import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentDetail } from '../../shared/models/payment-detail.model';
import { PaymentDetailService } from '../../shared/services/payment-detail.service';
import { ToastrService } from 'ngx-toastr';
import { SucessMessageEnum } from '../../shared/enums/success-message.enum';
import { ErrorMessageEnum } from '../../shared/enums/error-message.enum';

@Component({
  selector: 'app-payment-detail-form',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule
  ],
  templateUrl: './payment-detail-form.component.html',
  styles: ``
})
export class PaymentDetailFormComponent {

  @Input() formData: PaymentDetail = new PaymentDetail();
  @Output() onCardRequest = new EventEmitter();
  @Output() onReset = new EventEmitter();

  constructor(
    private readonly paymentDetailService: PaymentDetailService, 
    private readonly toastrService: ToastrService
  ) { }

  onSubmit(form: NgForm){
    if(form.valid){

      if(this.formData.paymentDetailId == 0 || !this.formData.paymentDetailId){

        this.paymentDetailService.registerCard(this.formData).subscribe({
          next: _ => {
            this.toastrService.success(SucessMessageEnum.NewCard, SucessMessageEnum.Title);
            this.onCardRequest.emit();
            this.resetForm(form);
          },
          error: err => {
            this.toastrService.error(err.error.detail, ErrorMessageEnum.Title);
          }
        });

      }
      else{

        this.paymentDetailService.updateCard(this.formData).subscribe({
          next: _ => {
            this.toastrService.success(SucessMessageEnum.UpdatedCard, SucessMessageEnum.Title);
            this.onCardRequest.emit();
            this.resetForm(form);
          },
          error: err => {
            this.toastrService.error(err.error.detail, ErrorMessageEnum.Title);
          }
        });

      }
      
    }
    else{
      this.toastrService.error(ErrorMessageEnum.FillCardData, ErrorMessageEnum.Title);
    }
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.onReset.emit();
  }
}
