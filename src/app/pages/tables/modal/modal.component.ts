import { Component,EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';

interface FormData {
  concurrency: number;
  autoUpload: boolean;
  verbose: boolean;
}

@Component({
  selector: 'ngx-modal',
  styleUrls: ['./modal.component.scss'],
  templateUrl: './modal.component.html'
})

export class ModalComponent {
	
	formData: FormData;
	files: UploadFile[];
	uploadInput: EventEmitter<UploadInput>;
	humanizeBytes: Function;
	dragOver: boolean;
	options: UploaderOptions;
	errors:string;

	constructor(private activeModal: NgbActiveModal)
	{
		this.options = { concurrency: 1 };
		this.formData = {
			concurrency: 1,
			autoUpload: false,
			verbose: true
		};
		this.files = [];
		this.errors = '';
		this.uploadInput = new EventEmitter<UploadInput>();
		this.humanizeBytes = humanizeBytes;
	}
	
	closeModal() {
		this.activeModal.close();
	}
	
	onUploadOutput(output: UploadOutput): void {
		console.log(output);
		
		if (output.type === 'allAddedToQueue') {
			// const event: UploadInput = {
			// 	type: 'uploadAll',
			// 	url: 'http://ngx-uploader.com/upload',
			// 	method: 'POST',
			// 	data: { foo: 'bar' }
			// };
			// this.uploadInput.emit(event);
		} else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') {
			this.files.push(output.file);
		} else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
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
			}
		}
	}
	startUpload(): void {
		const event: UploadInput = {
			type: 'uploadAll',
			url: '/upload/uploadNews',
			method: 'POST',
		};
		this.errors = '';
		this.uploadInput.emit(event);
	}
	
	cancelUpload(id: string): void {
		this.uploadInput.emit({ type: 'cancel', id: id });
	}
	
	removeFile(id: string): void {
		this.uploadInput.emit({ type: 'remove', id: id });
	}
	
	removeAllFiles(): void {
		this.uploadInput.emit({ type: 'removeAll' });
	}
}
