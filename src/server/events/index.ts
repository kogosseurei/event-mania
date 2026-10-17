import { EventService } from './eventService';
import { MockEventRepository } from './mockEventRepository';
export const eventService = new EventService(new MockEventRepository());
export * from './eventRepository';
export * from './mockEventRepository';
export * from './eventService';
