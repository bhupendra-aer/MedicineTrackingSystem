import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../shared/services/repository.service';
import { Medicine } from '../interfaces/medicine';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../shared/services/error-handler.service';

@Component({
selector: 'app-medicine',
templateUrl: './medicine.component.html',
styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
public errorMessage: string = '';
public medicines: Medicine[];
  // Use this property to stored filtered medicines, so we do not
// lose the original list and do not have to make a round trip
// to the web server on every new search
filteredMedicines: Medicine[];

private _searchTerm: string;

// We are binding to this property in the view template, so this
// getter is called when the binding needs to read the value
get searchTerm(): string {
  return this._searchTerm;
}

// This setter is called everytime the value in the search text box changes
set searchTerm(value: string) {
  this._searchTerm = value;
  this.filteredMedicines = this.filterMedicines(value);
}

constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService, 
  private router: Router) { }

ngOnInit(): void {
  this.getAllMedicines();
}

public getAllMedicines = () => {
  let apiAddress: string = "api/medicine";
  this.repository.getData(apiAddress)
  .subscribe(
  response => {
    if (response["isSuccess"]) {
      this.medicines = response["data"];
      this.filteredMedicines = this.medicines;
    } else {

    }
  },
  error => {
    this.errorHandler.handleError(error);
    this.errorMessage = this.errorHandler.errorMessage;
  }
);
}

filterMedicines(searchString: string) {
return this.medicines.filter(medicine =>
  medicine.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
}

public getMedicineDetails = (id) => { 
  const detailsUrl: string = `/medicine/${id}`; 
  this.router.navigate([detailsUrl]); 
}

getExpiryDays(expiryDate:Date):number {
  let presentDate = new Date(); 
  let expDate = new Date(expiryDate); 
    
  // To calculate the time difference of two dates 
  let Difference_In_Time = expDate.getTime() - presentDate.getTime(); 
    
  // To calculate the no. of days between two dates 
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24)); 
  console.log(expiryDate);
  console.log(Difference_In_Days);
  //let days= Math.round(Math.abs((+dtToday) - (+date2))/8.64e7);
  return Difference_In_Days;
}

}
