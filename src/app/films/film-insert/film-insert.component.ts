import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Film } from 'src/app/models/film.model';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FilmsService } from 'src/app/films.service';
import { Language } from 'src/app/models/language.model';

@Component({
  selector: 'app-film-insert',
  templateUrl: './film-insert.component.html',
  styleUrls: ['./film-insert.component.scss']
})
export class FilmInsertComponent implements OnInit {

  selectedLanguage: any;
  allLanguageData: Language[];
  selectedFilm: Film;
  dataDialog: Film;
  filmInsertForm: FormGroup;
  
  constructor(    
  @Inject(MAT_DIALOG_DATA) public data: any, 
  private dialogRef: MatDialogRef<FilmInsertComponent>,
  private fb:FormBuilder, 
  private filmsService: FilmsService) {
    this.filmInsertForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      release_year:['',Validators.required],
      language:['',Validators.required]
    });
   }

   ngOnInit(): void {
    // console.log('injected data' , this.data)
    this.getAllLanguages()
    this.dataDialog = this.data
    console.log(this.selectedLanguage)
    this.filmInsertForm.setValue({
      title: this.dataDialog.title,
      description: this.dataDialog.description,
      release_year: this.dataDialog.release_year,
      language: this.dataDialog.language.name
    });


}

submitFilm(){
  console.log(this.filmInsertForm.value)

  const newFilm = {
    "title": this.filmInsertForm.controls['title'].value,
    "description": this.filmInsertForm.controls['description'].value,
    "release_year": this.filmInsertForm.controls['release_year'].value,
    "language_id": this.filmInsertForm.controls['language'].value.language_id
  }
  this.filmsService.addFilmData(newFilm).subscribe(
    res => {
      console.log(res)
    }
  )

  this.dialogRef.close(this.filmInsertForm.value);
}

close() {
  this.dialogRef.close('close');
}

getAllLanguages() {
  this.filmsService.getAllLanguagesData().subscribe(data => {
    this.allLanguageData = data;
    console.log('language data:', this.allLanguageData)
  })
}
}