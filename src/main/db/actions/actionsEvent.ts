import { eventNames } from 'process';
import { Event } from '../entities/Event';
import { User } from '../entities/User';
import { getPostgresErrorMessage } from '../../utils/pqErrors';
import { sendNotify } from '../../utils/app';

export namespace EventNamespace {

  export const createEvent = async (title: string, start: Date, end: Date, allDay: boolean, userId: number) => {
    try {
      const user = await dbConnection(User).findOneBy({ id: userId });
      if (!user) {
        throw new Error('User not found');
      }

      const event = await dbConnection(Event).create();
      event.title = title;
      event.start = start;
      event.end = end;
      event.allDay = allDay;
      event.user = user;

      await dbConnection(Event).insert(event);
      return event;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getAllEvents = async () => {
    try {
      const events =  await dbConnection(Event).find({ relations: ['user'] });
      return events;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const getEventById = async (id: number) => {
    try {
      const event = await dbConnection(Event).findOne({
        where: { id },
        relations: ['user'],
      });

      if (!event) {
        throw new Error('Event not found');
      }

      return event;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const updateEvent = async (id: number, title: string, start: Date, end: Date, allDay: boolean) => {
    try {
      const event = await dbConnection(Event).findOne({
        where: { id },
        relations: ['user'],
      });

      if (!event) {
        throw new Error('Event not found');
      }

      event.title = title;
      event.start = start;
      event.end = end;
      event.allDay = allDay;

      await dbConnection(Event).save(event);
      return event;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };

  export const deleteEvent = async (id: number) => {
    try {
      const event = await dbConnection(Event).findOne({ where: { id } });
      if (!event) {
        throw new Error('Event not found');
      }

      await dbConnection(Event).remove(event);
      return { message: 'Event deleted successfully' };
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  }

  export const getEventsForMonth = async (userId: number, month: number = new Date().getMonth(), year: number = new Date().getFullYear()) => {
    try {
      const startOfMonth = new Date(year, month, 1);
      const endOfMonth = new Date(year, month + 1, 0);
  
      const events = await dbConnection(Event)
        .createQueryBuilder('event')
        .innerJoinAndSelect('user', 'user', 'user.id = event.user_id')
        .where('user.id = :userId', {userId: userId})
        .andWhere('event.start >= :startOfMonth', {startOfMonth: startOfMonth})
        .andWhere('event.end <= :endOfMonth', {endOfMonth: endOfMonth})
        .getMany()
  
      return events;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
    }
  };
}
