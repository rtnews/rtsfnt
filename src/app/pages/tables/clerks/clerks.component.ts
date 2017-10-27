import { Component, OnInit, OnDestroy,EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { NewsService, Clerk,Depart } from '../../../@core/data/news.service';
import { MClerksComponent } from '../mclerks/mclerks.component';

@Component({
  selector: 'ngx-clerks',
  templateUrl: './clerks.component.html',
  styleUrls: ['./clerks.component.scss']
})
export class ClerksComponent implements OnInit, OnDestroy {

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
      Depart: {
        title: '部门',
        type: 'string'
      },
      Phone: {
        title: '人员手机',
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
    private modalService: NgbModal, private router: Router) {
      this.defaultDepart = {
        Id:"0x000F",
        Identifier:"",
        Name:"所有部门",
        DutyTime:""
      };
      service.changeClerk = new EventEmitter();
      service.changeClerk.subscribe((value:Clerk)=>{
        if (value.Depart == this.depart.Name) {
          this.source.prepend(value);
        } else if (this.depart.Id == "0x000F") {
          this.source.prepend(value);
        } else {
          //service.addClerks(value);
        }
      });
      var departs:Depart[] = service.getDeparts();
      if (departs == null || departs == undefined) {
        this.router.navigateByUrl('/tables/home');
        return;
      }
      this.departs = new Array<Depart>();
      this.departs.push(this.defaultDepart);
      this.departs = this.departs.concat(departs);
      this.depart = this.departs[0];
      if (this.depart.Id == "0x000F") {
        var clerks = service.getAllClerks();
        this.source.load(clerks);
      } else {
        var clerks = service.getClerks(this.depart.Name);
        this.source.load(clerks);
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
  }

  ngOnInit() {
  }
  
  ngOnDestroy(): void {
    this.service.changeClerk.unsubscribe();
    this.service.changeClerk = undefined;
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
        "Name": event.data.Icon
      }).subscribe(res => {
        if (res) {
          this.service.deleteClerk(event.data.Id);
          
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
    if (this.depart.Id == "0x000F") {
      var clerks = this.service.getAllClerks();
      this.source.load(clerks);
    } else {
      var clerks = this.service.getClerks(this.depart.Name);
      this.source.load(clerks);
    }
	}
  
}
