import mongoose from 'mongoose';
import { IRobotTypePersistence } from '../../dataschema/IRobotTypePersistence';

const RobotTypeSchema = new mongoose.Schema(
  {
    domainId: { type: String, default: () => new mongoose.Types.ObjectId().toHexString(), unique: true },
    robotTypeName: { type: String, unique: true, required: true },
    robotBrand: { type: String, required: true },
    robotModel: { type: String, unique: true, required: true },
    description: { type: String },
    supportedTaskTypes: { type: Array },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRobotTypePersistence & mongoose.Document>('RobotType', RobotTypeSchema);
