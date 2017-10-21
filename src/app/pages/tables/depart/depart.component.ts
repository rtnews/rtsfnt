import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { NewsService, Depart } from '../../../@core/data/news.service';
import { MDepartComponent } from '../mdepart/mdepart.component';

@Component({
  selector: 'app-depart',
  templateUrl: './depart.component.html',
  styleUrls: ['./depart.component.scss']
})
export class DepartComponent implements OnInit {
  
  settings = {
    hideHeader: false,
    hideSubHeader: true,
    actions: {
      columnTitle: '删除',
      add: false,
      edit: false,
      delete: true,
      custom: [],
      position: 'right', // left|right
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      Identifier: {
        title: '部门编号',
        type: 'string'
      },
      Name: {
        title: '部门名称',
        type: 'string'
      },
    },
    noDataMessage: '没有数据',
  };
  
  source: LocalDataSource = new LocalDataSource();
  isLoading:boolean = true;
  
  constructor(private http: HttpClient, private service: NewsService, private modalService: NgbModal) {
    this.loadDeparts();
    
    service.changeNotice.subscribe((value:Depart)=>{
      this.source.prepend(value);
    });
  }
  
  ngOnInit() {
  }
  
  loadDeparts() {
    this.http.get('/api/depart/getdepartlist').subscribe(res => {
      (res as Depart[]).forEach(i => {
        this.source.prepend(i);
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }
  
  pushDepart() {
    this.modalService.open(MDepartComponent, {
      backdrop: 'static',
      container: 'nb-layout',
      size: 'lg',
    });
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/depart/deleteDepart', {
        "Id": event.data.Id
      }).subscribe(res => {
        if (res) {
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }
}
