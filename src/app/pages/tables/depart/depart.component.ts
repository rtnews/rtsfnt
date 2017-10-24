import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { NewsService, Depart } from '../../../@core/data/news.service';
import { MDepartComponent } from '../mdepart/mdepart.component';

@Component({
  selector: 'ngx-depart',
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
  
  constructor(private http: HttpClient, private service: NewsService,
     private modalService: NgbModal) {
      this.service.changeDepart.subscribe((value:Depart)=>{
        this.source.prepend(value);
      });
      const departs = this.service.getDeparts();
      if (departs.length > 0) {
        this.source.load(departs);
      }
      
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
  }
  
  ngOnInit() {
  }
  
  pushDepart() {
    this.modalService.open(MDepartComponent, {
      backdrop: 'static',
      container: 'nb-layout'
    });
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/depart/deleteDepart', {
        "Id": event.data.Id,
        "Name": event.data.Name
      }).subscribe(res => {
        if (res) {
          this.service.deleteDepart(event.data.Id);
          
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
