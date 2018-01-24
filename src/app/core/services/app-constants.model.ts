import { Enum } from "../../shared/utilities/enum";

import { environment } from "../../../environments/environment";

export class Api {
  users = environment.apiUrl + "users";
}

export class Application {
  APP_NAME = "demo";
}

export class Languages {
  DE = "de";
  EN = "en";
  IT = "it";
  SUPPORTED_LANG = ["de", "en", "it"];
  SUPPORTED_LANG_DESC = ["Deutsch", "English", "Italiano"];
  DEFAULT_LANGUAGE = "en";
}

export class LocalStorageKey {
  LANGUAGE_ID = new Enum("LANGUAGE_ID");
}
