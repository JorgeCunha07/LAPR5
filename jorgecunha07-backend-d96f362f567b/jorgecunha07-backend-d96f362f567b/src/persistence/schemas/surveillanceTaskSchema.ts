import mongoose from 'mongoose';
import { ISurveillanceTaskPersistence } from '../../dataschema/ISurveillancePersistence';

const SurveillanceTaskSchema = new mongoose.Schema(
  {
    domainId: { type: String, default: () => new mongoose.Types.ObjectId().toHexString(), unique: true },
    targetBuilding: { type: String, unique: false, required: true },
    targetFloor: { type: String, unique: false, required: true },
    contactInfo: { type: String, unique: false, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ISurveillanceTaskPersistence & mongoose.Document>(
  'SurveillanceTask',
  SurveillanceTaskSchema,
);
