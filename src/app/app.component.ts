import { Component, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  protected allowedType = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/tiff',
    'image/tiff-fx',
    'image/heif',
    'image/heif-sequence',
    'image/heic',
    'image/heic-sequence',
    'image/avif',
    'image/avif-sequence',
    'image/webp',
  ];
  protected maxMb = 4 * 1024 * 1000;

  uploadSuccess: boolean;
  type: string;
  size: any;
  width: number;
  height: number;
  errorSize = false;
  errorMb = false;
  errorType = false;

  @ViewChild('coverFilesInput') imgType: ElementRef;

  constructor() {}

  onChange(evt: any) {
    this.errorSize = false;
    this.errorMb = false;
    this.errorType = false;
    this.width = 0;
    this.height = 0;

    this.uploadSuccess = true;
    let image: any = evt.target.files[0];
    this.type = image.type;
    this.errorType = this.allowedType.indexOf(this.type) === -1;
    this.size = image.size;
    this.errorMb = this.size > this.maxMb ? true : false;
    let fr = new FileReader();
    fr.onload = () => {
      // when file has loaded
      var img = new Image();

      img.onload = () => {
        this.width = img.width;
        this.height = img.height;
        this.errorSize =
          this.width > 0 && this.height > 0 && this.width !== this.height
            ? true
            : false;
      };
      img.src = String(fr.result); // This is the data URL
    };

    fr.readAsDataURL(image);
    this.imgType.nativeElement.value = '';
  }
}
