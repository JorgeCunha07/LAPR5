import mongoose from 'mongoose';

// Scale Schema
const ScaleSchema = new mongoose.Schema({
  x: Number,
  y: Number,
}, { _id: false });

// Individual Texture Schemas
const ColorTextureSchema = new mongoose.Schema({
  url: String,
}, { _id: false });

const AoTextureSchema = new mongoose.Schema({
  url: String,
  intensity: Number,
}, { _id: false });

const DisplacementTextureSchema = new mongoose.Schema({
  url: String,
  scale: Number,
  bias: Number,
}, { _id: false });

const NormalTextureSchema = new mongoose.Schema({
  url: String,
  type: Number,
  scale: ScaleSchema,  // Using ScaleSchema
}, { _id: false });

const BumpTextureSchema = new mongoose.Schema({
  url: String,
  scale: Number,
}, { _id: false });

const RoughnessTextureSchema = new mongoose.Schema({
  url: String,
  rough: Number,
}, { _id: false });

// Maps Schema
const MapsSchema = new mongoose.Schema({
  color: ColorTextureSchema,
  ao: AoTextureSchema,
  displacement: DisplacementTextureSchema,
  normal: NormalTextureSchema,
  bump: BumpTextureSchema,
  roughness: RoughnessTextureSchema,
}, { _id: false });

// Segments and Size Schemas
const SegmentsSchema = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number,
}, { _id: false });
// Segments and Size Schemas
const SegmentsSchema2 = new mongoose.Schema({
  width: Number,
  height: Number,
  depth: Number,
}, { _id: false });

const SizeSchema = new mongoose.Schema({
  width: Number,
  depth: Number,
}, { _id: false });

// Structure Schema
const StructureSchemaGround = new mongoose.Schema({
  size: SizeSchema,
  segments: SegmentsSchema,
  primaryColor: String,
  maps: MapsSchema,
  wrapS: Number,
  wrapT: Number,
  repeat: {
    u: Number,
    v: Number,
  },
  magFilter: Number,
  minFilter: Number,
  secondaryColor: String,
}, { _id: false });

const StructureSchema = new mongoose.Schema({
  segments: SegmentsSchema2,
  primaryColor: String,
  maps: MapsSchema,
  wrapS: Number,
  wrapT: Number,
  repeat: {
    u: Number,
    v: Number,
  },
  magFilter: Number,
  minFilter: Number,
  secondaryColor: String,
}, { _id: false });

const ElevatorFloorsSchema = new mongoose.Schema({
  floors: [String],
  positionWhenLeavingElevator: [Number]
}, { _id: false });

// New Schema for Passageway
const PassagewaySchema = new mongoose.Schema({
  floor: [String],
  location: [Number],
  locationOnExit: [Number]
}, { _id: false });

// Floor Map Schema
const FloorMapSchema = new mongoose.Schema({
  maze: {
    size: SizeSchema,
    map: [[Number]],
    exitLocation: [Number],
  },
  ground: StructureSchemaGround,
  wall: StructureSchema,
  passageway: StructureSchema,
  elevator: StructureSchema,
  door: StructureSchema,
  player: {
    initialPosition: [Number],
    initialDirection: Number,
  },
  elevatorFloors: ElevatorFloorsSchema,
  passageways: [PassagewaySchema],

}, { _id: false });

// Floor Schema
const FloorSchema = new mongoose.Schema({
  domainId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString(),
    unique: true,
  },
  buildingFinderId: { type: String, required: true },
  floorNumber: { type: Number, required: true },
  floorDescription: { type: String, required: false },
  floorMap:{ type: FloorMapSchema, required: false } ,
  floorMaxDimensions: {
    width: { type: Number, required: true },
    length: { type: Number, required: true },
  },
}, {
  timestamps: true,
});

export default mongoose.model('Floor', FloorSchema);
