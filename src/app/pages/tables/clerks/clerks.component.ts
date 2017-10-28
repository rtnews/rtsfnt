import { Component, OnInit, OnDestroy,EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { NewsService, Clerk,Depart } from '../../../@core/data/news.service';
import { MClerksComponent } from '../mclerks/mclerks.component';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-clerks',
  templateUrl: './clerks.component.html',
  styleUrls: ['./clerks.component.scss']
})
export class ClerksComponent implements OnInit, OnDestroy {
 
  config: ToasterConfig;
  
  position: string = 'toast-top-right';
  animationType: string = 'fade';
  timeout: number = 2000;
  toastsLimit: number = 5;
  
  isNewestOnTop: boolean = true;
  isHideOnClick: boolean = true;
  isDuplicatesPrevented: boolean = false;
  isCloseButton: boolean = true;

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
        title: '部门名称',
        type: 'string'
      },
      Phone: {
        title: '人员手机',
        type: 'string'
      },
    },
    noDataMessage: '没有数据',
  };

  clerks:Clerk[];
  departs:Depart[];
  depart:Depart;
  defaultDepart:Depart;

  source: LocalDataSource = new LocalDataSource();
  isLoading:boolean = true;
  
  constructor(private http: HttpClient, private service: NewsService,
    private modalService: NgbModal, private router: Router,
    private toasterService: ToasterService) {
      this.defaultDepart = {
        Id:"0xFFFFF",
        Identifier:"",
        Name:"所有部门",
        DutyTime:""
      };
      const departs = service.getDeparts();
      if (departs == null || departs == undefined) {
        this.router.navigateByUrl('/tables/home');
        return;
      }
      this.departs = [];
      this.departs.push(this.defaultDepart);
      this.departs = this.departs.concat(departs);
      this.depart = this.departs[0];

      if (this.depart.Id == "0xFFFFF") {
        var clerks = service.getAllClerks();
        this.clerks = [];
        this.clerks = this.clerks.concat(clerks);
      } else {
        this.clerks = service.getClerks(this.depart.Name);
      }
      this.source.load(this.clerks);
      
      service.changeClerk = new EventEmitter();
      service.changeClerk.subscribe((value:Clerk)=>{
        if (value.Depart == this.depart.Name) {
          this.source.prepend(value);
        } else if (this.depart.Id == "0xFFFFF") {
          this.source.prepend(value);
        } else {
        }
      });

      setTimeout(() => {
        this.isLoading = false;
      }, 500);
  }

  ngOnInit() {
  }
  
  ngOnDestroy(): void {
    if (this.service.changeClerk !== undefined && 
      this.service.changeClerk !== null) {
        this.service.changeClerk.unsubscribe();
        this.service.changeClerk = undefined;
      }
  }
  
  pushClerk() {
    if (this.departs.length < 2) {
      this.showToast('warning', '不能添加人员', '先添加部门，再添加人员');
      return;
    }
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

  selectDepart(depart: Depart): void {
    this.depart = depart;
    if (this.depart.Id == "0xFFFFF") {
      var clerks = this.service.getAllClerks();
      this.clerks = [];
      this.clerks = this.clerks.concat(clerks);
    } else {
      this.clerks = this.service.getClerks(this.depart.Name);
    }
    this.source.load(this.clerks);
  }
  
  private showToast(type: string, title: string, body: string) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
    const toast: Toast = {
      type: type,
      title: title,
      body: body,
      timeout: this.timeout,
      showCloseButton: this.isCloseButton,
      bodyOutputType: BodyOutputType.TrustedHtml,
    };
    this.toasterService.popAsync(toast);
  }

  
}
