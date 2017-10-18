import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { SmartTableService, ImageNews } from '../../../@core/data/smart-table.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'ngx-wnews',
  templateUrl: './wnews.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
	nb-card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .dropdown {
        flex-basis: 30%;
        min-width: 220px;
      }
    }
    nb-card-body {
      padding-bottom: 0;
    }
  `],
})
export class WnewsComponent {

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
        type: 'string'
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
        type: 'string'
      }
    },
    noDataMessage: '没有数据',
  };
  
  source: LocalDataSource = new LocalDataSource();
  
  constructor(private http: HttpClient, private service: SmartTableService, private modalService: NgbModal) {
    this.loadImageNews();
    
    service.changeGlob.subscribe((value:ImageNews)=>{
      this.source.append(value);
    })
  }
  
  loadImageNews() {
    this.http.get('/api/news/getgloblist').subscribe(res => {
      (res as ImageNews[]).forEach(i => {
        this.source.prepend(i);
      });
    });
  }
  
  pushNews() {
    const activeModal = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      container: 'nb-layout',
      size: 'lg',
    });
    activeModal.componentInstance.setModalsData(2);
  }
}
