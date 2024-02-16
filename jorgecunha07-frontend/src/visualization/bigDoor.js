import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import { merge } from "./merge.js";
import MultiTexturedMaterial from "./material.js";

/*
 * parameters = {
 *  size: Vector3,
 *  segments: Vector3,
 *  materialParameters: {
 *   color: Color,
 *   mapUrl: String,
 *   aoMapUrl: String,
 *   aoMapIntensity: Float,
 *   displacementMapUrl: String,
 *   displacementScale: Float,
 *   displacementBias: Float,
 *   normalMapUrl: String,
 *   normalMapType: Integer,
 *   normalScale: Vector2,
 *   bumpMapUrl: String,
 *   bumpScale: Float,
 *   roughnessMapUrl: String,
 *   roughness: Float,
 *   wrapS: Integer,
 *   wrapT: Integer,
 *   repeat: Vector2,
 *   magFilter: Integer,
 *   minFilter: Integer
 *  },
 *  secondaryColor: Color
 * }
 */

export default class BigDoor extends THREE.Group {
  /**
   * Constructs a BigDoor instance with specified parameters.
   *
   * @constructor
   * @param {Object} parameters - Configuration options for the door.
   * @param {number} parameters.groundHeight - The height from the ground where the door is positioned.
   * @param {Object} parameters.materialParameters - Parameters for the primary material used in the door.
   */
  constructor(parameters) {
    super();
    merge(this, parameters);

    const halfGroundHeight = this.groundHeight / 2.0;
    this.geometries = [];
    this.materials = [];

    // door measures
    const doorWidth = 1;
    const doorHeight = 0.8;
    const doorDepth = 0.05;

    // Create the materials
    const primaryMaterial = new MultiTexturedMaterial(this.materialParameters);
    const secondaryMaterial = new THREE.MeshStandardMaterial({ color: "#d7d7d7" });
    const doorFTexture = new THREE.TextureLoader().load("assets/textures/door/door_back.png");
    const doorBTexture = new THREE.TextureLoader().load("assets/textures/door/door_front.png");
    const doorTexture = new THREE.TextureLoader().load("assets/textures/door/door_back.png");
    const texture = new THREE.TextureLoader().load("assets/textures/ground_0029_2k_6zfZ8Q/ground_0029_ao_2k.jpg");

    /**
     * Array storing the geometries used in the door.
     * @type {Array<THREE.Geometry>}
     */
    let geometries = [];
    const originToPlaceTranslation = new THREE.Matrix4().makeTranslation(0.0, -halfGroundHeight, 0.025);
    const boxGeometry1 = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth, 20, 20);
    const boxGeometry = new THREE.BoxGeometry(doorWidth, doorHeight, doorDepth, 20, 20);
    boxGeometry1.translate((doorWidth/2) ,  0, -doorDepth / 3);
    boxGeometry1.applyMatrix4(originToPlaceTranslation);
    boxGeometry.translate((doorWidth/2) ,0, 0);
    boxGeometry.applyMatrix4(originToPlaceTranslation);
    geometries.push(boxGeometry1,boxGeometry);


    /**
     * Primary material for the door, created using materialParameters.
     * @type {MultiTexturedMaterial}
     */
    const meshBasicMaterial = new THREE.MeshBasicMaterial({ map: doorFTexture, color: 0xBCBCBC });
    const basicMaterial = new THREE.MeshBasicMaterial({ map: doorBTexture, color: 0xBCBCBC });
    const material = new THREE.MeshBasicMaterial({ map: doorTexture, color: 0xBCBCBC });
    const texturesDoor = new THREE.MeshBasicMaterial({ map: texture, color: 0xBCBCBC });


    this.geometries.push(geometries);
    this.materials.push(primaryMaterial, secondaryMaterial, meshBasicMaterial, texturesDoor, basicMaterial, material);

    const doorGeomtriesFront = [boxGeometry1];
    const doorGeomtriesBack = [boxGeometry];

    let geometries1 = new BufferGeometryUtils.mergeGeometries(doorGeomtriesFront, false);
    let geometries2 = new BufferGeometryUtils.mergeGeometries(doorGeomtriesBack, false);

    let fDoorMesh = new THREE.Mesh(geometries1, meshBasicMaterial);
    let bDoorMesh = new THREE.Mesh(geometries2, basicMaterial);

    this.geometries.push(fDoorMesh, bDoorMesh);
  }
}
