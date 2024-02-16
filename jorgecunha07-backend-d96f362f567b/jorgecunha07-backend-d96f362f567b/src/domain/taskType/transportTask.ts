import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import ITransportTaskDTO from '../../dto/ITransportTaskDTO';
import ContactInfo from './contactInfo';

export interface ITransportTaskProps {
  pickupRoom: string;
  deliveryRoom: string;
  contactStart: ContactInfo;
  contactEnd: ContactInfo;
  confirmationCode: string;
  transportTaskDescription: string;
}

export class TransportTask extends AggregateRoot<ITransportTaskProps> {
  constructor(props: ITransportTaskProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(dto: ITransportTaskDTO, id?: UniqueEntityID): Result<TransportTask> {
    const transportTaskProps: ITransportTaskProps = {
      pickupRoom: dto.pickupRoom,
      deliveryRoom: dto.deliveryRoom,
      contactStart: ContactInfo.create(dto.contactStart).getValue(),
      contactEnd: ContactInfo.create(dto.contactEnd).getValue(),
      confirmationCode: dto.confirmationCode,
      transportTaskDescription: dto.transportTaskDescription,
    };

    return Result.ok<TransportTask>(new TransportTask(transportTaskProps, id));
  }

  get pickupRoom(): string {
    return this.props.pickupRoom;
  }

  get deliveryRoom(): string {
    return this.props.deliveryRoom;
  }

  get contactStart(): ContactInfo {
    return this.props.contactStart;
  }

  get contactEnd(): ContactInfo {
    return this.props.contactEnd;
  }

  get confirmationCode(): string {
    return this.props.confirmationCode;
  }

  get transportTaskDescription(): string {
    return this.props.transportTaskDescription;
  }
}
