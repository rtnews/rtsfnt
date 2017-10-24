import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { NewsService, Clerk,Depart } from '../../../@core/data/news.service';
import { MClerksComponent } from '../mclerks/mclerks.component';

@Component({
  selector: 'ngx-clerks',
  templateUrl: './clerks.component.html',
  styleUrls: ['./clerks.component.scss']
})
export class ClerksComponent implements OnInit {

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
        title: '人员编号',
        type: 'string'
      },
      Name: {
        title: '人员名称',
        type: 'string'
      },
    },
    noDataMessage: '没有数据',
  };

  departs:Depart[];
  depart:Depart;
  defaultDepart:Depart;

  source: LocalDataSource = new LocalDataSource();
  isLoading:boolean = true;
  
  constructor(private http: HttpClient, private service: NewsService,
    private modalService: NgbModal) {
      this.defaultDepart = {
        Id:"",
        Identifier:"",
        Name:"还没有部门"
      };
      service.changeClerk.subscribe((value:Clerk)=>{
        this.source.prepend(value);
      });

      this.departs = service.getDeparts();
      if (this.departs.length > 0) {
        this.depart = this.departs[0];
      } else {
        this.depart = this.defaultDepart;
      }
      var clerks = service.getClerks(this.depart.Identifier);
      if (clerks.length > 0) {
        this.source.load(clerks);
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
  }

  ngOnInit() {
  }
  
  pushClerk() {
    this.modalService.open(MClerksComponent, {
      backdrop: 'static',
      container: 'nb-layout'
    });
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/clerk/deleteClerk', {
        "Id": event.data.Id,
        "Name": event.data.Name
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

  selectDepart(d: Depart): void {
    this.depart = d;
    var clerks = this.service.getClerks(this.depart.Identifier);
    if (clerks.length > 0) {
      this.source.load(clerks);
    }
	}
  
}
