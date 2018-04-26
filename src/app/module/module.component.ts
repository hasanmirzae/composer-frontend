import {Component, OnInit} from '@angular/core';
import * as d3 from 'd3';
import {ModuleService} from '../shared/module.service';
import { globals } from '../globals';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.css'],
  providers: [ModuleService]
})
export class ModuleComponent implements OnInit {

  model: any = {};
  
  constructor(private moduleService: ModuleService) {}



  ngOnInit() {
  
  }
  
  update(model: any){
    this.moduleService
      .getData(model.uuid)
      .subscribe(this.init.bind(this), e => console.error);
  }

  getTitle(node) {
    return node.groupId + '\n' + node.artifactId + '\n' + node.version+'\n'+node.uuid;
  }
  
  
  generateCoordinates(data): void {
    data.nodes.forEach(node => {
      node.x = Math.round(Math.random() * 200 + 50);
      node.y = Math.round(Math.random() * 200 + 10);
    });
  }
  

  init(data) {
    this.model = data;
    globals.activeModule = data.uuid;
    console.log(globals)
    this.generateCoordinates(data);
    const RECT_SIZE = 40; // a/2
    const c10 = d3.scale.category10();
    d3.select("#module-window").select("svg").remove();
    const svg = d3.select("#module-window")
      .append("svg")
      .attr("width", 1200)
      .attr("height", 800);

    // define arrow
    svg.append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("markerWidth", RECT_SIZE)
      .attr("markerHeight", RECT_SIZE)
      .attr("refX", RECT_SIZE/2.5)
      .attr("refY", 5)
      .attr("orient", "auto")
      .attr("markerUnits", "strokeWidth")
      .append("path")
      .attr("d", "M 0 0 L 10 5 L 0 10 z")
      .attr("fill", "#f00");


    const links = svg.selectAll("link")
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("marker-end", "url(#arrow)")
      .attr("x1", function(l) {
        var sourceNode = data.nodes.filter(d => {
          return d.uuid === l.source;
        })[0];
        d3.select(this).attr("source",sourceNode.uuid);
        d3.select(this).attr("y1", sourceNode.y);
        return sourceNode.x;
      })
      .attr("x2", function(l) {
        var targetNode = data.nodes.filter(d => {
          return d.uuid === l.target;
        })[0];
        d3.select(this).attr("target",targetNode.uuid);
        d3.select(this).attr("y2", targetNode.y);
        return targetNode.x;
      })
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width","6px");

    const drag = d3.behavior.drag()
      .on("drag", function(d, i) {
        d.x += d3.event.dx;
        d.y += d3.event.dy;
        d3.select(this).attr("transform", d => "translate(" + (d.x - RECT_SIZE) + "," + (d.y - RECT_SIZE) + ")");
        d3.select("line[target="+d.uuid+"]").attr("x2", d.x).attr("y2", d.y);
        d3.select("line[source="+d.uuid+"]").attr("x1", d.x).attr("y1", d.y);
      });



    const nodes = svg.selectAll("node")
      .data(data.nodes)
      .enter()
      .append("g")
      .attr("transform", d => "translate(" + (d.x - RECT_SIZE) + "," + (d.y - RECT_SIZE) + ")")
      .call(drag);

    // add title
    nodes
      .append("title")
      .text(this.getTitle);

    const rects = nodes
      .append("rect")
      .attr("class", "node")
      .attr("width", RECT_SIZE * 2)
      .attr("height", RECT_SIZE * 2)
      .attr("rx", RECT_SIZE / 4)
      .attr("ry", RECT_SIZE / 4)
      .attr("fill", function(d, i) {
        return c10(i);
      });

    nodes
      .append("div")
      .attr("class", "buttons");
    nodes
      .append("text")
      .text(d => d.name)
      .style("text-anchor", "start")
      .style("fill", "#555");

  }

}
