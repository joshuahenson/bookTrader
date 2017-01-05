import Fawn from 'fawn';
import mongoose from 'mongoose';

Fawn.init(mongoose);
const task = Fawn.Task();
export default task;
