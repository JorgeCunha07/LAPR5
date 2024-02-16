import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const ElevatorSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toHexString(),
      unique: true,
    },
    buildingFinderId: { type: String, required: true },
    floors: [{ type: String }],
    location: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Elevator', ElevatorSchema);
