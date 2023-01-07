import { ObjectId } from 'mongoose';
import { UserDocument } from 'src/db-schema/user-schema';

export interface RequestCustom extends Express.Request {
  user?: UserDocument;
}

export interface RequestId extends Express.Request {
  user?: { id: ObjectId };
}
