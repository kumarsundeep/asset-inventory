import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IDevices } from '../../interfaces/device.interface';
import { IDevicesInt } from '../../interfaces/device-interface.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { ModalDirective } from 'ng2-bootstrap/modal';
import {Modal} from "ngx-modal";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  devices: IDevices[];
  interfaces: IDevicesInt[];
  deviceId: number;
  deviceName: string;
  selectedDevice: string = '';
  interfaceData: string;
  noOfInterfaces: number = 0;

  rForm: FormGroup;
  interfaceName: string;
  interfaceDesc: string;
  interfaceIp: string;
  validMsg: string = 'This field is required';
  interfaceDetails:any;
  postData: string;

  overview = true;
  deviceList = false;



  constructor( private dataService: DataService, private fb: FormBuilder ) {
    this.rForm = fb.group({
      'interfaceName' : [null, Validators.required],
      'interfaceDesc' : [null, Validators.required],
      'interfaceIp' : [null, Validators.required]
    });
  }

  ngOnInit() {
    //show devices on init
    this.dataService.getDevices().subscribe(
      (devices) => {this.devices = devices},
      error => alert(error),
      () => console.log("devices populated...")
      );

  }

  //Show Interfaces
  showInterfaces(id,name){
    this.overview = false;
    this.deviceList = true;

    this.dataService.getInterfaces(id).subscribe(
      
      (interfaces) => {this.interfaces = interfaces} ,
      error => alert(error),
      () => this.noOfInterfaces = this.interfaces.length.valueOf()
      );
    this.deviceId = id;
    this.deviceName = name;
    this.selectedDevice = name;


  }

  //Show Overview
  showOverview(){
    this.selectedDevice = '';
    this.deviceList = false;
    this.overview = true;
  }

  //Add Interface
  addInterface(interfaceDetailsPost){

    this.interfaceName = interfaceDetailsPost.interfaceName;
    this.interfaceDesc = interfaceDetailsPost.interfaceDesc;
    this.interfaceIp = interfaceDetailsPost.interfaceIp;

    this.interfaceDetails = {ipCode: this.interfaceIp, deviceId: this.deviceId, name: this.interfaceName, description: this.interfaceDesc};

    this.dataService.postInterfaces(this.interfaceDetails).subscribe(

      resp => this.interfaceData = JSON.stringify(resp),
      error => alert(error),
      () =>

      this.dataService.getInterfaces(this.deviceId).subscribe(
        (interfaces) => {this.interfaces = interfaces} ,
        error => alert(error),
        () => this.rForm.reset()
      )
    );






  }


}


