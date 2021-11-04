import { Component, OnInit } from '@angular/core';
import {ApiService} from "../api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private adminService: ApiService) { }
  public devicesList: any = [];
  public filteredDevices: any = [];
  public relatedDevices: any = [];
  public selectedDevice: any = '';
  searchKey: any = '';
  isShowingDetails: boolean = false;
  ngOnInit(): void {
    this.fetchDevices();
  }

  onCancel() {
    this.filteredDevices = this.devicesList;
  }

  onSearch(event: any) {
    this.filteredDevices = this.devicesList.filter((v: any) => v.deviceName.includes(event));
  }

  onShowDetails(event: any) {
    this.selectedDevice = event;
    this.isShowingDetails = true;
    let sameTypedDevices = [];
    let differentTypedDevices = [];
    this.relatedDevices = [];
    sameTypedDevices = this.filteredDevices.filter((v: any) => v.deviceName !== event.deviceName && v.type === event.type);
    differentTypedDevices = this.devicesList.filter((v: any) => v.deviceName !== event.deviceName && v.type !== event.type);
    this.relatedDevices = sameTypedDevices.concat(differentTypedDevices);
  }

  fetchDevices() {
    this.adminService.getDevices().subscribe(
      response => this.getDevicesListSuccess(response),
      error => this.handleError(error)
    );
  }

  getDevicesListSuccess(response: any) {
    this.devicesList = response;
    this.filteredDevices = response;
  }

  handleError(error: any) {
    console.log(error);
  }

}
