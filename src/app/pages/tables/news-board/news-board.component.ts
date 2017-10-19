import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { SmartTableService, ImageNews } from '../../../@core/data/smart-table.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'ngx-newsboard',
  styleUrls: ['./news-board.component.scss'],
  templateUrl: './news-board.component.html'
})
export class NewsBoardComponent {

  settings = {
    hideHeader: false,
    hideSubHeader: true,
    actions: {
      columnTitle: '删除',
      add: false,
      edit: false,
      delete: false,
      custom: [],
      position: 'right', // left|right
    },
    columns: {
      FileName: {
        title: '文件名',
        type: 'string',
        width: '100px'
      },
      Title: {
        title: '标题',
        type: 'string'
      },
      Text: {
        title: '正文',
        type: 'string'
      },
      Time: {
        title: '时间',
        type: 'string',
        width: '200px'
      }
    },
    noDataMessage: '没有数据',
  };
  
  source: LocalDataSource = new LocalDataSource();
  isLoading:boolean = true;
  
  constructor(private http: HttpClient, private service: SmartTableService, private modalService: NgbModal) {
    this.loadImageNews();

    service.changeBoard.subscribe((value:ImageNews)=>{
      this.source.prepend(value);
    })
  }
  
  loadImageNews() {
    this.http.get('/api/news/gethomelist').subscribe(res => {
      (res as ImageNews[]).forEach(i => {
        this.source.prepend(i);
      });
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    });
  }

  pushNews() {
    const activeModal = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      container: 'nb-layout',
      size: 'lg',
    });
    activeModal.componentInstance.setModalsData(0);
  }
}
