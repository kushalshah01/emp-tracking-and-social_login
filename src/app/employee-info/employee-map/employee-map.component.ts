import { Component, OnInit } from "@angular/core";
import { AppConstant } from 'src/app/app.constant';
// import "ol/ol.css";

declare var ol: any;

@Component({
    selector: "app-map",
    templateUrl: "./employee-map.component.html",
    styleUrls: ["./employee-map.component.scss"]
})

export class EmployeeMapComponent implements OnInit {

    latitude: number;
    longitude: number;
    map: any;
    zoomLevel: number = AppConstant.MAP_ZOOM_LEVEL.Employee_Check_In_Map;
    ngOnInit() {
        if (navigator.geolocation) {
            this.generateMap();
        }
    }

    private generateMap() {
        navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            this.map = new ol.Map({
                target: 'map',
                layers: [
                    new ol.layer.Tile({
                        source: new ol.source.OSM()
                    })
                ],
                view: new ol.View({
                    center: ol.proj.fromLonLat([this.longitude, this.latitude]),
                    zoom: this.zoomLevel
                })
            });

            const view = this.map.getView();
            view.setCenter(ol.proj.fromLonLat([this.longitude, this.latitude]));
            view.setZoom(this.zoomLevel);
            this.generateMarker();
        });
    }

    private generateMarker() {
        const pos = ol.proj.fromLonLat([this.longitude, this.latitude]);
        const element = document.createElement("div");
        element.innerHTML =
            '<img src="https://cdn.mapmarker.io/api/v1/fa/stack?size=50&color=DC4C3F&icon=fa-microchip&hoffset=1" />';
        let marker = new ol.Overlay({
            position: pos,
            positioning: "center-center",
            element: element,
            stopEvent: false
        });
        this.map.addOverlay(marker);
    }
}