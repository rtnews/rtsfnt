import { Component, OnInit,EventEmitter } from '@angular/core';
import { NewsService, Clerk,Depart } from '../../../@core/data/news.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { NgModel } from '@angular/forms';
import { UploadOutput, UploadInput, UploadFile, UploaderOptions } from 'ngx-uploader';
import {ImageResult} from './interfaces';

@Component({
  selector: 'ngx-mclerks',
  templateUrl: './mclerks.component.html',
  styleUrls: ['./mclerks.component.scss']
})
export class MClerksComponent implements OnInit {

	files: UploadFile;
  uploadInput: EventEmitter<UploadInput>;
  options: UploaderOptions;
  _select:boolean;
  uploading:boolean;
  adding:boolean;

  identifier:string='';
  name:string='';
  phone:string='';

  _imageThumbnail: any;

  departs:Depart[];
  depart:Depart;
  
  closeOk:string;

  constructor(private activeModal: NgbActiveModal, private service: NewsService) {
		  this.options = { concurrency: 1 };
      this.files = null;
      this.uploadInput = new EventEmitter<UploadInput>();
      this._select = false;
      this.uploading = false;
      this.closeOk = '×';

      this.departs = service.getDeparts();
      this.depart = this.departs[0];

      this.adding = false;
  }

  ngOnInit() {
    
  }

	closeModal() {
		this.activeModal.close();
  }

	onUploadOutput(output: UploadOutput): void {
    console.error(output.type);
		if (output.type === 'allAddedToQueue') {
		} else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
      this._select = true;
      this.files = output.file;
      let result: ImageResult = {
        file: null,
        url: null
      };
      this.fileToDataURL(this.files.nativeFile, result).then(r => {
        this._imageThumbnail = r.dataURL;
      });
		} else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
			this.uploading = true;
      this.closeOk = '⊙';
      this.files = output.file;
		} else if (output.type === 'removed') {
      this.files = null;
      this._select = false;
		} else if (output.type == 'done') {
			if (output.file.responseStatus != 200) {
			} else {
        var obj = output.file.response;
        this.service.pushClerks(obj);
      }
      this.uploading = false;
      this.closeOk = '×';
      this.activeModal.close();
		}
  }
  
  addClerk(): void {
    if (this.identifier == '' || this.name == '' ||
        this.phone == '') {
          return;
        }
    if (this._select == false) {
      return;
    }
    if (this.adding) {
      return;
    }
    this.adding = true;
    const event: UploadInput = {
			type: 'uploadAll',
			url: '/Upload/UploadClerk',
      method: 'POST',
      data: {
         Identifier: this.identifier,
         Name: this.name,
         Depart: this.depart.Name,
         Phone: this.phone
      }
    };
    this.uploadInput.emit(event);
  }
  
	isUploading(): boolean {
		return this.uploading;
  }

  get select() {
    return this._select;
  }

  set select(value) {
    this._select = value;
  }

  get imageThumbnail() {
    return this._imageThumbnail;
  }

  set imageThumbnail(value) {
    this._imageThumbnail = value;
  }

  private fileToDataURL(file: File, result: ImageResult): Promise<ImageResult> {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = function (e) {
        result.dataURL = reader.result;
        resolve(result);
      };
      reader.readAsDataURL(file);
    });
  }

  onChange() {
    if (this.files !== null && this.files !== undefined) {
      this.uploadInput.emit({ type: 'remove', id: this.files.id });
    }
  }

}
