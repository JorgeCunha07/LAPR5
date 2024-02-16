import mongoose from 'mongoose';
import { IRobotPersistence } from '../../dataschema/IRobotPersistence';

const RobotSchema = new mongoose.Schema(
  {
    domainId: { type: String, default: () => new mongoose.Types.ObjectId().toHexString(), unique: true },
    robotCode: { type: String, unique: true, required: true },
    robotDescription: { type: String, required: false },
    robotNickname: { type: String, unique: true, required: false },
    robotSerialNumber: { type: String, required: true },
    robotTypeName: { type: String, required: true },
    enabled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);
