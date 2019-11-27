import { Component, OnInit, ViewContainerRef, ViewChild, ComponentFactoryResolver, HostListener } from '@angular/core';
import { Ngo, Project, Rating } from 'src/app/models';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { SessionService, UtilsService } from 'src/app/services/shared';
import { DonateService, DashboardService, NgoService } from 'src/app/services';

@Component({
  selector: 'app-manufacturers-list',
  templateUrl: './manufacturers.component.html',
  styleUrls: ['./manufacturers.component.scss']
})

export class ManufacturerListComponent implements OnInit {

  @ViewChild('graphcontainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  completeBatchList=[];
