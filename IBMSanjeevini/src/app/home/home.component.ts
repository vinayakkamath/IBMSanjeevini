import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  savedChanges: boolean = false;
  dataLoading: boolean = false;
  @ViewChild('brForm', {static: false}) brForm: NgForm;
  constructor(public http: HttpService) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let today = new Date().toISOString().split('T')[0];
    document.getElementsByName('date')[0].setAttribute('min', today);
  }

  getValue(formData: any) {
    console.log(formData);
    this.dataLoading = true;
    let finalData: any = [];
    const mailingData = [
      {
        email : 'kamath.vinayak2us@gmail.com',
        location : 'Bangalore'
      },
      {
        email : 'kamath.vinayak@in.ibm.com',
        location : 'Delhi'
      }
    ];
    finalData.push(formData);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < mailingData.length; i++) {
      if (formData && formData.ibmlocation === mailingData[i].location) {
        finalData[0]["email"] = mailingData[i].email;
        finalData[0]["date"] = new DatePipe('en-US').transform(formData.date,'EEEE, MMMM d, y');
      }
    }
    console.log(finalData);

    this.http.sendEmail("http://localhost:3000/sendmail", finalData).subscribe(
      data => {
        let res:any = data;
        console.log(data);
        this.dataLoading = false;
      },
      err => {
        console.log(err);
        this.savedChanges = false;
        this.dataLoading = false;
      },() => {
        this.hideModal();
        this.savedChanges = true;
        this.dataLoading = false;
        window.scrollTo(0, 0);
        setTimeout(() => {
          this.savedChanges = false;
        }, 5000);
        this.brForm.resetForm();
      }
    );

  }

  hideModal(){
    let modal = document.getElementById('formVerificationPopup') as HTMLElement;
    let modalDismiss = modal.querySelector('[data-dismiss]') as HTMLButtonElement;
    let backdrop = document.querySelector('.modal-backdrop');

    modal.classList.remove('show');
    backdrop.removeEventListener('click', this.hideModal.bind(this));
    modalDismiss.removeEventListener('click', this.hideModal.bind(this));

    setTimeout(function(){
        modal.style.display = 'none';
        modal.removeAttribute('aria-modal');
        modal.removeAttribute('style');
        modal.setAttribute('aria-hidden', 'true');
        document.body.removeAttribute('style');
        document.body.classList.remove('modal-open');
        backdrop.remove();
    }, 200);
}


}
