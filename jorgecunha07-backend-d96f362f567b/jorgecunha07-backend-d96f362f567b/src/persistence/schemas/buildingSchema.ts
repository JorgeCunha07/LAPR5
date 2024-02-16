import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';

const BuildingSchema = new mongoose.Schema(
  {
    domainId: { type: String, default: () => new mongoose.Types.ObjectId().toHexString(), unique: true },
    buildingCode: { type: String, unique: true, required: true },
    buildingName: { type: String, unique: true, required: true },
    buildingDescription: { type: String, unique: false, required: false },
    buildingSize: {
      width: { type: Number, required: true },
      length: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
