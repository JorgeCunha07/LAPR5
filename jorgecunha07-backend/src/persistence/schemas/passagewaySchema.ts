import { IPassagewayPersistence } from '../../dataschema/IPassagewayPersistence';
import mongoose from 'mongoose';

const PassagewaySchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toHexString(),
      unique: true,
    },
    buildingACode: { type: String, required: true },
    buildingBCode: { type: String, required: true },
    floorA: { type: Number, required: true },
    floorB: { type: Number, required: true },
    locationX_A: { type: Number, required: true },
    locationY_A: { type: Number, required: true },
    locationX_B: { type: Number, required: true },
    locationY_B: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IPassagewayPersistence & mongoose.Document>('Passageway', PassagewaySchema);
