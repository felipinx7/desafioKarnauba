import { Events } from "../entities/event";

export interface IEventRepository {
    createEvent(data: Events): Promise<Events | null>;
    updateEvent(data: Events): Promise<Events | null>;
    deleteEvent(id: string): Promise<Events | null>;
    getEventById(id: string): Promise<Events | null>;
    getAllEvents(): Promise<Events[]>;
}