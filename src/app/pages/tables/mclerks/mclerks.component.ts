import { Component, OnInit } from '@angular/core';
import { NewsService, Clerk,Depart } from '../../../@core/data/news.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'ngx-mclerks',
  templateUrl: './mclerks.component.html',
  styleUrls: ['./mclerks.component.scss']
})
export class MClerksComponent implements OnInit {

  identifier:string='';
  name:string='';

  departs:Depart[];
  depart:Depart;
  
  constructor(private activeModal: NgbActiveModal, private http: HttpClient,
    private service: NewsService) {
      this.departs = service.getDeparts();
      this.depart = this.departs[0];
  }

  ngOnInit() {
    
  }

	closeModal() {
		this.activeModal.close();
  }
  
  addClerk(): void {
    this.http.post('/api/clerk/addClerk', {
      "Identifier": this.identifier,
      "Name": this.name,
      "Depart":this.depart.Name
    }).subscribe(res => {
      this.service.changeClerk.emit(res as Clerk);
      this.activeModal.close();
    });
  }

}
