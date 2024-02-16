import { Router } from 'express';
import building from './routes/buildingRoute';
import robotType from './routes/robotTypeRoute';
import floor from './routes/floorRoute';
import robot from './routes/robotRoute';
import elevator from './routes/elevatorRoute';
import passageway from './routes/passagewayRoute';
import room from './routes/roomRoute';
import task from './routes/taskRoute';
import prologue from './routes/prologueRoute';

export default () => {
  const app = Router();


  building(app);
  robotType(app);
  floor(app);
  robot(app);
  elevator(app);
  passageway(app);
  room(app);
  task(app);
  prologue(app);


  return app;
};
