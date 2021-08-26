import { Component, OnInit } from "@angular/core";
import { AppConstant } from '../app.constant';

declare var ol: any;

@Component({
    selector: "app-premise-map",
    templateUrl: "./premise-map.component.html",
    styleUrls: ["./premise-map.component.scss"]
})

export class PremiseMapComponent implements OnInit {

    latitude: number;
    longitude: number;
    map: any;
    zoomLevel: number = AppConstant.MAP_ZOOM_LEVEL.Premise_Map;
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
        // This will change to dynamic when we get API
        const pos1 = ol.proj.fromLonLat([this.longitude, this.latitude]);
        const pos2 = ol.proj.fromLonLat([103.851959, 1.290270]);
        const pos3 = ol.proj.fromLonLat([95.7129, 37.0902]);

        for (let i = 0; i < 3; i++) {
            // This will change to dynamic when we get API

            let pos = pos1;
            if (i === 1) {
                pos = pos2;
            } else if (i === 2) {
                pos = pos3;
            }

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
}