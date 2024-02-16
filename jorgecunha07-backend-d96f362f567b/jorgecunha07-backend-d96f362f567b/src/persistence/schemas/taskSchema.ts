import mongoose from 'mongoose';
import { ITaskPersistence } from '../../dataschema/ITaskPersistence';

const TaskSchema = new mongoose.Schema(
  {
    domainId: { type: String, default: () => new mongoose.Types.ObjectId().toHexString(), unique: true },
    taskState: { type: String, unique: false, required: true },
    description: { type: String, unique: false, required: true },
    typeTaskId: { type: String, required: true },
    taskTypeEnum: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ITaskPersistence & mongoose.Document>('Task', TaskSchema);
