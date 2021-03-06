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
import { FilmInsertComponent } from './film-insert/film-insert.component';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss'],
})
export class FilmsComponent implements OnInit {

  // Select //  

    allLanguageData: Language[];
    selectedLanguage: Language;
    selectedEntry: Film;
    filteredData: Film[]
    tempListAllFilms: Film[];

// Dialog variables

    dialogValue: string;
    sendValue: string;
    isDisabled: boolean = true;
  // Mat table config //

    displayedColumns = ['title', 'description', 'release_year', 'language_id', 'delete'];
    dataSource = new MatTableDataSource<Film>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

   constructor(private filmsService: FilmsService, public dialog: MatDialog
    ) { }

   // DIALOG

  openEditDialog(): void {
    console.log('selected entry:', this.selectedEntry)
    const editDialogRef = this.dialog.open(FilmsDetailComponent, {
      width: '550px',
      height: '350px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: this.selectedEntry
    });

    editDialogRef.afterClosed().subscribe(result => {
      this.isDisabled = true;
      this.getAllFilms()
      console.log('Opali se kad ugasis modal', result);
    });
  }

  openAddDialog(): void {
    console.log(this.sendValue)
   const addDialogRef = this.dialog.open(FilmInsertComponent, {
     width: '550px',
     height: '350px',
     backdropClass: 'custom-dialog-backdrop-class',
     panelClass: 'custom-dialog-panel-class',
     data: ''
   });

   addDialogRef.afterClosed().subscribe(result => {
    this.getAllFilms()
     console.log('The addDialog was closed', result);
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
    if(!value.value) {
      return this.getAllFilms();
    }
    this.dataSource.data = [... this.tempListAllFilms];
    let selectedLanguageId = value.value.language_id;
    this.filteredData = [];
    this.filteredData = this.dataSource.data.filter(film => film.language_id === selectedLanguageId)
    this.dataSource.data = [... this.filteredData];
  }

  // service methods

  getAllFilms() {
    this.filmsService.getAllFilmData().subscribe(data => {
      // console.log(data)
      this.tempListAllFilms = data;
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator
      // console.log(this.dataSource.data)
    })
  }

  getAllLanguages() {
    this.filmsService.getAllLanguagesData().subscribe(data => {
      this.allLanguageData = data
      // console.log('all language' , this.allLanguageData)
    })
  }

  onSelectedFilm(entry: Film) {
    this.selectedEntry = entry;
    console.log(this.selectedEntry)
  // }
  if(this.selectedEntry) {
    this.isDisabled = false;
  }
  } 
  
  deleteFilm(selectedRow: any) { 
    console.log(selectedRow)
    this.filmsService.deleteFilmData(selectedRow.film_id).subscribe(
      res => {
        console.log('Deleted Movie', res)
        this.getAllFilms()
      },
      error => {
        console.log('error Movie', error)
      }
    )
  }
}
