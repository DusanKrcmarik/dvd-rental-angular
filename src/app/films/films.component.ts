import { Component, OnInit, ViewChild } from '@angular/core';
import { Film } from '../models/film.model';
import { Language } from '../models/language.model';
import { FilmsService } from '../films.service';

// material imports

import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FilmsDetailComponent } from './films-detail/films-detail.component'


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  // Select //  

    allLanguageData: Language[];
    selectedLanguage: Language;
    filteredData: Film[]
    tempListAllFilms: Film[];

// Dialog variables

    dialogValue: string;
    sendValue: string;
 
  // Mat table config //

    displayedColumns = ['title', 'description', 'release_year', 'language_id'];
    dataSource = new MatTableDataSource<Film>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

   constructor(private filmsService: FilmsService, public dialog: MatDialog
    ) { }


   // DIALOG

   openAddDialog(): void {
    const addDialogRef = this.dialog.open(FilmsDetailComponent, {
      width: '500px',
      height: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      // data: { pageValue: this.sendValue }
    });

    addDialogRef.afterClosed().subscribe(result => {
      console.log('The addDialog was closed', result);
    });
  }

  openEditDialog(): void {
    const editDialogRef = this.dialog.open(FilmsDetailComponent, {
      width: '500px',
      height: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      // data: { pageValue: this.sendValue }
    });

    editDialogRef.afterClosed().subscribe(result => {
      console.log('The editDialog was closed', result);
    });
  }

   // END DIALOG
  ngOnInit(): void{
    this.getAllFilms()
    this.getAllLanguages()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // template methods

  onSelectedLanguage(value){
    this.dataSource.data = [... this.tempListAllFilms];
    let selectedLanguageId = value.value.language_id
    console.log(selectedLanguageId)
    this.filteredData = [];
    // this.applyFilter()
    this.filteredData = this.dataSource.data.filter(film => film.language_id === selectedLanguageId)
  
    this.dataSource.data = [... this.filteredData];

    // console.log(this.filteredData)
  }



  // applyFilter() {
    
  //   console.log(this.dataSource.data)
  //   this.dataSource.data.filter()
  // }

  // service methods

  getAllFilms() {
    this.filmsService.getAllFilmData().subscribe(data => {
      // console.log(data)
      this.tempListAllFilms = data;
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator
      console.log(this.dataSource.data)
    })
  }

  getAllLanguages() {
    this.filmsService.getAllLanguagesData().subscribe(data => {
      this.allLanguageData = data
      // console.log(this.allLanguageData)
      // console.log(this.allLanguageData.map(l=> l.name))
      // this.allLanguageData = data.name
    })
  }


  
}

