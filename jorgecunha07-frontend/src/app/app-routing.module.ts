import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  BuildingPageCreateBuildingComponent
} from "./components/building-pages/building-page-create-building/building-page-create-building.component";
import {AuthGuardService} from "./IService/services/auth-guard.service";
import {
  BuildingPageEditBuildingComponent
} from "./components/building-pages/building-page-edit-building/building-page-edit-building.component";
import {
  BuildingPageGetAllBuildingsComponent
} from "./components/building-pages/building-page-get-All-Buildings/building-page-get-All-Buildings.component";
import {
  BuildingPageGetParameterBuildingsComponent
} from "./components/building-pages/building-page-get-parameter-buildings/building-page-get-parameter-buildings.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {
  BuildingPageSelectionComponent
} from "./components/building-pages/building-page-selection/building-page-selection.component";
import {
  FloorPageSelectionComponent
} from "./components/floor-pages/floor-page-selection/floor-page-selection.component";
import {
  FloorPageCreateFloorComponent
} from "./components/floor-pages/floor-page-create-floor/floor-page-create-floor.component";
import {
  FloorPageGetByBuildingComponent
} from "./components/floor-pages/floor-page-get-by-building/floor-page-get-by-building.component";
import {EnterPageComponent} from "./components/enter-page/enter-page.component";
import {ModulesPageSelectionComponent} from "./components/modules-page-selection/modules-page-selection.component";
import {
  GestaodocampusPageSelectionComponent
} from "./components/gestaodocampus-page-selection/gestaodocampus-page-selection.component";
import {FleetPageSelectionComponent} from "./components/fleet-page-selection/fleet-page-selection.component";
import {
  RobotTypePageSelectionComponent
} from "./components/robot-type-pages/robot-type-page-selection/robot-type-page-selection.component";
import {
  RobotTypePageCreateRobotTypeComponent
} from "./components/robot-type-pages/robot-type-page-create-robot-type/robot-type-page-create-robot-type.component";
import {
  RobotPageSelectionComponent
} from "./components/robot-pages/robot-page-selection/robot-page-selection.component";
import {
  RobotPageCreateRobotComponent
} from "./components/robot-pages/robot-page-create-robot/robot-page-create-robot.component";
import {
  RobotPageManageRobotsComponent
} from "./components/robot-pages/robot-page-manage-robots/robot-page-manage-robots.component";
import {
  ElevatorPageSelectionComponent
} from "./components/elevator-pages/elevator-page-selection/elevator-page-selection.component";
import {
  ElevatorPageCreateElevatorComponent
} from "./components/elevator-pages/elevator-page-create-elevator/elevator-page-create-elevator.component";
import {
  ElevatorPageEditElevatorComponent
} from "./components/elevator-pages/elevator-page-edit-elevator/elevator-page-edit-elevator.component";
import {
  ElevatorPageGetElevatorComponent
} from "./components/elevator-pages/elevator-page-get-elevator/elevator-page-get-elevator.component";
import {RoomPageSelectionComponent} from "./components/room-pages/room-page-selection/room-page-selection.component";
import {
  RoomPageCreateRoomComponent
} from "./components/room-pages/room-page-create-room/room-page-create-room.component";
import {
  AdministrationsystemPageSelectionComponent
} from "./components/administration-system-page-selection/administrationsystem-page-selection.component";
import {
  InformationPageSelectionComponent
} from "./components/information-pages/information-page-selection/information-page-selection.component";
import {
  InformationPageAboutusComponent
} from "./components/information-pages/information-page-aboutus/information-page-aboutus.component";
import {
  InformationPageRgpdComponent
} from "./components/information-pages/information-page-rgpd/information-page-rgpd.component";
import {
  InformationPagePrivacypolicyComponent
} from "./components/information-pages/information-page-privacypolicy/information-page-privacypolicy.component";
import {
  PassagewayPageSelectionComponent
} from "./components/passageway-pages/passageway-page-selection/passageway-page-selection.component";
import {
  PassagewayPageCreateComponent
} from "./components/passageway-pages/passageway-page-create-passageway/passageway-page-create-passageway.component";
import {
  PassagewayPageEditComponent
} from "./components/passageway-pages/passageway-page-edit-passageway/passageway-page-edit-passageway.component";
import {
  PassagewayPageGetPassagewaysComponent
} from "./components/passageway-pages/passageway-page-get-all-passageways/passageway-page-get-all-passageways.component";
import {
  PassagewayPageGetFloorsFromBuildingWithPassagewayComponent
} from "./components/passageway-pages/passageway-page-get-floors-from-building/passageway-page-get-floors-from-building.component";
import {VisualizationPageComponent} from "./components/visualization-page/visualization-page.component";
import {MainPageComponent} from "./components/main-page/main-page.component";
import {RegisterpageComponent} from "./components/registerpage/registerpage.component";
import {
  FloorPageUpdateFloorComponent
} from "./components/floor-pages/floor-page-update-floor/floor-page-update-floor.component";
import {
  FloorPageUpdateFloormapComponent
} from "./components/floor-pages/floor-page-update-floormap/floor-page-update-floormap.component";
import {PlaneamentoDeTarefasComponent} from "./components/task-pages/planeamento-de-tarefas/planeamento-de-tarefas.component";
import {
  PersonalInformationPagesComponent
} from "./components/Personal-Information/personal-information-pages/personal-information-pages.component";
import {
  PersonalInformationModifyComponent
} from "./components/Personal-Information/personal-information-modify/personal-information-modify.component";
import {
  PersonalInformationCopyComponent
} from "./components/Personal-Information/personal-information-copy/personal-information-copy.component";
import {
  PersonalInformationDeleteComponent
} from "./components/Personal-Information/personal-information-delete/personal-information-delete.component";
import {
  AdminInformationSelectorComponent
} from "./components/admin-information/admin-information-selector/admin-information-selector.component";
import {
  AdminInformationCreateusersComponent
} from "./components/admin-information/admin-information-createusers/admin-information-createusers.component";
import {
  AdminInformationApproveutentesComponent
} from "./components/admin-information/admin-information-approveutentes/admin-information-approveutentes.component";

import {
  TaskPageCreateSurveillanceTaskComponent
} from "./components/task-pages/task-page-create-surveillance-task/task-page-create-surveillance-task.component";
import {
  TaskPageRequestedTasksComponent
} from "./components/task-pages/task-page-requested-tasks/task-page-requested-tasks.component";
import {
  TaskPageSearchTasksComponent
} from "./components/task-pages/task-page-search-tasks/task-page-search-tasks.component";
import {
  TaskPageSequenceExecutionTasksComponent
} from "./components/task-pages/task-page-sequence-execution-tasks/task-page-sequence-execution-tasks.component";
import {TaskPageSelectionComponent} from "./components/task-pages/task-page-selection/task-page-selection.component";
import {
  TaskPageCreateTransporTaskComponent
} from "./components/task-pages/task-page-create-transport-task/task-page-create-transport-task.component";
import {
  TaskPageAssignRobotComponent
} from "./components/task-pages/task-page-assign-robot/task-page-assign-robot.component";

const routes: Routes = [
  {
    path: 'gestaodocampus/buildings/CreateBuilding',
    component: BuildingPageCreateBuildingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/buildings/EditBuilding',
    component: BuildingPageEditBuildingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/buildings/FindAllBuildings',
    component: BuildingPageGetAllBuildingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/buildings/FindAllBuildingsByParameter',
    component: BuildingPageGetParameterBuildingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'gestaodocampus/buildings',
    component: BuildingPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/floors',
    component: FloorPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/floors/CreateFloor',
    component: FloorPageCreateFloorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/floors/FloorByBuilding',
    component: FloorPageGetByBuildingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    component: EnterPageComponent,
  },
  {
    path: 'modules',
    component: ModulesPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus',
    component: GestaodocampusPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'fleet',
    component: FleetPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'fleet/robot-types',
    component: RobotTypePageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'fleet/robot-types/create',
    component: RobotTypePageCreateRobotTypeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'fleet/robot',
    component: RobotPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'fleet/robot/create',
    component: RobotPageCreateRobotComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'fleet/robot/manage',
    component: RobotPageManageRobotsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/elevators',
    component: ElevatorPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/elevators/CreateElevator',
    component: ElevatorPageCreateElevatorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/elevators/EditElevator',
    component: ElevatorPageEditElevatorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/elevators/ElevatorsByBuilding',
    component: ElevatorPageGetElevatorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/rooms',
    component: RoomPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/rooms/CreateRoom',
    component: RoomPageCreateRoomComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: 'modules',
    component: ModulesPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'administrationsystem',
    component: AdministrationsystemPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'information',
    component: InformationPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'information/aboutus',
    component: InformationPageAboutusComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'information/rgpd',
    component: InformationPageRgpdComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'information/privacypolicy',
    component: InformationPagePrivacypolicyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/passageways',
    component: PassagewayPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/passageways/createPassageway',
    component: PassagewayPageCreateComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/passageways/editPassageway',
    component: PassagewayPageEditComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/passageways/getAllPassagewaysBetweenBuildings',
    component: PassagewayPageGetPassagewaysComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/passageways/getFloorsFromBuildingWithPassageway',
    component: PassagewayPageGetFloorsFromBuildingWithPassagewayComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '3dvisualization',
    component: VisualizationPageComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'mainpage',
    component: MainPageComponent,
  },
  {
    path: 'register',
    component: RegisterpageComponent,
  },
  {
    path: 'gestaodocampus/floors/UpdateFloor',
    component: FloorPageUpdateFloorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'gestaodocampus/floors/UpdateFloorMap',
    component: FloorPageUpdateFloormapComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task/planeamentodetarefas',
    component: PlaneamentoDeTarefasComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'PersonalInformation',
    component: PersonalInformationPagesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'PersonalInformation/modifyPersonalData',
    component: PersonalInformationModifyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'PersonalInformation/InformationCopy',
    component: PersonalInformationCopyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'PersonalInformation/deleteAccount',
    component: PersonalInformationDeleteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'AdminInformation',
    component: AdminInformationSelectorComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'AdminInformation/CreateUsers',
    component: AdminInformationCreateusersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'AdminInformation/ApproveUsers',
    component: AdminInformationApproveutentesComponent,
    canActivate: [AuthGuardService],
  },{
    path: 'task/createTransportTask',
    component: TaskPageCreateTransporTaskComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task/createsurveillanceTask',
    component: TaskPageCreateSurveillanceTaskComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task/requestedTasks',
    component: TaskPageRequestedTasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task/searchTasks',
    component: TaskPageSearchTasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task/planeamentosequenciadetarefas',
    component: TaskPageSequenceExecutionTasksComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task',
    component: TaskPageSelectionComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'task/robot',
    component: TaskPageAssignRobotComponent,
    canActivate: [AuthGuardService],
  }




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}


