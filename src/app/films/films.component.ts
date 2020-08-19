import { Component, OnInit, ViewChild } from '@angular/core';
import { Film } from '../models/film.model';
import { FilmsService } from '../films.service'

// material imports

import { MatPaginator } from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table'

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  /* MAT TABLE CONFIG */
    allFilmData: Film[]
    displayedColumns = ['title', 'description', 'release_year', 'language_id'];
    dataSource = new MatTableDataSource<Film>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
 /* MAT TABLE CONFIG */
   constructor(private filmsService: FilmsService) { }

  ngOnInit(): void{
    this.getAllFilms()
    this.allFilmData = this.dataSource.data
    console.log(this.allFilmData)
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  // service methods

  getAllFilms() {
    this.filmsService.getAllFilmData().subscribe(data => {
      // console.log(data)
      this.dataSource.data = data;
      this.dataSource.sort = this.sort;
      // this.dataSource.paginator = this.paginator
      console.table(this.dataSource.data[1])
    })
  }

}

