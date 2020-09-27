import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepositoryService } from './../../shared/services/repository.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CreateMedicine } from 'src/app/interfaces/create-medicine';
import { ErrorHandlerService } from 'src/app/shared/services/error-handler.service';


@Component({
  selector: 'app-create-medicine',
  templateUrl: './create-medicine.component.html',
  styleUrls: ['./create-medicine.component.css']
})
export class CreateMedicineComponent implements OnInit {
  public errorMessage: string = '';

  public medicineForm: FormGroup;

  constructor(private repository: RepositoryService,private errorHandler: ErrorHandlerService,private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    this.medicineForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      brand: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      price: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      quantity: new FormControl('', [Validators.required, Validators.maxLength(5)]),
      expiryDate: new FormControl('', [Validators.required]),
    });
  }

  public validateControl = (controlName: string) => {
    if (this.medicineForm.controls[controlName].invalid && this.medicineForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError = (controlName: string, errorName: string) => {
    if (this.medicineForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  public executeDatePicker = (event) => {
    this.medicineForm.patchValue({ 'expiryDate': event });
  }

  public createMedicine = (medicineFormValue) => {
    if (this.medicineForm.valid) {
      this.executeMedicineCreation(medicineFormValue);
    }
  }

  private executeMedicineCreation = (medicineFormValue) => {
    const medicine: CreateMedicine = {
      name: medicineFormValue.name,
      brand: medicineFormValue.brand,
      price: parseFloat(medicineFormValue.price),
      quantity: parseInt(medicineFormValue.quantity),
      expiryDate: this.datePipe.transform(medicineFormValue.expiryDate, 'yyyy-MM-dd'),
    }

    const apiUrl = 'api/medicine';
    this.repository.create(apiUrl, medicine)
      .subscribe(res => {
        $('#successModal').modal();
      },
      (error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
    )
  }

  public redirectToMedicineList(){
    this.router.navigate(['/medicine']);
  }

}