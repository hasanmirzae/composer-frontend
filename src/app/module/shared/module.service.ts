import {Injectable} from '@angular/core';

@Injectable()
export class ModuleService {

  constructor() {}

  getData() {
    return {
      nodes: [{
        name: "A",
        x: 200,
        y: 150,
        id: 0,
        dependencies: [],
        groupId:"org.example",
        artifactId: "sample-module",
        version:"SNAPSHOT-1.1.0"
      }, {
        name: "B",
        x: 140,
        y: 300,
        id: 1,
        dependencies: [],
        groupId:"org.example",
        artifactId: "sample-module",
        version:"SNAPSHOT-1.1.0"
      }, {
        name: "C",
        x: 300,
        y: 300,
        id: 2,
        dependencies: [],
        groupId:"org.example",
        artifactId: "sample-module",
        version:"SNAPSHOT-1.1.0"
      }, {
        name: "D",
        x: 300,
        y: 180,
        id: 3,
        dependencies: [],
        groupId:"org.example",
        artifactId: "sample-module",
        version:"SNAPSHOT-1.1.0"
      }],
      links: [{
        source: 0,
        target: 1
      },{
        source: 0,
        target: 2
      }
        , {
        source: 1,
        target: 2
      }, {
        source: 2,
        target: 3
      },]
    };
  }

}
