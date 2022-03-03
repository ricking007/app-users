import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ApiUrl } from 'src/app/enums/api.enum';
import { IRequest } from 'src/app/interface/request.interface';
import { IUser } from 'src/app/interface/user.interface';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {

  query: string = '';

  icon = faSearch;
  searching: boolean = false;

  rows: IUser[] = [];

  constructor(private crudService: CrudService,) {}

  ngOnInit(): void {}

  getSearch() {
    this.rows = [];
    this.searching = true;
    const request: IRequest =
    {
      url: ApiUrl.USERS,
      authenticate: true,
      options: {
        query: this.query
      }
    }
    this.crudService.get(request).then(response => {
      this.rows = response.data;
      this.searching = false
      this.query = "";
    }).catch(err => {
      this.searching = false
      console.log(err);
    });
  }
}
