import { Injectable } from "@angular/core";
import { CoreHttpService } from "../core/core-http.service";
import { AppConstant } from '../app.constant';
import { PremisesModel } from './premises.class';

@Injectable({
    providedIn: "root",
})
export class PremisesService {
    URL: string = AppConstant.API_LINK + "Premises/";
    constructor(private coreHttpService: CoreHttpService) { }

    list() {
        const url = this.URL + "/list"
        return this.coreHttpService.httpGetRequest(url);
    }

    insert(premise: PremisesModel) {
        const url = this.URL + "/Insert"
        return this.coreHttpService.httpPostRequest(url, premise);
    }

    update(premise: PremisesModel) {
        const url = this.URL + "/Update"
        return this.coreHttpService.httpPutRequest(url, premise);
    }

    delete(id) {
        const url = this.URL + "/Delete";
        return this.coreHttpService.httpDeleteRequest(url);
    }


    getById(id) {
        const url = this.URL + "/GetById?empId=" + id;
        return this.coreHttpService.httpGetRequest(url);
    }

    activeInActive(value: { id: number, value: boolean }) {
        const url = this.URL + "/ActiveInActive";
        return this.coreHttpService.httpPostRequest(url, value);
    }
}
