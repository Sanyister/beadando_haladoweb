import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit{
  isCreate:boolean=true;
  idEdit:number;
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.idEdit = Number(paramMap.get('id'));
    });
  }
  onSubmit(){

  }
}
