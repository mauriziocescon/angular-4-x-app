import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HttpClient } from "@angular/common/http";
import { FormBuilder } from "@angular/forms";

import { TranslateModule, TranslateLoader, TranslateService } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import "rxjs/Rx";

import { CoreModule } from "../../core/core.module";
import { SharedModule } from "../../shared/shared.module";

import { UsersPostsComponent } from "./users-posts.component";
import { PostCommentsComponent } from "./post-comments/post-comments.component";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

describe("UsersPostsComponent", () => {
  let component: UsersPostsComponent;
  let fixture: ComponentFixture<UsersPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule.forRoot(),
        SharedModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient],
          },
        }),
      ],
      declarations: [
        UsersPostsComponent,
        PostCommentsComponent
      ],
      providers: [
        FormBuilder,
        TranslateService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be created", () => {
    expect(component).toBeTruthy();
  });
});
