import { Component, OnInit,EventEmitter  } from '@angular/core';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';

@Component({
  selector: 'ngx-dpart',
  templateUrl: './dpart.component.html',
  styleUrls: ['./dpart.component.scss']
})
export class DpartComponent implements OnInit {

	files: UploadFile;
	options: UploaderOptions;
	uploadInput: EventEmitter<UploadInput>;
  
  constructor() {
		this.options = { concurrency: 1 };
		this.files = null;
		this.uploadInput = new EventEmitter<UploadInput>();
   }

  ngOnInit() {
  }

	onUploadOutput(output: UploadOutput): void {
    console.error(output.type);
		if (output.type === 'allAddedToQueue') {
		} else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
			this.files = output.file;
		} else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
		} else if (output.type === 'removed') {
			this.files = null;
		} else if (output.type == 'done') {
		}
  }
  
  startUpload(): void {
		const event: UploadInput = {
			type: 'uploadAll',
			url: '/api/',
			method: 'POST',
		};
		this.uploadInput.emit(event);
	}
	
	removeFile(): void {
			this.uploadInput.emit({ type: 'remove', id: this.files.id });
	}
}
