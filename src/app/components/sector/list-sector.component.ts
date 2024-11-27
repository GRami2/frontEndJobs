import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sector } from 'src/app/models/sector';
import { SectorService } from 'src/app/services/sector.service';

@Component({
  selector: 'app-list-sector',
  templateUrl: './list-sector.component.html',
  styleUrls: ['./list-sector.component.scss']
})
export class ListSectorComponent {
  term: string = ""; 
  sectors: Sector[] = [];  
  sectorForm: FormGroup;
  showModal = false;
  editMode = false;
  currentSectorId: number | null = null;
  @ViewChild('btnCloseModal') btnCloseModal?: ElementRef;
  showLoader: boolean =  true; 
  loaderButton: boolean = false;

  constructor(private sectorService: SectorService) {
    this.sectorForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit(): void {
    this.loadSectors();
  }

  loadSectors(): void {
    this.sectorService.getAllSectors().subscribe({
      next: (data) => {this.sectors = data; this.showLoader = false;},
      error: (err) => {this.showLoader = false; console.log(err.message)},
    });
  } 
  
  deleteSector(id: number): void {
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer ce Secteur d'Activité ?")
    ) {
      this.sectorService.deleteSector(id).subscribe({
        next: () => {
          this.loadSectors();
        },
        error: (err) => {
          console.error('Erreur:', err);
        },
      });
    }
  }

  onEdit(sector?: Sector): void { 
    this.editMode = true; 
    if (sector && sector.id) {
      this.currentSectorId = sector.id;
      this.sectorForm.patchValue({ name: sector.name });
    } else {
      this.sectorForm.reset();
    }
  } 

  saveSector(): void { 
    this.loaderButton = true; 
    const sectorData = this.sectorForm.value; 
    if (this.editMode && this.currentSectorId !== null) {
      this.sectorService.updateSector(this.currentSectorId, sectorData).subscribe(() => { 
        this.sectorForm.reset();
        this.btnCloseModal?.nativeElement.click();
        this.loadSectors(); 
      }, error=>{this.loaderButton= false;});
    } else {
      this.sectorService.createSector(sectorData).subscribe(() => {
        this.btnCloseModal?.nativeElement.click();
        this.loadSectors(); 
      }, error=>{this.loaderButton= false;});
    }
  }

}
