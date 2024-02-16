import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {
  BuildingPageGetAllBuildingsComponent
} from './components/building-pages/building-page-get-All-Buildings/building-page-get-All-Buildings.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {
  BuildingPageSelectionComponent
} from './components/building-pages/building-page-selection/building-page-selection.component';
import {EnterPageComponent} from './components/enter-page/enter-page.component';
import {
  BuildingPageCreateBuildingComponent
} from './components/building-pages/building-page-create-building/building-page-create-building.component';
import {
  BuildingPageEditBuildingComponent
} from './components/building-pages/building-page-edit-building/building-page-edit-building.component';
import {
  BuildingPageGetParameterBuildingsComponent
} from './components/building-pages/building-page-get-parameter-buildings/building-page-get-parameter-buildings.component';
import {ModulesPageSelectionComponent} from './components/modules-page-selection/modules-page-selection.component';
import {
  GestaodocampusPageSelectionComponent
} from './components/gestaodocampus-page-selection/gestaodocampus-page-selection.component';
import {
  FloorPageSelectionComponent
} from './components/floor-pages/floor-page-selection/floor-page-selection.component';
import {
  FloorPageCreateFloorComponent
} from './components/floor-pages/floor-page-create-floor/floor-page-create-floor.component';
import {
  AdministrationsystemPageSelectionComponent
} from './components/administration-system-page-selection/administrationsystem-page-selection.component';
import {
  InformationPageSelectionComponent
} from './components/information-pages/information-page-selection/information-page-selection.component';
import {
  InformationPageAboutusComponent
} from './components/information-pages/information-page-aboutus/information-page-aboutus.component';
import {
  InformationPageRgpdComponent
} from './components/information-pages/information-page-rgpd/information-page-rgpd.component';
import {
  InformationPagePrivacypolicyComponent
} from './components/information-pages/information-page-privacypolicy/information-page-privacypolicy.component';
import {
  PassagewayPageCreateComponent
} from './components/passageway-pages/passageway-page-create-passageway/passageway-page-create-passageway.component';
import {
  PassagewayPageEditComponent
} from './components/passageway-pages/passageway-page-edit-passageway/passageway-page-edit-passageway.component';
import {
  PassagewayPageGetPassagewaysComponent
} from "./components/passageway-pages/passageway-page-get-all-passageways/passageway-page-get-all-passageways.component";
import {
  RobotTypePageCreateRobotTypeComponent
} from './components/robot-type-pages/robot-type-page-create-robot-type/robot-type-page-create-robot-type.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {
  RobotPageCreateRobotComponent
} from './components/robot-pages/robot-page-create-robot/robot-page-create-robot.component';
import {
  RobotPageManageRobotsComponent
} from './components/robot-pages/robot-page-manage-robots/robot-page-manage-robots.component';
import {VisualizationPageComponent} from './components/visualization-page/visualization-page.component';
import {
  PassagewayPageSelectionComponent
} from "./components/passageway-pages/passageway-page-selection/passageway-page-selection.component";
import {RegisterpageComponent} from './components/registerpage/registerpage.component';
import {MainPageComponent} from './components/main-page/main-page.component';
import {
  ElevatorPageSelectionComponent
} from './components/elevator-pages/elevator-page-selection/elevator-page-selection.component';
import {
  ElevatorPageCreateElevatorComponent
} from './components/elevator-pages/elevator-page-create-elevator/elevator-page-create-elevator.component';
import {
  ElevatorPageEditElevatorComponent
} from './components/elevator-pages/elevator-page-edit-elevator/elevator-page-edit-elevator.component';
import {
  ElevatorPageGetElevatorComponent
} from './components/elevator-pages/elevator-page-get-elevator/elevator-page-get-elevator.component';
import {
  FloorPageGetByBuildingComponent
} from './components/floor-pages/floor-page-get-by-building/floor-page-get-by-building.component';
import {RoomPageSelectionComponent} from './components/room-pages/room-page-selection/room-page-selection.component';
import {
  RoomPageCreateRoomComponent
} from './components/room-pages/room-page-create-room/room-page-create-room.component';
import {
  FloorPageUpdateFloorComponent
} from './components/floor-pages/floor-page-update-floor/floor-page-update-floor.component';
import {
  FloorPageUpdateFloormapComponent
} from './components/floor-pages/floor-page-update-floormap/floor-page-update-floormap.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {
  PassagewayPageGetFloorsFromBuildingWithPassagewayComponent
} from "./components/passageway-pages/passageway-page-get-floors-from-building/passageway-page-get-floors-from-building.component";
import {PlaneamentoDeTarefasComponent} from './components/task-pages/planeamento-de-tarefas/planeamento-de-tarefas.component';
import {
  PersonalInformationPagesComponent
} from './components/Personal-Information/personal-information-pages/personal-information-pages.component';
import {
  PersonalInformationModifyComponent
} from './components/Personal-Information/personal-information-modify/personal-information-modify.component';
import {
  PersonalInformationCopyComponent
} from './components/Personal-Information/personal-information-copy/personal-information-copy.component';
import {
  PersonalInformationDeleteComponent
} from './components/Personal-Information/personal-information-delete/personal-information-delete.component';
import {
  AdminInformationSelectorComponent
} from './components/admin-information/admin-information-selector/admin-information-selector.component';
import {
  AdminInformationCreateusersComponent
} from './components/admin-information/admin-information-createusers/admin-information-createusers.component';
import {
  AdminInformationApproveutentesComponent
} from './components/admin-information/admin-information-approveutentes/admin-information-approveutentes.component';
import {FleetPageSelectionComponent} from "./components/fleet-page-selection/fleet-page-selection.component";
import {
  RobotTypePageSelectionComponent
} from "./components/robot-type-pages/robot-type-page-selection/robot-type-page-selection.component";
import {
  RobotPageSelectionComponent
} from "./components/robot-pages/robot-page-selection/robot-page-selection.component";
import { TaskPageSelectionComponent } from './components/task-pages/task-page-selection/task-page-selection.component';
import {
  TaskPageCreateTransporTaskComponent
} from './components/task-pages/task-page-create-transport-task/task-page-create-transport-task.component';
import { TaskPageCreateSurveillanceTaskComponent } from './components/task-pages/task-page-create-surveillance-task/task-page-create-surveillance-task.component';
import { TaskPageRequestedTasksComponent } from './components/task-pages/task-page-requested-tasks/task-page-requested-tasks.component';
import { TaskPageSearchTasksComponent } from './components/task-pages/task-page-search-tasks/task-page-search-tasks.component';
import { TaskPageSequenceExecutionTasksComponent } from './components/task-pages/task-page-sequence-execution-tasks/task-page-sequence-execution-tasks.component';
import {
  TaskPageAssignRobotComponent
} from "./components/task-pages/task-page-assign-robot/task-page-assign-robot.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    TaskPageCreateTransporTaskComponent,
    AdminInformationCreateusersComponent,
    RobotPageSelectionComponent,
    RobotTypePageSelectionComponent,
    FleetPageSelectionComponent,
    BuildingPageGetAllBuildingsComponent,
    BuildingPageSelectionComponent,
    EnterPageComponent,
    BuildingPageCreateBuildingComponent,
    BuildingPageEditBuildingComponent,
    AdminInformationApproveutentesComponent,
    AdministrationsystemPageSelectionComponent,
    InformationPageSelectionComponent,
    InformationPageAboutusComponent,
    InformationPageRgpdComponent,
    InformationPagePrivacypolicyComponent,
    PassagewayPageCreateComponent,
    BuildingPageGetParameterBuildingsComponent,
    ModulesPageSelectionComponent,
    GestaodocampusPageSelectionComponent,
    FloorPageSelectionComponent,
    FloorPageCreateFloorComponent,
    ElevatorPageCreateElevatorComponent,
    ElevatorPageEditElevatorComponent,
    ElevatorPageGetElevatorComponent,
    FloorPageGetByBuildingComponent,
    RoomPageSelectionComponent,
    RoomPageCreateRoomComponent,
    FloorPageUpdateFloorComponent,
    FloorPageUpdateFloormapComponent,
    PlaneamentoDeTarefasComponent,
    PersonalInformationPagesComponent,
    PersonalInformationModifyComponent,
    PersonalInformationCopyComponent,
    PersonalInformationDeleteComponent,
    AdminInformationSelectorComponent,
    PassagewayPageEditComponent,
    PassagewayPageGetPassagewaysComponent,
    PassagewayPageGetFloorsFromBuildingWithPassagewayComponent,
    RobotTypePageCreateRobotTypeComponent,
    RobotPageCreateRobotComponent,
    RobotPageManageRobotsComponent,
    VisualizationPageComponent,
    PassagewayPageSelectionComponent,
    RegisterpageComponent,
    MainPageComponent,
    ElevatorPageSelectionComponent,
    TaskPageSelectionComponent,
    TaskPageCreateSurveillanceTaskComponent,
    TaskPageRequestedTasksComponent,
    TaskPageSearchTasksComponent,
    TaskPageSequenceExecutionTasksComponent,
    TaskPageAssignRobotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
