import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { NewsService, Dpart } from '../../../@core/data/news.service';

@Component({
  selector: 'ngx-onduty',
  templateUrl: './onduty.component.html',
  styleUrls: ['./onduty.component.scss']
})
export class OndutyComponent implements OnInit {

  settings = {
    hideHeader: false,
    hideSubHeader: true,
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      Identifier: {
        title: '值班编号',
        type: 'number'
      },
      ClerkId: {
        title: '人员编号',
        type: 'string'
      },
      Name: {
        title: '人员名称',
        type: 'string'
      },
      Depart: {
        title: '部门名称',
        type: 'string'
      }
    },
    noDataMessage: '没有数据',
  };
  
  source: LocalDataSource = new LocalDataSource();
  isLoading:boolean = true;
  
  constructor(private http: HttpClient, private service: NewsService) {
    this.loadOnDuty();
   }

  ngOnInit() {
  }

  loadOnDuty() {
    this.http.get('/api/dpart/getDutyList').subscribe(res => {
      (res as Dpart[]).forEach(i => {
        this.source.prepend(i);
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    });
  }

}
