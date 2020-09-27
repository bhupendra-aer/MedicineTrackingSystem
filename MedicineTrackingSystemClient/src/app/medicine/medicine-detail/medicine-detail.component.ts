import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RepositoryService } from './../../shared/services/repository.service';
import { ErrorHandlerService } from './../../shared/services/error-handler.service';
import { Medicine } from 'src/app/interfaces/medicine';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesModalComponent } from '../modals/notes-modal/notes-modal.component';

@Component({
  selector: 'app-medicine-detail',
  templateUrl: './medicine-detail.component.html',
  styleUrls: ['./medicine-detail.component.css']
})
export class MedicineDetailComponent implements OnInit {
  public medicine: Medicine;
  public errorMessage: string = '';

  constructor(private repository: RepositoryService, private router: Router, 
              private activeRoute: ActivatedRoute, 
              private errorHandler: ErrorHandlerService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.getMedicineDetails()
  }

  getMedicineDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/medicine/${id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      if (res["isSuccess"]) {
        this.medicine = res["data"] as Medicine;
      } else { }    
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public redirectToMedicineList(){
    this.router.navigate(['/medicine']);
  }

  openModal() {
    const modalRef = this.modalService.open(NotesModalComponent);
    modalRef.componentInstance.medicine = this.medicine;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
        this.updateMedicineDetails();
      }
    });
  }

  updateMedicineDetails = () => {
    let id: string = this.medicine.id;
    let apiUrl: string = `api/medicine/${id}`;
   // let notes=
    this.repository.update(apiUrl,JSON.stringify(this.medicine.notes))
    .subscribe(res => {
      if (res["isSuccess"]) {
        $('#successModal').modal();
      } else { }    
    },
    (error) =>{
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }
}
