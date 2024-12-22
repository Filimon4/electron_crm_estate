import { eventNames } from 'process';
import { Event } from '../entities/Event';
import { User } from '../entities/User';
import { getPostgresErrorMessage } from '../../utils/pqErrors';
import { sendNotify } from '../../utils/app';

export namespace EventNamespace {

  export const createEvent = async (title: string, start: Date, end: Date, allDay: boolean, user_id: number) => {
    try {
      const event = await dbConnection(Event).create();
      event.title = title;
      event.start = start;
      event.end = end;
      event.allDay = allDay;
      event.user_id = user_id;

      await dbConnection(Event).insert(event);
      return event;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
      return null
    }
  };

  export const getAllEvents = async (user_id: number) => {
    try {
      const events =  await dbConnection(Event).find({
        where: {
          user_id: user_id
        }
      });
      return events;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
      return null
    }
  };

  export const getEventById = async (id: number) => {
    try {
      const event = await dbConnection(Event).findOne({
        where: { id }
      });

      if (!event) {
        throw new Error('Event not found');
      }

      return event;
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
      return null
    }
  };

  export const updateEvent = async (id: number, title: string, start: Date, end: Date, allDay: boolean, user_id: number) => {
    try {
      const event = await dbConnection(Event).findOne({
        where: {
          id: id,
          user_id: user_id
        },
      });

      if (!event) {
        throw new Error('Event not found');
      }

      event.title = title;
      event.start = start;
      event.end = end;
      event.allDay = allDay;

      const result = await dbConnection(Event).save(event);
      return result;
    } catch (error) {
      console.log(error)
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      return null
    }
  };

  export const deleteEvent = async (id: number, user_id: number) => {
    try {
      console.log(id, user_id)
      const event = await dbConnection(Event).findOne({
        where: {
          id: id,
          user_id: user_id
        }
      });

      await dbConnection(Event).remove(event);
      return { message: 'Event deleted successfully' };
    } catch (error) {
      const errorMessage = getPostgresErrorMessage(error.driverError.code)
      sendNotify('error', errorMessage)
      console.log(errorMessage)
      return null
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
      return null
    }
  };
}
