import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { DataService } from '../data.service'

@Component({
  selector: 'app-major-class-form',
  templateUrl: './major-class-form.component.html',
  styleUrls: ['./major-class-form.component.css']
})
export class MajorClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  majorclass: object = {};

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("major_class", +params['id']))
      .subscribe(majorclass => this.majorclass = majorclass);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
  
  }

  saveMajorClass(id){
    if(typeof id === "number"){
      this.dataService.editRecord("major_class", this.majorclass, id)
          .subscribe(
            majorclass => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("major_class", this.majorclass)
          .subscribe(
            majorclass => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
    }

    this.majorclass = {};
    
  }

}
