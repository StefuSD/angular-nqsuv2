import { Component } from "@angular/core";
import { LabelType, Options } from "ng5-slider";
import { DatePipe } from "@angular/common";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [DatePipe]
})
export class AppComponent {
  vehiculeFilter: any[] = [];
  postedWithinFilter: any[] = [];

  public get filteredData(): any[] {
    let filtered = [...this.datas];

    if(this.postedWithinFilter.length > 0) {
      filtered = filtered.filter(x => {
        const p = this.postedWithinFilter.find(v => {
          const d = new Date();
          d.setDate(d.getDate()-(v.value));
          const tDate = new Date(x.date);
          return tDate >= d;
        });
        return p != null;
      });
    }

    if(this.vehiculeFilter.length > 0 ) {
      filtered = filtered.filter(x => {
        const t = this.vehiculeFilter.find(v => v.name === x.type);
        return t != null;
      });
    }
    return filtered;
  }

  datas = [
    {
      id: 1,
      titre: "titre1",
      texte: "description 1",
      price_range: "35-70",
      date: "2020-08-01T11:36:34.000000Z",
      type: "voiture"
    },
    {
      id: 2,
      titre: "titre2",
      texte: "description 2",
      price_range: "45-60",
      date: "2020-08-02T11:36:34.000000Z",
      type: "moto"
    },
    {
      id: 3,
      titre: "titre3",
      texte: "description 3",
      price_range: "55-80",
      date: "2020-08-04T11:36:34.000000Z",
      type: "moto"
    },
    {
      id: 4,
      titre: "titre4",
      texte: "description 4",
      price_range: "55-90",
      date: "2020-08-05T11:36:34.000000Z",
      type: "moto"
    },
    {
      id: 5,
      titre: "titre5",
      texte: "description 5",
      price_range: "55-60",
      date: "2020-07-28T11:36:34.000000Z",
      type: "moto"
    },
    {
      id: 5,
      titre: "titre6",
      texte: "description 6",
      price_range: "55-95",
      date: "2020-07-25T11:36:34.000000Z",
      type: "camion"
    }
  ];

  minValue: number = 20;
  maxValue: number = 100;
  options: Options = {
    floor: 20,
    ceil: 100,
    step: 5,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          return value + " DH ";
        case LabelType.High:
          return value + " DH ";
        default:
          return value + " DH ";
      }
    }
  };

  durations: any = [
    { id: 1, name: "Today", value: 0 },
    { id: 2, name: "Last 2 days", value: 2 },
    { id: 4, name: "Last 7 days", value: 7 },
  ];

  vehicules: any = [
    { id: 1, name: "moto", checked: false },
    { id: 2, name: "voiture", checked: false },
    { id: 3, name: "camion", checked: false }
  ];

  constructor() {}

  onChangeUploadedDate($event, duration) {
    const checked = $event.target.checked;
    if(checked) {
      this.postedWithinFilter = [...this.postedWithinFilter, {...duration}];
    } else {
      this.postedWithinFilter = [...this.postedWithinFilter.filter(x => x.id !== duration.id)];
    }
  }

  onChangeVehicule($event, vehiculeType) {
    const checked = $event.target.checked;
    if(checked) {
      this.vehiculeFilter = [...this.vehiculeFilter, {...vehiculeType}];
    } else {
      this.vehiculeFilter = [...this.vehiculeFilter.filter(x => x.id !== vehiculeType.id)];
    }
  }
}
