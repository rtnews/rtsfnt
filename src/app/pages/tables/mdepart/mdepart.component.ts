import { Component, OnInit } from '@angular/core';
import { NewsService, Depart } from '../../../@core/data/news.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'ngx-mdepart',
  templateUrl: './mdepart.component.html',
  styleUrls: ['./mdepart.component.scss']
})
export class MDepartComponent implements OnInit {

  identifier:string='';
  name:string='';
  
  constructor(private activeModal: NgbActiveModal, private http: HttpClient,
    private service: NewsService) {

   }

  ngOnInit() {
  }

	closeModal() {
		this.activeModal.close();
  }
  
  addDepart(): void {
    this.http.post('/api/depart/adddepart', {
      "Identifier": this.identifier,
      "Name": this.name
    }).subscribe(res => {
      this.service.changeDepart.emit(res as Depart);
      this.activeModal.close();
    });
  }

}
