import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface ContactInfoProps {
  contactName: string;
}

export default class ContactInfo extends ValueObject<ContactInfoProps> {
  get value(): string {
    return this.props.contactName;
  }

  private constructor(props: ContactInfoProps) {
    super(props);
  }

  public static create(contactName: string): Result<ContactInfo> {
    const contactNameGuardResult = Guard.againstNullOrUndefined(contactName, 'ContactName');

    if (!contactNameGuardResult.succeeded) {
      return Result.fail<ContactInfo>('Contact name should not be null or undefined.');
    }

    return Result.ok<ContactInfo>(new ContactInfo({ contactName: contactName }));
  }
}
