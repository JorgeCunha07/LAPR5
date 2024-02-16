import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';
import mongoose from 'mongoose';
import { RoomType } from '../../domain/room/RoomType';

const RoomSchema = new mongoose.Schema(
  {
    domainId: { type: String, default: () => new mongoose.Types.ObjectId().toHexString(), unique: true },
    name: { type: String, unique: true, required: true },
    type: { type: String, unique: false, required: true, enum: Object.values(RoomType) },
    description: { type: String, unique: false, required: false },
    buildingFinderId: { type: String, required: true },
    floorNumber: { type: Number, required: true },  location: {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Room', RoomSchema);
