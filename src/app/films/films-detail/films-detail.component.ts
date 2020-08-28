import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Film } from 'src/app/models/film.model';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { FilmsService } from 'src/app/films.service';
import { Language } from 'src/app/models/language.model';


@Component({
  selector: 'app-films-detail',
  templateUrl: './films-detail.component.html',
  styleUrls: ['./films-detail.component.scss']
})
export class FilmsDetailComponent implements OnInit {

  selectedLanguage: any;
  allLanguageData: Language[];
  selectedFilm: Film;
  dataDialog: Film;
  filmDetailsForm: FormGroup;
  // fromDialog: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<FilmsDetailComponent>,
    private fb:FormBuilder, 
    private filmsService: FilmsService
    ) 
 {   

  this.filmDetailsForm = this.fb.group({
    title:['',Validators.required],
    description:['',Validators.required],
    release_year:['',Validators.required],
    language:['',Validators.required]
  });
 }


  ngOnInit(): void { 
    this.getAllLanguages();
    this.dataDialog = this.data 
    this.selectedLanguage = this.data.language.name;
    console.log(this.dataDialog.language.name)
    this.filmDetailsForm.patchValue({
      title: this.dataDialog.title,
      description: this.dataDialog.description,
      release_year: this.dataDialog.release_year,
      language: this.dataDialog.language.name
    });
    console.log('ng on init')
    setTimeout(() => {
      const toSelect = this.allLanguageData.find(c => c.language_id == this.dataDialog.language_id);
      this.filmDetailsForm.get('language').setValue(toSelect);
    }, 200);

  }



  submitFilm(){
    console.log(this.filmDetailsForm.value)

    const updatedFilm = {
      "title": this.filmDetailsForm.controls['title'].value,
      "description": this.filmDetailsForm.controls['description'].value,
      "release_year": this.filmDetailsForm.controls['release_year'].value,
      "language_id": this.filmDetailsForm.controls['language'].value.language_id
    }
    console.log(updatedFilm)
    this.filmsService.updateFilmData(this.dataDialog.film_id , updatedFilm).subscribe(
      res => {
        console.log(res)
      }
    )
    this.dialogRef.close(this.filmDetailsForm.value);
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
