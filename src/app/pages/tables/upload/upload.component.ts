import { Component,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { UploadData } from './upload.data';
import { NewsService } from '../../../@core/data/news.service';

interface FormData {
  concurrency: number;
  autoUpload: boolean;
  verbose: boolean;
}

const UPLOADDATA:UploadData[] = [
	{
		url:'/Upload/UploadHomeNews',
		name:'公安要闻'
	},
	{
		url:'/Upload/UploadNoticeNews',
		name:'通知通报'
	},
	{
		url:'/Upload/UploadGlobalNews',
		name:'全局动态'
	},
	{
		url:'/Upload/UploadNewsTmp',
		name:'新闻模板'
	},
];

@Component({
  selector: 'ngx-upload',
  styleUrls: ['./upload.component.scss'],
  templateUrl: './upload.component.html'
})

export class UploadComponent {

	fileOk:string[];
	closeOk:string;
	uploadIndex:number;
	uploadData:UploadData;
	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	dragOver: boolean;
	options: UploaderOptions;
	errors:string;
	uploading:boolean;
	start:number;

	constructor(private activeModal: NgbActiveModal, private service: NewsService)
	{
		this.options = { concurrency: 1 };
		this.formData = {
			concurrency: 1,
			autoUpload: false,
			verbose: true
		};
		this.fileOk = [
			'准备中. ',
			'上传中(不能删除).',
			'上传完成. ',
			'已经取消. '
		];
		this.closeOk = '×';
		this.uploading = false;
		this.files = [];
		this.errors = '';
		this.uploadInput = new EventEmitter<UploadInput>();
		this.humanizeBytes = humanizeBytes;
		this.start = 0;
	}
	
	closeModal() {
		this.activeModal.close();
	}

	setUploadData(index:number): void {
		this.uploadData = UPLOADDATA[index];
		this.uploadIndex = index;
	}
	
	onUploadOutput(output: UploadOutput): void {
		if (output.type === 'allAddedToQueue') {
		} else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
			this.files.push(output.file);
		} else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
			if (!this.uploading) {
				this.uploading = true;
				this.closeOk = '⊙';
			}
			if (this.start) {
				this.start--;
			}
			const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
			this.files[index] = output.file;
		} else if (output.type === 'removed') {
			this.files = this.files.filter((file: UploadFile) => file !== output.file);
		} else if (output.type === 'dragOver') {
			this.dragOver = true;
		} else if (output.type === 'dragOut') {
			this.dragOver = false;
		} else if (output.type === 'drop') {
			this.dragOver = false;
		} else if (output.type == 'done') {
			if (output.file.responseStatus != 200) {
				this.errors = output.file.response;
			} else {
				var obj = output.file.response;
				if (this.uploadIndex == 0) {
					this.service.changeHome.emit(obj);
				} else if (this.uploadIndex == 1) {
					this.service.changeNotice.emit(obj);
				} else if (this.uploadIndex == 2) {
					this.service.changeGlobal.emit(obj);
				} else {
					this.service.changeNewsTmp.emit(obj);
				}
			}
			let b = false;
			for (var i = 0; i < this.files.length; i++) {
				if (this.files[i].progress.status == UploadStatus.Uploading) {
					b = true;
					break;
				}
			}
			if (this.uploading != b) {
				this.uploading = b;
				if (this.uploading) {
					this.closeOk = '⊙';
				} else {
					this.closeOk = '×';
				}
			}
		}
	}

	isUploading(): boolean {
		return this.uploading;
	}

	startUpload(): void {
		if (this.start > 0) {
			return;
		}
		this.start = 0;
		for (let i of this.files) {
			if (i.progress.status == UploadStatus.Queue) {
				this.start++;
			}
		}
		const event: UploadInput = {
			type: 'uploadAll',
			url: this.uploadData.url,
			method: 'POST',
		};
		this.errors = '';
		this.uploadInput.emit(event);
	}
	
	removeFile(f: UploadFile): void {
		if (f.progress.status != UploadStatus.Uploading) {
			this.uploadInput.emit({ type: 'remove', id: f.id });
		};
	}
}
