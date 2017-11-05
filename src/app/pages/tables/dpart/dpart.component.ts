import { Component, OnInit,EventEmitter, OnDestroy  } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { NewsService, Clerk,Depart,Dpart } from '../../../@core/data/news.service';
import { MDpartComponent } from '../mdpart/mdpart.component';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'ngx-dpart',
  templateUrl: './dpart.component.html',
  styleUrls: ['./dpart.component.scss']
})
export class DpartComponent implements OnInit,OnDestroy {
  
  config: ToasterConfig;
  
  position: string = 'toast-top-right';
  animationType: string = 'fade';
  timeout: number = 2000;
  toastsLimit: number = 5;
  
  isNewestOnTop: boolean = true;
  isHideOnClick: boolean = true;
  isDuplicatesPrevented: boolean = false;
  isCloseButton: boolean = true;

  public myDatePickerOptions: IMyDpOptions = {
     dateFormat: 'yyyy.mm.dd',
     showClearDateBtn:false,
  };
  public model: any;
  locale:string = 'zh-cn';

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
        title: '值班编号',
        type: 'string'
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

  dparts:Dpart[];
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
        Name:"还没有部门",
        DutyTime:""
      };
      const departs = service.getDeparts();
      if (departs == null || departs == undefined) {
        this.router.navigateByUrl('/tables/home');
        return;
      }
      this.departs = [];
      if (departs.length > 0) {
        this.departs = this.departs.concat(departs);
        this.depart = this.departs[0];
        
        var date = new Date(this.depart.DutyTime);
        
        var tmpDate = this.changeMonth(date.getUTCFullYear(),
        date.getUTCMonth(), date.getUTCDate());
        this.model = { date: 
          { year: tmpDate[0], 
            month: tmpDate[1], 
            day: tmpDate[2] } };
      } else {
        this.departs.push(this.defaultDepart);
        this.depart = this.defaultDepart;
        
        var date = new Date();
        date.setTime(Date.now());

        var tmpDate = this.changeMonth(date.getUTCFullYear(),
        date.getUTCMonth(), date.getUTCDate());
        this.model = { date: 
          { year: tmpDate[0], 
            month: tmpDate[1], 
            day: tmpDate[2] } };
      };


      if (this.depart.Id == "0xFFFFF") {
        this.dparts = [];
      } else {
        this.dparts = service.getDparts(this.depart.Name);
      }
      this.source.load(this.dparts);

      service.changeDpart = new EventEmitter();
      service.changeDpart.subscribe((value:Dpart)=>{
        if (value.Depart == this.depart.Name) {
          this.source.prepend(value);
        }
      });
      
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
   }

  ngOnInit() {

	}
	
  ngOnDestroy(): void {
    if (this.service.changeDpart !== undefined && 
      this.service.changeDpart !== null) {
        this.service.changeDpart.unsubscribe();
        this.service.changeDpart = undefined;
      }
  }
  
  pushDpart() {
    if (this.depart.Id == '0xFFFFF') {
      this.showToast('warning', '不能添加值班', '需要先添加部门和人员，再添加值班');
      return;
    }
    this.modalService.open(MDpartComponent, {
      backdrop: 'static',
      container: 'nb-layout'
    });
  }
  
  onDeleteConfirm(event): void {
    if (window.confirm('你确定要删除吗?')) {
      this.http.post('/api/dpart/DeleteDpart', {
        "Id": event.data.Id,
        "Name": event.data.Name
      }).subscribe(res => {
        if (res) {
          this.service.deleteDpart(event.data.Id);
          
          event.confirm.resolve();
        } else {
          event.confirm.reject();
        }
      });
    } else {
      event.confirm.reject();
    }
  }
  
  changeMonth(year:number, month:number, day:number) {
    if (day == 31) {
      if (month == 11) {
        return [year + 1, 1, 1];
      } else {
        return [year, month + 2, 1];
      }
    }
    else if (day == 30) {
      var m:number[] = [3, 5, 8, 10 ];
      for (var index = 0; index < m.length; index++) {
        var element = m[index];
        if (element == month) {
          return [year, month + 2, 1];
        }
      };
    } else if (month == 1) {
      if (day == 29) {
        return [year, month + 2, 1];
      }
      if ( (day == 28) && ((year % 4) != 0) ) {
        return [year, month + 2, 1];
      }
    }
    return [year, month + 1, day + 1];
  }

  selectDepart(depart: Depart): void {
    this.depart = depart;

    if (this.depart.Id == '0xFFFFF') {
      var date = new Date();
      date.setTime(Date.now());

      var tmpDate = this.changeMonth(date.getUTCFullYear(),
        date.getUTCMonth(), date.getUTCDate());
        this.model = { date: 
          { year: tmpDate[0], 
            month: tmpDate[1], 
            day: tmpDate[2] } };
    } else {
      var date = new Date(this.depart.DutyTime);

      var tmpDate = this.changeMonth(date.getUTCFullYear(),
      date.getUTCMonth(), date.getUTCDate());
      this.model = { date: 
        { year: tmpDate[0], 
          month: tmpDate[1], 
          day: tmpDate[2] } };
    }
    if (this.depart.Id == "0xFFFFF") {
      this.dparts = [];
    } else {
      this.dparts = this.service.getDparts(this.depart.Name);
    }
    this.source.load(this.dparts);
  }
  
  onDateChanged(event: IMyDateModel) {
    if (this.depart.Id == "0xFFFFF") {
      return;
    }
    this.depart.DutyTime = new Date(event.jsdate).toLocaleDateString();
    this.http.post('/api/depart/ChangeDutyTime', {
      "Identifier": this.depart.Id,
      "DutyTime": this.depart.DutyTime
    }).subscribe(res => {
      if (res) {
      }
    });
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
