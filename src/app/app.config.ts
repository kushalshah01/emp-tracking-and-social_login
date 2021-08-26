import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAppConfig } from "./app.class";
@Injectable()
export class AppConfig {
  static settings: IAppConfig;
  constructor(private http: HttpClient) { }
  load() {
    const jsonFile = `assets/core.config.json`;
    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: IAppConfig) => {
          AppConfig.settings = response as IAppConfig;
          localStorage.setItem("config", JSON.stringify(AppConfig.settings));
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
}
