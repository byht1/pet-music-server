import { UserDocument } from 'src/db-schema/user-schema';

export interface RequestCustom extends Express.Request {
  user?: UserDocument;
}
