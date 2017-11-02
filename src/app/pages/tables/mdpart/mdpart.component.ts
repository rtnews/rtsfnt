import { Component, OnInit } from '@angular/core';
import { NewsService, Depart, Clerk,Dpart } from '../../../@core/data/news.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';

import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';

import 'style-loader!angular2-toaster/toaster.css';

@Component({
  selector: 'undefined-mdpart',
  templateUrl: './mdpart.component.html',
  styleUrls: ['./mdpart.component.scss']
})
export class MDpartComponent implements OnInit {

  config: ToasterConfig;
  
  position: string = 'toast-top-right';
  animationType: string = 'fade';
  timeout: number = 2000;
  toastsLimit: number = 5;
  
  isNewestOnTop: boolean = true;
  isHideOnClick: boolean = true;
  isDuplicatesPrevented: boolean = false;
  isCloseButton: boolean = true;

  identifier:number;

  departs:Depart[];
  depart:Depart;
  
  clerks:Clerk[];
  clerk:Clerk;
  defaultClerk:Clerk;

  adding:boolean;

  constructor(private activeModal: NgbActiveModal, private service: NewsService,
    private toasterService: ToasterService, private http: HttpClient,) {
    this.defaultClerk = {
      Id: '0xFFFFF',
      Identifier: '',
      Name:'该部门没人员',
      Depart:'',
      Icon:'',
      Phone:''
    }
    this.adding = false;

    this.departs = service.getDeparts();
    this.selectDepart(this.departs[0]);
  }

  ngOnInit() {
  }

  closeModal() {
		this.activeModal.close();
  }

  addDpart(): void {
    if (this.identifier <= 0) {
      this.showToast('warning', '值班编号不正确', '编号应该大于0的数字');
      return;
    }
    if (this.clerk.Id == '0xFFFFF') {
      this.showToast('warning', '不能添加值班', '需要先添加部门人员');
      return;
    }
    if (this.adding) {
      return;
    }
    this.adding = true;
    this.http.post('/api/dpart/adddpart', {
      "Identifier": this.identifier,
      "ClerkId": this.clerk.Identifier,
      "Name": this.clerk.Name,
      "Depart": this.clerk.Depart,
      "Phone": this.clerk.Phone,
      "Icon": this.clerk.Icon
    }).subscribe(res => {
      this.service.pushDpart(res as Dpart);
      this.activeModal.close();
    });
  }

  selectDepart(depart:Depart) {
    this.depart = depart;

    this.clerks = this.service.getClerks(depart.Name);
    if (this.clerks.length < 1) {
      this.clerks.push(this.defaultClerk);
    }
    this.clerk = this.clerks[0];
  }

  selectClerk(clerk:Clerk) {
    this.clerk = clerk;
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
