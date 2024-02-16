import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { OBB } from "three/addons/math/OBB.js";
import { merge } from "./merge.js";
import Ground from "./ground.js";
import Wall from "./wall.js";
import Window from "./window.js";
import Ceiling from "./ceiling.js";
import BigDoor from "./bigDoor.js";
import TWEEN from "three/addons/libs/tween.module.js";
import Elevator from "./elevator";
import Passageway from "./passageway";
import UserInterface from "./user_interface";

/*
 * parameters = {
 *  url: String,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 */

export default class Maze extends THREE.Group {

  listPassageways;
  iterableListPassageways;
  passagewayEntered;
  locationOnExit;
  firstTimeOpening;
  flagAutomaticPathElevator;
  constructor(parameters, camera, scene, firstTimeOpening, thumbRaiser,passagewayEntered,locationOnExit,automaticPath, flagAutomaticPathElevator) {
    super();
    merge(this, parameters, camera, scene);
    this.loaded = false;

     this.onLoad = function (description) {

       this.currentJsonFile = this.url.split('/').pop().split('.')[0];
       this.listPassageways = description.passageways;
       const listPassageways = this.listPassageways;
       if (listPassageways != null){
       this.iterableListPassageways = Object.values(description.passageways).map(passageway => {
         return {
           floor: passageway.floor,
           location: passageway.location,
           locationOnExit: passageway.locationOnExit
         };
       });
       const iterableListPassageways = this.iterableListPassageways;
       }
       this.passagewayEntered = passagewayEntered;
       this.locationOnExit = locationOnExit;
       this.firstTimeOpening = firstTimeOpening;
       this.flagAutomaticPathElevator = flagAutomaticPathElevator;

       console.log("ajuda");
       console.log(flagAutomaticPathElevator);
       console.log("Começo");
       console.log(this.flagAutomaticPathElevator);


      const normalMapTypes = [THREE.TangentSpaceNormalMap, THREE.ObjectSpaceNormalMap];
      const wrappingModes = [THREE.ClampToEdgeWrapping, THREE.RepeatWrapping, THREE.MirroredRepeatWrapping];
      const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
      const minificationFilters = [THREE.NearestFilter, THREE.NearestMipmapNearestFilter, THREE.NearestMipmapLinearFilter, THREE.LinearFilter, THREE.LinearMipmapNearestFilter, THREE.LinearMipmapLinearFilter];
      this.elevatorPopupShown = false;
      // Store the maze's size, map and exit location
      this.size = description.maze.size;
      this.halfSize = { width: this.size.width / 2.0, depth: this.size.depth / 2.0 };
      this.map = description.maze.map;
      this.exitLocation = this.cellToCartesian(description.maze.exitLocation);
      // Create the helpers
      this.helper = new THREE.Group();

      const ground = new Ground({
        size: new THREE.Vector3(description.ground.size.width, description.ground.size.height, description.ground.size.depth),
        segments: new THREE.Vector3(description.ground.segments.width, description.ground.segments.height, description.ground.segments.depth),
        materialParameters: {
          color: new THREE.Color(parseInt(description.ground.primaryColor, 16)),
          mapUrl: description.ground.maps.color.url,
          aoMapUrl: description.ground.maps.ao.url,
          aoMapIntensity: description.ground.maps.ao.intensity,
          displacementMapUrl: description.ground.maps.displacement.url,
          displacementScale: description.ground.maps.displacement.scale,
          displacementBias: description.ground.maps.displacement.bias,
          normalMapUrl: description.ground.maps.normal.url,
          normalMapType: normalMapTypes[description.ground.maps.normal.type],
          normalScale: new THREE.Vector2(description.ground.maps.normal.scale.x, description.ground.maps.normal.scale.y),
          bumpMapUrl: description.ground.maps.bump.url,
          bumpScale: description.ground.maps.bump.scale,
          roughnessMapUrl: description.ground.maps.roughness.url,
          roughness: description.ground.maps.roughness.rough,
          wrapS: wrappingModes[description.ground.wrapS],
          wrapT: wrappingModes[description.ground.wrapT],
          repeat: new THREE.Vector2(description.ground.repeat.u, description.ground.repeat.v),
          magFilter: magnificationFilters[description.ground.magFilter],
          minFilter: minificationFilters[description.ground.minFilter]
        },
        secondaryColor: new THREE.Color(parseInt(description.ground.secondaryColor, 16))
      });
      this.add(ground);


      const ceiling = new Ceiling({
        size: new THREE.Vector3(description.ground.size.width, description.ground.size.height, description.ground.size.depth),
        segments: new THREE.Vector3(description.ground.segments.width, description.ground.segments.height, description.ground.segments.depth),
        materialParameters: {
          color: new THREE.Color(parseInt(description.ground.primaryColor, 16)),
          mapUrl: 'assets/textures/ceiling/ceiling.jpg',
          normalMapUrl: 'assets/textures/ceiling/ceiling.jpg',
          normalMapType: normalMapTypes[description.wall.maps.normal.type],
          normalScale: new THREE.Vector2(0.5, 0.5),
          bumpScale: 1,
          roughness: 0.5,
          wrapS: 32,
          wrapT: 32,
          repeat: new THREE.Vector2(16, 16),
        },
        secondaryColor: new THREE.Color(parseInt(description.ground.secondaryColor, 16))
      });
      ceiling.position.set(0, 0.80, 0);
      this.add(ceiling);


      // Create a wall
      const wall = new Wall({
        groundHeight: description.ground.size.height,
        segments: new THREE.Vector2(description.wall.segments.width, description.wall.segments.height),
        materialParameters: {
          color: new THREE.Color(parseInt(description.wall.primaryColor, 16)),
          mapUrl: description.wall.maps.color.url,
          aoMapUrl: description.wall.maps.ao.url,
          aoMapIntensity: description.wall.maps.ao.intensity,
          displacementMapUrl: description.wall.maps.displacement.url,
          displacementScale: description.wall.maps.displacement.scale,
          displacementBias: description.wall.maps.displacement.bias,
          normalMapUrl: description.wall.maps.normal.url,
          normalMapType: normalMapTypes[description.wall.maps.normal.type],
          normalScale: new THREE.Vector2(description.wall.maps.normal.scale.x, description.wall.maps.normal.scale.y),
          bumpMapUrl: description.wall.maps.bump.url,
          bumpScale: description.wall.maps.bump.scale,
          roughnessMapUrl: description.wall.maps.roughness.url,
          roughness: description.wall.maps.roughness.rough,
          wrapS: wrappingModes[description.wall.wrapS],
          wrapT: wrappingModes[description.wall.wrapT],
          repeat: new THREE.Vector2(description.wall.repeat.u, description.wall.repeat.v),
          magFilter: magnificationFilters[description.wall.magFilter],
          minFilter: minificationFilters[description.wall.minFilter]
        },
        secondaryColor: new THREE.Color(parseInt(description.wall.secondaryColor, 16))
      });

      const window = new Window({
        groundHeight: description.ground.size.height,
        segments: new THREE.Vector2(description.wall.segments.width, description.wall.segments.height),
        materialParameters: {
          color: 0xffffff,
          transmission: 1,
          opacity: 1,
          metalness: 0,
          roughness: 0,
          ior: 1.5,
          thickness: 0.01,
          specularIntensity: 1,
          specularColor: 0xffffff,
          envMapIntensity: 1,
          lightIntensity: 1,
          exposure: 1
        },
        secondaryColor: new THREE.Color(parseInt(description.wall.secondaryColor, 16))
      });


      const bigDoorObject = new BigDoor({
        groundHeight: description.ground.size.height,
        segments: new THREE.Vector2(description.passageway.segments.width, description.passageway.segments.height),
        materialParameters: {
          color: new THREE.Color(parseInt(description.passageway.primaryColor, 16)),
          mapUrl: description.passageway.maps.color.url,
          aoMapUrl: description.passageway.maps.ao.url,
          aoMapIntensity: description.passageway.maps.ao.intensity,
          displacementMapUrl: description.passageway.maps.displacement.url,
          displacementScale: description.passageway.maps.displacement.scale,
          displacementBias: description.passageway.maps.displacement.bias,
          normalMapUrl: description.passageway.maps.normal.url,
          normalMapType: normalMapTypes[description.passageway.maps.normal.type],
          normalScale: new THREE.Vector2(description.passageway.maps.normal.scale.x, description.passageway.maps.normal.scale.y),
          bumpMapUrl: description.passageway.maps.bump.url,
          bumpScale: description.passageway.maps.bump.scale,
          roughnessMapUrl: description.passageway.maps.roughness.url,
          roughness: description.passageway.maps.roughness.rough,
          wrapS: wrappingModes[description.passageway.wrapS],
          wrapT: wrappingModes[description.passageway.wrapT],
          repeat: new THREE.Vector2(description.passageway.repeat.u, description.passageway.repeat.v),
          magFilter: magnificationFilters[description.passageway.magFilter],
          minFilter: minificationFilters[description.passageway.minFilter]
        },
        secondaryColor: new THREE.Color(parseInt(description.wall.secondaryColor, 16))
      }, camera, scene);

       const passageway = new Passageway({
         groundHeight: description.ground.size.height,
         segments: new THREE.Vector2(description.passageway.segments.width, description.passageway.segments.height),
         materialParameters: {
           color: new THREE.Color(parseInt(description.passageway.primaryColor, 16)),
           mapUrl: description.passageway.maps.color.url,
           aoMapUrl: description.passageway.maps.ao.url,
           aoMapIntensity: description.passageway.maps.ao.intensity,
           displacementMapUrl: description.passageway.maps.displacement.url,
           displacementScale: description.passageway.maps.displacement.scale,
           displacementBias: description.passageway.maps.displacement.bias,
           normalMapUrl: description.passageway.maps.normal.url,
           normalMapType: normalMapTypes[description.passageway.maps.normal.type],
           normalScale: new THREE.Vector2(description.passageway.maps.normal.scale.x, description.passageway.maps.normal.scale.y),
           bumpMapUrl: description.passageway.maps.bump.url,
           bumpScale: description.passageway.maps.bump.scale,
           roughnessMapUrl: description.passageway.maps.roughness.url,
           roughness: description.passageway.maps.roughness.rough,
           wrapS: wrappingModes[description.passageway.wrapS],
           wrapT: wrappingModes[description.passageway.wrapT],
           repeat: new THREE.Vector2(description.passageway.repeat.u, description.passageway.repeat.v),
           magFilter: magnificationFilters[description.passageway.magFilter],
           minFilter: minificationFilters[description.passageway.minFilter]
         },
         secondaryColor: new THREE.Color(parseInt(description.passageway.secondaryColor, 16))
       }, camera, scene);


          const elevator = new Elevator({
            groundHeight: description.ground.size.height,
            segments: new THREE.Vector2(description.elevator.segments.width, description.elevator.segments.height),
            materialParameters: {
              color: new THREE.Color(parseInt(description.elevator.primaryColor, 16)),
              mapUrl: description.elevator.maps.color.url,
              aoMapUrl: description.elevator.maps.ao.url,
              aoMapIntensity: description.elevator.maps.ao.intensity,
              displacementMapUrl: description.elevator.maps.displacement.url,
              displacementScale: description.elevator.maps.displacement.scale,
              displacementBias: description.elevator.maps.displacement.bias,
              normalMapUrl: description.elevator.maps.normal.url,
              normalMapType: normalMapTypes[description.elevator.maps.normal.type],
              normalScale: new THREE.Vector2(description.elevator.maps.normal.scale.x, description.elevator.maps.normal.scale.y),
              bumpMapUrl: description.elevator.maps.bump.url,
              bumpScale: description.elevator.maps.bump.scale,
              roughnessMapUrl: description.elevator.maps.roughness.url,
              roughness: description.elevator.maps.roughness.rough,
              wrapS: wrappingModes[description.elevator.wrapS],
              wrapT: wrappingModes[description.elevator.wrapT],
              repeat: new THREE.Vector2(description.elevator.repeat.u, description.elevator.repeat.v),
              magFilter: magnificationFilters[description.elevator.magFilter],
              minFilter: minificationFilters[description.elevator.minFilter]
            },
            secondaryColor: new THREE.Color(parseInt(description.elevator.secondaryColor, 16))
          }, camera, scene);

      // Build the maze
      let geometriesMake;
      let doorGeometriesArray = [];
      let windowGeometriesArray = [];
      let elevatorGeometries = [];
      let passagewayGeometries = [];
      let geometry;
      doorGeometriesArray[0] = [];
      doorGeometriesArray[1] = [];
      windowGeometriesArray[0] = [];
      windowGeometriesArray[1] = [];
      elevatorGeometries[0] = [];
      elevatorGeometries[1] = [];
      passagewayGeometries[0] = [];
      passagewayGeometries[1] = [];
      this.aabb = [];
      for (let collumn = 0; collumn <= this.size.depth; collumn++) {
          this.aabb[collumn] = [];
        for (let line = 0; line <= this.size.width; line++) {
          this.aabb[collumn][line] = [];
          /*
           *  this.map[][] | North wall | West wall | West Door | North Door|Elevator West | Elevator North |
           * --------------+------------+-----------+-----------+-----------+--------------+----------------|
           *       0       |     No     |     No    |           |           |              |                |
           *       1       |     No     |    Yes    |           |           |              |                |
           *       2       |    Yes     |     No    |           |           |              |                |
           *       3       |    Yes     |    Yes    |           |           |              |                |
           *       4       |     No     |     No    |    Yes    |    No     |              |                |
           *       5       |     No     |     No    |     No    |   Yes     |              |                |
           *       6       |     No     |     No    |     No    |    No     |     Yes      |      No        |
           *       7       |     No     |     No    |     No    |    No     |     No       |      Yes       |
           */

          if (this.map[collumn][line] === 2 || this.map[collumn][line] === 3) {
            this.aabb[collumn][line][0] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
               if ((collumn === 0 && line % 2 === 0 )
                || (collumn === this.size.depth && line % 2 === 0 )
                || (collumn === this.size.width && line % 2 === 0)){

                geometriesMake = window.geometries[k].clone();
                geometriesMake.applyMatrix4(new THREE.Matrix4().makeTranslation(line - this.halfSize.width + 0.5, 0.25, collumn - this.halfSize.depth));
                geometriesMake.computeBoundingBox();
                geometriesMake.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                windowGeometriesArray[k].push(geometriesMake);

              } else {
                geometriesMake = wall.geometries[k].clone();
                geometriesMake.applyMatrix4(new THREE.Matrix4().makeTranslation(line - this.halfSize.width + 0.5, 0.25, collumn - this.halfSize.depth));
                geometriesMake.computeBoundingBox();
                geometriesMake.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
                doorGeometriesArray[k].push(geometriesMake);
              }
              this.aabb[collumn][line][0].union(geometriesMake.boundingBox);
            }
            this.helper.add(new THREE.Box3Helper(this.aabb[collumn][line][0], this.helpersColor));
          }
          if (this.map[collumn][line] === 1 || this.map[collumn][line] === 3) {
            this.aabb[collumn][line][1] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometriesMake = wall.geometries[k].clone();
              geometriesMake.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
              geometriesMake.applyMatrix4(new THREE.Matrix4().makeTranslation(line - this.halfSize.width, 0.25, collumn - this.halfSize.depth + 0.5));
              geometriesMake.computeBoundingBox();
              geometriesMake.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
              doorGeometriesArray[k].push(geometriesMake);
              this.aabb[collumn][line][1].union(geometriesMake.boundingBox);
            }
            this.helper.add(new THREE.Box3Helper(this.aabb[collumn][line][1], this.helpersColor));
          }


          if(this.map[collumn][line] === 4) {
            positionDoor(collumn, line, bigDoorObject, this, 1);
          }

          if(this.map[collumn][line] === 5) {
            positionDoor(collumn, line, bigDoorObject, this, 0);
          }

          if(this.map[collumn][line] == 6) {
            this.aabb[collumn][line][0] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometry = elevator.geometries[k].clone();
              geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(line - this.halfSize.width + 0.5, 0.25, collumn - this.halfSize.depth));
              geometry.computeBoundingBox();
              geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
              elevatorGeometries[k].push(geometry);
            }
            this.helper.add(new THREE.Box3Helper(this.aabb[collumn][line][0], this.helpersColor));
          }

          if(this.map[collumn][line] == 7) {
            this.aabb[collumn][line][1] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometry = elevator.geometries[k].clone();
              geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
              geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(line - this.halfSize.width + 0.5, 0.25, collumn - this.halfSize.depth));
              geometry.computeBoundingBox();
              geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
              elevatorGeometries[k].push(geometry);
            }
            this.helper.add(new THREE.Box3Helper(this.aabb[collumn][line][0], this.helpersColor));
          }
          //horizontal
          if(this.map[collumn][line] == -2) {
            this.aabb[collumn][line][0] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometry = passageway.geometries[k].clone();
              geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(line - this.halfSize.width + 0.5 , 0.25, collumn - this.halfSize.depth));
              geometry.computeBoundingBox();
              geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
              passagewayGeometries[k].push(geometry);
            }
            this.helper.add(new THREE.Box3Helper(this.aabb[collumn][line][0], this.helpersColor));
          }
          //vertical
          if(this.map[collumn][line] == -1) {
            this.aabb[collumn][line][1] = new THREE.Box3();
            for (let k = 0; k < 2; k++) {
              geometry = passageway.geometries[k].clone();
              geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
              geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(line - this.halfSize.width , 0.25, collumn - this.halfSize.depth + 0.5));
              geometry.computeBoundingBox();
              geometry.boundingBox.applyMatrix4(new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z));
              passagewayGeometries[k].push(geometry);
            }
            this.helper.add(new THREE.Box3Helper(this.aabb[collumn][line][0], this.helpersColor));
          }

        }
      }

      let mergedGeometry, mergedWindowWateryGeometry, mesh, glassWallMesh,mergedElevatorGeometry,elevatorMesh,mergedPassagewayGeometry,passagewayMesh;
      for (let i = 0; i < 2; i++) {
        mergedWindowWateryGeometry = BufferGeometryUtils.mergeGeometries(windowGeometriesArray[i], false);
        mergedPassagewayGeometry = BufferGeometryUtils.mergeGeometries(passagewayGeometries[i], false);
        mergedElevatorGeometry = BufferGeometryUtils.mergeGeometries(elevatorGeometries[i], false);
        mergedGeometry = BufferGeometryUtils.mergeGeometries(doorGeometriesArray[i], false);

        glassWallMesh = new THREE.Mesh(mergedWindowWateryGeometry, window.materials[i]);
        elevatorMesh = new THREE.Mesh(mergedElevatorGeometry, elevator.materials[i]);
        passagewayMesh = new THREE.Mesh(mergedPassagewayGeometry, passageway.materials[i]);
        mesh = new THREE.Mesh(mergedGeometry, wall.materials[i]);

        elevatorMesh.castShadow = false;
        passagewayMesh.castShadow = false;
        mesh.castShadow = false;
        glassWallMesh.castShadow = false;

        elevatorMesh.receiveShadow = false;
        passagewayMesh.receiveShadow = false;
        mesh.receiveShadow = false;
        glassWallMesh.receiveShadow = false;

        this.add(elevatorMesh);
        this.add(passagewayMesh);
        this.add(mesh);
        this.add(glassWallMesh);

      }
       //console.log(this.passagewayEntered);
       //console.log("ANTIGO LOCALLLLL");
       //console.log("variavel local" + firstTimeOpening);
       //console.log("variavel global" + this.firstTimeOpening);

       if(this.passagewayEntered == true) {
        // console.log(locationOnExit);
         this.initialPosition = this.cellToCartesian(locationOnExit);
       }
       if( this.firstTimeOpening == true) {
        // console.log(locationOnExit);
         this.initialPosition = this.cellToCartesian(description.elevatorFloors.positionWhenLeavingElevator);
         console.log(this.initialPosition);
       }
       //console.log( this.passagewayEntered);
       //console.log( this.firstTimeOpening);
       if (this.passagewayEntered == false && this.firstTimeOpening == false) {
         this.initialPosition = this.cellToCartesian(description.player.initialPosition);
       }



      //console.log(this.initialPosition)
      this.initialDirection = description.player.initialDirection;

      this.loaded = true;
    }


    function positionDoor(i, j, door, classInformation, rotation) {
      const doorGeometry = [door.geometries[0][0]];
      const doorGeometry2 = [door.geometries[0][1]];
      const unionDoorGeometry = new BufferGeometryUtils.mergeGeometries(doorGeometry, false);
      const unionBackDoorGeometry = new BufferGeometryUtils.mergeGeometries(doorGeometry2, false);
      const frontDoorMesh = new THREE.Mesh(unionDoorGeometry, door.materials[5]);
      const baDoorMesh = new THREE.Mesh(unionBackDoorGeometry, door.materials[4]);
      const group = new THREE.Group();
      group.add(frontDoorMesh, baDoorMesh);

      let positionMatrix = new THREE.Matrix4();
      if (rotation === 1) {
        positionMatrix.makeRotationY(Math.PI / 2.0);
        frontDoorMesh.applyMatrix4(positionMatrix);
        baDoorMesh.applyMatrix4(positionMatrix);
        group.position.set(0, 0.4,1);
      }else {
        group.position.set(0, 0.4, 0);
      }


      positionMatrix.makeTranslation(j - classInformation.halfSize.width , 0, i - classInformation.halfSize.depth);
      frontDoorMesh.applyMatrix4(positionMatrix);
      baDoorMesh.applyMatrix4(positionMatrix);

      let box = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
      if (rotation) {
        box.setFromObject(group);
        classInformation.aabb[i][j][0] = box.clone();
        classInformation.helper.add(new THREE.Box3Helper(classInformation.aabb[i][j][0], classInformation.helpersColor));
      } else {
        box.setFromObject(group);
        classInformation.aabb[i][j][1] = box.clone();
        classInformation.helper.add(new THREE.Box3Helper(classInformation.aabb[i][j][1], classInformation.helpersColor));
      }

      classInformation.add(group);

      const helper = new THREE.Raycaster();
      const mouse = new THREE.Vector2( {x: -1000, y: -1000} );

      let state;
      rotation ? state = "aberto" : state = "fechado";
      let tweenFL = new TWEEN.Tween(frontDoorMesh.rotation).easing(TWEEN.Easing.Quadratic.Out);
      let tweenRL = new TWEEN.Tween(baDoorMesh.rotation).easing(TWEEN.Easing.Quadratic.Out);
      const actions = {
        toggle: () => {
          if (state === "aberto") {
            state = "fechado";
            tweenFL.stop();
            tweenFL.to({ y: 0.0 }, 2000 * frontDoorMesh.rotation.y / (Math.PI / 2.0));
            tweenFL.startFromCurrentValues();
            tweenRL.stop();
            tweenRL.to({ y: 0.0 }, 2000 * baDoorMesh.rotation.y / (Math.PI / 2.0));
            tweenRL.startFromCurrentValues();
            TWEEN.update();
          } else {
            state = "aberto";
            tweenFL.stop();
            tweenFL.to({ y: Math.PI / 2 }, 2000 * (1.0 - frontDoorMesh.rotation.y / (Math.PI / 2.0)));
            tweenFL.startFromCurrentValues();
            tweenRL.stop();
            tweenRL.to({ y: Math.PI / 2 }, 2000 * (1.0 - baDoorMesh.rotation.y / (Math.PI / 2.0)));
            tweenRL.startFromCurrentValues();

            TWEEN.update();
          }
        },
        stop: () => {
          state = "stop";
          TWEEN.stop();
        }
      };

      window.addEventListener('mousedown', openDoor);

      function openDoor(event) {


        if (event.target.matches('select') || event.target.closest('select')) {
          console.log('selects');
          return;
        }

        // Check if the clicked element is part of the UI
        if (event.target.closest('#views-panel') || event.target.closest('#mouse-help-panel') || event.target.closest('#keyboard-help-panel') || event.target.closest('#credits-panel') || event.target.closest('#subwindows-panel')) {
          console.log('ui');
          return;
        }

        event.preventDefault();
        // Update mouse position
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        // Define bounds for the smaller clickable area (example values)
        const clickableAreaBounds = {
          minX: -0.5, maxX: 0.5,
          minY: -0.5, maxY: 0.5
        };

        // Check if the click is within the bounds
        if (mouse.x > clickableAreaBounds.minX && mouse.x < clickableAreaBounds.maxX &&
          mouse.y > clickableAreaBounds.minY && mouse.y < clickableAreaBounds.maxY) {

          var doorTypes = [frontDoorMesh, baDoorMesh];
          helper.setFromCamera(mouse, camera.perspective);
          const sections = helper.intersectObjects(doorTypes, true);

          if (sections.length > 0) {
            actions.toggle();
          }
        }
      }



    }
    const onProgress = function (url, xhr) {
      //console.log("Resource '" + url + "' " + (100.0 * xhr.loaded / xhr.total).toFixed(0) + "% loaded.");
    }

    const onError = function (url, error) {
      //console.error("Error loading resource '" + url + "' (" + error + ").");
    }

    // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
    THREE.Cache.enabled = true;

    // Create a resource file loader
    const loader = new THREE.FileLoader();

    // Set the response type: the resource file will be parsed with JSON.parse()
    loader.setResponseType("json");

    // Load a maze description resource file
    loader.load(
      //Resource URL
      this.url,

      // onLoad callback
      description => this.onLoad(description),

      // onProgress callback
      xhr => onProgress(this.url, xhr),

      // onError callback
      error => onError(this.url, error)
    );
  }

  // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
  cellToCartesian(position) {
    return new THREE.Vector3((position[1] - this.halfSize.width + 0.5) * this.scale.x, 0.0, (position[0] - this.halfSize.depth + 0.5) * this.scale.z)
  }

  // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
  cartesianToCell(position) {
    return [Math.floor(position.z / this.scale.z + this.halfSize.depth), Math.floor(position.x / this.scale.x + this.halfSize.width)];
  }

  // Detect collision with corners (method: BC/AABB)
  cornerCollision(indices, offsets, orientation, position, delta, radius, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1]<0;
    if (this.map[row][column] === 2 - orientation || this.map[row][column] === 3) {
      const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
      const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
      if (x * x + z * z < radius * radius) {
        console.log("Collision with " + name + ".");
        return true;
      }
    }
    return false;
  }

  // Detect collision with walls (method: BC/AABB)
  wallCollision(indices, offsets, orientation, position, delta, radius, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (this.map[row][column] === 2 - orientation || this.map[row][column] === 3) {
      if (orientation !== 0) {
        if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
          console.log("Collision with " + name + ".");
          return true;
        }
      }
      else {
        if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
          console.log("Collision with " + name + ".");
          return true;
        }
      }
    }
    return false;
  }

  // Detect collision with walls and corners (method: OBB/AABB)
  wallAndCornerCollision(indices, offsets, orientation, obb, name) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    if (this.map[row][column] === 2 - orientation || this.map[row][column] === 3) {
      if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
        console.log("Collision with " + name + ".");
        return true;
      }
    }
    return false;
  }

  elevatorCollision(indices, offsets, orientation, position, delta, radius, name, userinterface, thumbRaiser) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];
    let collisionX = false;
    let collisionZ = false;

    // Check for elevator collision
    if (this.map[row][column] === 7 || this.map[row][column] === 6 + orientation) {
      collisionX = (orientation !== 0 && Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius);
      collisionZ = (orientation === 0 && Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius);

      if (collisionX || collisionZ) {
          console.log("Collision with " + name + ".");
          if(this.flagAutomaticPathElevator == false) {
            if (!this.elevatorPopupShown) {
              this.elevatorPopupShown = true; // Indicates that the popup has been shown
              this.handleCollisionStart(); // Call handleCollisionStart here
              this.showElevatorPopup(userinterface);
            }
            // Don't allow the player to move further into the elevator
            return true;
        } else {
              this.showLoadingScreenAutomatic(userinterface,thumbRaiser);
              return true;
            }

      }
    }

    // Verify if the collision still exists
    const stillColliding = collisionX || collisionZ;

    // If the collision has ended (and the popup was shown), allow the player to move again
    if (this.elevatorPopupShown && !stillColliding) {
      this.elevatorPopupShown = false; // Reset the flag
      this.allowPlayerMovement(); // Function to reactivate player movement
    }

    // If no collision is detected, allow the player to move
    return false;
  }

  allowPlayerMovement() {
    // Reativa o controle do jogador
    // Primeiro, verifica se o player e a propriedade velocity existem
    if (this.player && this.player.velocity) {
      // Restaura a velocidade anterior
      this.player.velocity.set(this.previousVelocity.x, this.previousVelocity.y, this.previousVelocity.z);
    }
  }

  handleCollisionStart() {
    // Desativa o controlo do jogador e armazena a velocidade atual
    // Verifica novamente se o player e a propriedade velocity existem
    if (this.player && this.player.velocity) {
      // Armazena a velocidade atual antes de parar o jogador
      this.previousVelocity = this.player.velocity.clone();
      // Define a velocidade como zero para parar o jogador
      this.player.velocity.set(0, 0, 0);
    }
  }



  showElevatorPopup(userinterface) {
    // Verifica se o popup já existe
    let popup = document.getElementById('elevatorPopup');

    // Se o popup não existe, crie um novo
   // if (!popup) {
      popup = document.createElement('div');
      popup.id = 'elevatorPopup'; // Atribui um ID ao popup para fácil identificação
      popup.style.position = 'fixed';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.border = '1px solid #ddd';
      popup.style.background = 'white';
      popup.style.padding = '20px';
      popup.style.zIndex = 1000;
      popup.innerHTML = '<h1>You reached the elevator</h1><p> Go to which floor ?</p>';

      this.addFloorButtonsToPopup(popup, userinterface, this.currentJsonFile)

    // Adicionando o popup ao corpo do documento
    document.body.appendChild(popup);

    // Fecha o popup automaticamente após 4 segundos
    setTimeout(() => {
      if (popup) {
        popup.remove();
      }
    }, 2000);
  }

  addFloorButtonsToPopup(popup, userinterface, jsonFile) {
    const jsonFileToUse = `assets/mazes/${jsonFile}.json`;
    fetch(jsonFileToUse)
      .then(response => response.json())
      .then(data => {
        data.elevatorFloors.floors.forEach(floor => {
          // const positionWhenLeavingElevator = data.elevatorFloors.positionWhenLeavingElevator;
          // console.log(positionWhenLeavingElevator) // 2 , 2
          const button = document.createElement("button");
          button.innerText = `Go to Floor ${floor}`;
          button.onclick = () => {
            this.showLoadingScreen(userinterface);
            setTimeout(() => {
              userinterface.loadMapFromURL(floor);
              userinterface.close()
              popup.style.display = 'none';
            }, 3000);
          };
          popup.appendChild(button);
        });
      })
      .catch(error => console.error('Error loading JSON:', error));
  }
  showLoadingScreenAutomatic(userinterface,thumbRaiser) {
    userinterface.createLoadingScreen();
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) loadingScreen.remove();
    }, 3000); // 3000 ms = 3 segundos

    const nextMap = thumbRaiser.automaticPath.nextIdentifier;
    userinterface.loadMapFromURL(nextMap);

  }

  showLoadingScreen(userinterface) {
    userinterface.createLoadingScreen();
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) loadingScreen.remove();
    }, 3000); // 3000 ms = 3 segundos
  }

  showPassagewayLoadingScreen(userinterface) {
    userinterface.createPassagewayLoadingScreen();
    userinterface.close()
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreenPassageway');
      if (loadingScreen) loadingScreen.remove();
    }, 3000); // 3000 ms = 3 segundos
  }

  passagewayCollision(indices, offsets, orientation, position, delta, radius, name, userinterface, thumbRaiser) {
    const row = indices[0] + offsets[0];
    const column = indices[1] + offsets[1];

    // Check for collision
    if (this.map[row][column] === -1 || this.map[row][column] === -2 + orientation) {
      if ((orientation !== 0 && Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) ||
        (orientation === 0 && Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius)) {

        console.log("Collision with " + name + ".");

        // Find the nearest passageway
        let nearestPassageway = null;
        let minDistance = Number.MAX_VALUE;
        for (let passageway of thumbRaiser.maze.iterableListPassageways) {
          let distance = Math.sqrt(
            Math.pow(row - passageway.location[0], 2) +
            Math.pow(column - passageway.location[1], 2)
          );
          //console.log(passageway);
          //console.log("Distance" + distance);

          if (distance < minDistance) {
            minDistance = distance;
            nearestPassageway = passageway;
          }

        }


        if (nearestPassageway) {
          this.handleCollisionStart();
         // console.log("Nearest passageway: Floor " + nearestPassageway.floor + ", Location " + nearestPassageway.location);
          this.showPassagewayLoadingScreen(userinterface);
          setTimeout(() => {
            userinterface.loadMapFromURLPassageway(nearestPassageway);
          }, 3000);
        }
        return true;

      }
    }

    return false;
  }



  // Detect collisions
  collision(method, position, halfSize, direction,userinterface, thumbRaiser) {
    TWEEN.update();
    const indices = this.cartesianToCell(position);
    if (method !== "obb-aabb") {
      if (
        this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north wall") || // Collision with north wall
        this.wallCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west wall") || // Collision with west wall
        this.wallCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south wall") || // Collision with south wall
        this.wallCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east wall") || // Collision with east wall

        this.elevatorCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north wall",userinterface, thumbRaiser) || // Collision with north wall
        this.elevatorCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west wall",userinterface, thumbRaiser) || // Collision with west wall
        this.elevatorCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south wall",userinterface, thumbRaiser) || // Collision with south wall
        this.elevatorCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east wall",userinterface, thumbRaiser) || // Collision with east wall


        this.passagewayCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, "north wall",userinterface, thumbRaiser) || // Collision with north wall
        this.passagewayCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, "west wall",userinterface, thumbRaiser) || // Collision with west wall
        this.passagewayCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, "south wall",userinterface, thumbRaiser) || // Collision with south wall
        this.passagewayCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, "east wall",userinterface, thumbRaiser) || // Collision with east wall

        this.cornerCollision(indices, [1, 0], 1, position, { x: -0.475, z: -0.5 }, halfSize, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
        this.cornerCollision(indices, [1, 1], 0, position, { x: -0.5, z: -0.525 }, halfSize, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
        this.cornerCollision(indices, [1, 1], 1, position, { x: -0.525, z: -0.5 }, halfSize, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
        this.cornerCollision(indices, [0, 1], 0, position, { x: -0.5, z: -0.475 }, halfSize, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

        indices[0] > 0 && (
          this.cornerCollision(indices, [-1, 1], 1, position, { x: -0.525, z: 0.5 }, halfSize, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
          this.cornerCollision(indices, [-1, 0], 1, position, { x: -0.475, z: 0.5 }, halfSize, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
        ) ||
        indices[1] > 0 && (
          this.cornerCollision(indices, [0, -1], 0, position, { x: 0.5, z: -0.475 }, halfSize, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
          this.cornerCollision(indices, [1, -1], 0, position, { x: 0.5, z: -0.525 }, halfSize, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
        )
      ) {
        return true;
      }
      // No collision
      return false;
    }
    else {
      // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
      const obb = new OBB(position, halfSize);
      obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
      if (
        this.wallAndCornerCollision(indices, [0, 0], 0, obb, "north wall") || // Collision with north wall
        this.wallAndCornerCollision(indices, [0, 0], 1, obb, "west wall") || // Collision with west wall
        this.wallAndCornerCollision(indices, [1, 0], 0, obb, "south wall") || // Collision with south wall
        this.wallAndCornerCollision(indices, [0, 1], 1, obb, "east wall") || // Collision with east wall

        this.wallAndCornerCollision(indices, [1, 0], 1, obb, "southwest corner (NS-oriented wall)") || // Collision with southwest corner (NS-oriented wall)
        this.wallAndCornerCollision(indices, [1, 1], 0, obb, "southeast corner (WE-oriented wall)") || // Collision with southeast corner (WE-oriented wall)
        this.wallAndCornerCollision(indices, [1, 1], 1, obb, "southeast corner (NS-oriented wall)") || // Collision with southeast corner (NS-oriented wall)
        this.wallAndCornerCollision(indices, [0, 1], 0, obb, "northeast corner (WE-oriented wall)") || // Collision with northeast corner (WE-oriented wall)

        indices[0] > 0 && (
          this.wallAndCornerCollision(indices, [-1, 1], 1, obb, "northeast corner (NS-oriented wall)") || // Collision with northeast corner (NS-oriented wall)
          this.wallAndCornerCollision(indices, [-1, 0], 1, obb, "northwest corner (NS-oriented wall)") // Collision with northwest corner (NS-oriented wall)
        ) ||
        indices[1] > 0 && (
          this.wallAndCornerCollision(indices, [0, -1], 0, obb, "northwest corner (WE-oriented wall)") || // Collision with northwest corner (WE-oriented wall)
          this.wallAndCornerCollision(indices, [1, -1], 0, obb, "southwest corner (WE-oriented wall)") // Collision with southwest corner (WE-oriented wall)
        )
      ) {
        return true;
      }
      // No collision
      return false;
    }
  }

  foundExit(position) {
    return Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x && Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
  };
}
