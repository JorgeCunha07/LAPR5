import mongoose from 'mongoose';
import { ITransportTaskPersistence } from '../../dataschema/ITransportTaskPersistence';

const TransportTaskSchema = new mongoose.Schema(
  {
    domainId: { type: String, default: () => new mongoose.Types.ObjectId().toHexString(), unique: true },
    pickupRoom: { type: String, unique: false, required: true },
    deliveryRoom: { type: String, unique: false, required: true },
    contactStart: { type: String, unique: false, required: true },
    contactEnd: { type: String, unique: false, required: true },
    confirmationCode: { type: String, unique: false, required: true },
    transportTaskDescription: { type: String, unique: false, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ITransportTaskPersistence & mongoose.Document>('TransportTask', TransportTaskSchema);
