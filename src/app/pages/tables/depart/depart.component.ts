import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { NewsService, Depart } from '../../../@core/data/news.service';
import { MDepartComponent } from '../mdepart/mdepart.component';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-depart',
  templateUrl: './depart.component.html',
  styleUrls: ['./depart.component.scss']
})
export class DepartComponent implements OnInit, OnDestroy {
  
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
     private modalService: NgbModal, private router: Router,
     private toasterService: ToasterService) {
      this.service.changeDepart = new EventEmitter();
      this.service.changeDepart.subscribe((value:Depart)=>{
        this.source.prepend(value);
      });
      const departs = this.service.getDeparts();
      if (departs == null || departs == undefined) {
        this.router.navigateByUrl('/tables/home');
        return;
      }
      this.source.load(departs);
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
  }
  
  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.service.changeDepart.unsubscribe();
    this.service.changeDepart = undefined;
  }
  
  pushDepart() {
    this.modalService.open(MDepartComponent, {
      backdrop: 'static',
      container: 'nb-layout'
    });
  }
  
  onDeleteConfirm(event): void {
    if (!this.service.canDelDepart(event.data.Name)) {
      this.showToast('warning', '不能删除部门', '先删除部门里的人员,再删除部门');
      return;
    }
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/depart/deleteDepart', {
        "Id": event.data.Id,
        "Name": event.data.Name
      }).subscribe(res => {
        if (res) {
          var depart = this.service.findDepartById(event.data.Id);
          this.source.remove(depart);
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
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
