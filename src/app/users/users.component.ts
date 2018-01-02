import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

import "rxjs/add/operator/catch";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/switchMap";
import { TranslateService } from "@ngx-translate/core";

import { UIUtilitiesService } from "../shared/shared.module";

import { UsersService } from "./users.data-service";
import { User } from "./users.model";

@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  protected searchControl: FormControl;

  protected usersSubscription: any;
  protected users: User[] | undefined;
  protected busy: boolean;

  // todo: remove it when you're done
  date: any;

  constructor(protected formBuilder: FormBuilder,
              protected translate: TranslateService,
              protected uiUtilities: UIUtilitiesService,
              protected usersService: UsersService) {
  }

  get isLoadingData(): boolean {
    return this.busy === true;
  }

  get hasNoData(): boolean {
    return this.users !== undefined && this.users.length === 0 && this.isLoadingData === false;
  }

  get shouldRetry(): boolean {
    return this.users === undefined && this.isLoadingData === false;
  }

  get showData(): boolean {
    return this.isLoadingData === false && this.hasNoData === false && this.shouldRetry === false;
  }

  get dataSource(): User[] | undefined {
    return this.users;
  }

  get isTextFilterNotEmpty(): boolean {
    return this.searchControl.value;
  }

  ngOnInit(): void {
    this.busy = false;

    this.searchForm = this.formBuilder.group({
      textFilter: this.searchControl = new FormControl(""),
    });

    this.loadDataSource();
  }

  ngOnDestroy(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }
  }

  resetTextFilter(): void {
    this.searchControl.setValue("");
    this.loadDataSource();
  }

  trackByUser(index: number, user: User): number {
    return user.id;
  }

  loadDataSource(): void {
    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }

    this.usersSubscription = this.searchControl
      .valueChanges
      .startWith(this.searchControl.value)
      .debounceTime(400)
      .do(() => this.busy = true)
      .switchMap(textSearch => this.usersService.getUsers(textSearch))
      .do(() => this.busy = false)
      .subscribe((users: User[]) => {
          this.users = users;
          this.date = new Date();
        },
        (err: string) => {
          this.busy = false;
          this.users = undefined;
          this.translate
            .get(["USERS.ERROR_ACCESS_DATA", "USERS.CLOSE"])
            .subscribe((translations: any) => {
              this.uiUtilities.modalAlert(translations["USERS.ERROR_ACCESS_DATA"], err, translations["USERS.CLOSE"]);
            });
        },
        () => {
          // do nothing
        });
  }
}
