import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

/*Services*/
import { CrudService } from './../../services/parse/crud.service';

@Component({
  selector: 'ntm-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent implements OnInit {
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  dataToDelete: any;
  dialogMessage: string;
  
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    private crud: CrudService,
    private router: Router,
    private matsnackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
    if(!this.data.dialogMessage) {
      this.dialogMessage = "Tem certeza que deseja apagar?"
    } else {
      this.dialogMessage = this.data.dialogMessage;
    }
  }
   
  delete() {
    this.crud.delete({route: this.data.routeToApi,paramToDelete: this.data.paramToDelete})
    .then(() => {
      this.router.navigate([this.data.routeAfterDelete]);

      let string = this.data.paramToDelete.length + " item(ns) apagado(s)";

      this.matsnackbar.open(string, '', {
        duration: 3000
      });
    });
    
    this.dialogRef.close(true);
  }
}
