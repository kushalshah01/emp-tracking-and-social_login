import { Injectable } from "@angular/core";
import { CoreHttpService } from "../core/core-http.service";
import { EmployeesModel } from './employees.class';
import { AppConstant } from '../app.constant';

@Injectable({
    providedIn: "root",
})
export class EmployeesService {
    URL: string = AppConstant.API_LINK + "Employees/";
    constructor(private coreHttpService: CoreHttpService) { }

    list() {
        const url = this.URL + "/list"
        return this.coreHttpService.httpGetRequest(url);
    }

    insert(employee: EmployeesModel) {
        const url = this.URL + "/Insert"
        return this.coreHttpService.httpPostRequest(url, employee);
    }

    update(employee: EmployeesModel) {
        const url = this.URL + "/Update"
        return this.coreHttpService.httpPutRequest(url, employee);
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
