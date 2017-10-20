import { Component,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { ModalsData } from './modal.data'
import { NewsService } from '../../../@core/data/news.service';

interface FormData {
  concurrency: number;
  autoUpload: boolean;
  verbose: boolean;
}

const MODALSDATA:ModalsData[] = [
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
];

@Component({
  selector: 'ngx-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html'
})

export class ModalComponent {

	fileOk:string[];
	closeOk:string;
	modalsIndex:number;
	modalsData:ModalsData;
	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	dragOver: boolean;
	options: UploaderOptions;
	errors:string;
	uploading:boolean;

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
	}
	
	closeModal() {
		this.activeModal.close();
	}

	setModalsData(index:number): void {
		this.modalsData = MODALSDATA[index];
		this.modalsIndex = index;
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
				if (this.modalsIndex == 0) {
					this.service.changeHome.emit(obj);
				} else if (this.modalsIndex == 1) {
					this.service.changeNotice.emit(obj);
				} else {
					this.service.changeGlobal.emit(obj);
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
		const event: UploadInput = {
			type: 'uploadAll',
			url: this.modalsData.url,
			method: 'POST',
		};
		
		this.errors = '';
		this.uploadInput.emit(event);
	}
	
	cancelUpload(id: string): void {
		this.uploadInput.emit({ type: 'cancel', id: id });
	}
	
	removeFile(f: UploadFile): void {
		if (f.progress.status != UploadStatus.Uploading) {
			this.uploadInput.emit({ type: 'remove', id: f.id });
		};
	}
}
