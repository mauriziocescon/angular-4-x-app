import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FormBuilder } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";

import { TranslateLoader, TranslateModule, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { CoreModule } from "../core/core.module";
import { SharedModule } from "../shared/shared.module";

import { UsersComponent } from "./users.component";
import { UsersService } from "./users.data-service";
import { UsersPostsComponent } from "./users-posts/users-posts.component";
import { PostCommentsComponent } from "./users-posts/post-comments/post-comments.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("UsersComponent", () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
        CoreModule.forRoot(),
        SharedModule,
      ],
      declarations: [
        UsersComponent,
        UsersPostsComponent,
        PostCommentsComponent
      ],
      providers: [
        FormBuilder,
        TranslateService,
        {provide: UsersService, useValue: {}}, // todo: Provide a test-double service
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
