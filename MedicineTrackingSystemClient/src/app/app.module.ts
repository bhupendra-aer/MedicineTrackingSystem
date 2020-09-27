import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MedicineComponent } from './medicine/medicine.component';
import { CreateMedicineComponent } from './medicine/create-medicine/create-medicine.component';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { ErrorModalComponent } from './shared/modals/error-modal/error-modal.component';
import { SuccessModalComponent } from './shared/modals/success-modal/success-modal.component';
import { DatepickerDirective } from './shared/directives/datepicker.directive';
import { DatePipe } from '@angular/common';
import { MedicineDetailComponent } from './medicine/medicine-detail/medicine-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MedicineComponent,
    CreateMedicineComponent,
    NotFoundComponent, 
    InternalServerComponent, 
    ErrorModalComponent, 
    SuccessModalComponent, 
    DatepickerDirective, 
    MedicineDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path:'medicine/create',component:CreateMedicineComponent},
      { path: 'medicine/:id', component: MedicineDetailComponent },
      { path: 'medicine', component: MedicineComponent },
      { path: '404', component : NotFoundComponent},
      { path: '500', component: InternalServerComponent },
      { path: '', redirectTo: '/medicine', pathMatch: 'full' },
      { path: '**', redirectTo: '/404', pathMatch: 'full'}
    ])
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
