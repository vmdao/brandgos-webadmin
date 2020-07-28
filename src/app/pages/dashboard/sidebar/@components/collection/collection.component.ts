import { Component, ChangeDetectorRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class ColectionListComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}
  ngOnInit() {}
}
