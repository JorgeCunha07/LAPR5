import {Component, OnInit} from '@angular/core';
import FloorDTO from '../../../dto/IFloorDTO';
import { AuthService } from "../../../IService/services/auth.service";
import { FloorService } from "../../../IService/services/floor.service";
import {BuildingService} from "../../../IService/services/building.service";
import BuildingDTO from "../../../dto/BuildingDTO";
import {Router} from "@angular/router";

function isValidFloorMap(jsonContent: any) {
  // Here you should add logic to validate the json object against the IFloorMap interface
  // This can be as simple or complex as your application requires
  // For example, checking if required fields are present and have the correct data types
  return true;
}

@Component({
  selector: 'app-floor-page-create-floor',
  templateUrl: './floor-page-create-floor.component.html',
  styleUrls: ['./floor-page-create-floor.component.scss']
})
  export class FloorPageCreateFloorComponent implements OnInit {
  listBuildings: BuildingDTO[] = [];
  floor: FloorDTO = {
    buildingFinderId: "",
    floorNumber: 0,
    floorDescription: "",
    floorMap: undefined,
    floorMaxDimensions: {
      width: 0,
      length: 0,
    }
  };

  addFloorMap: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private floorService: FloorService,private buildingService: BuildingService,  private router: Router) {}

  goBack(){
    this.router.navigate(['gestaodocampus/floors']);
  }
  ngOnInit(): void {
    this.loadBuildings();
  }

  private loadBuildings(): void {
    this.buildingService.getList().subscribe({
      next: (data) => this.listBuildings = data,
      error: (error) => console.error('Failed to load buildings', error)
    });
  }

  createFloor() {
    console.log(JSON.stringify(this.floor.floorMap?.maze.map));


    this.floorService.createFloor(this.floor).subscribe(
      response => this.successMessage = 'Floor created successfully!',
      error => this.errorMessage = `Error creating floor: ${error.error.errors.message}`
    );
  }



  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if(file.type === "application/json") { // Correct MIME type for JSON files
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const fileContent = e.target.result;

          try {
            const jsonContent = JSON.parse(fileContent);

            // Validate the jsonContent against the IFloorMap structure
            if (isValidFloorMap(jsonContent)) {
              console.log('Valid FloorMap:', jsonContent);
              this.floor.floorMap = jsonContent;
              // Handle the valid floor map here
            } else {
              console.error('Invalid FloorMap structure');
            }

          } catch (error) {
            console.error('Error parsing file content:', error);
          }
        };

        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };

        reader.readAsText(file);
      } else {
        console.error('The selected file is not a JSON file.');
      }
    }
  }

}
