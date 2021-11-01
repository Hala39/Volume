import { Component, Input, OnInit } from '@angular/core';
import { File } from 'src/app/models/file';

@Component({
  selector: 'app-galleria',
  templateUrl: './galleria.component.html',
  styleUrls: ['./galleria.component.scss']
})
export class GalleriaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() photos: File[] = [];

  displayCustom: boolean;
  activeIndex: number = 0;
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];

  photoClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
}

}
