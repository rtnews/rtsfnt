import { Component, OnInit } from '@angular/core';
import { NewsService, Depart } from '../../../@core/data/news.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-mdepart',
  templateUrl: './mdepart.component.html',
  styleUrls: ['./mdepart.component.scss']
})
export class MDepartComponent implements OnInit {

  depart: Depart;

  constructor(private activeModal: NgbActiveModal) {

   }

  ngOnInit() {
  }

	closeModal() {
		this.activeModal.close();
  }
  
  addDepart(): void {
  }
  
}
