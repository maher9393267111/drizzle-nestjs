import type { SWRConfiguration } from 'swr';
import type { ICalendarEvent } from 'src/types/calendar';

import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'src/lib/axios';
import { _mock } from 'src/_mock';


// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const _events = Array.from({ length: 8 }).map((_, index) => ({
  id: _mock.id(index),
  color: ['#00A76F', '#FFAB00', '#00B8D9', '#7A0916'][index % 4],
  title: _mock.eventNames(index),
  allDay: index % 2 === 0,
  description: _mock.description(index),
  end: _mock.time(index + 2),
  start: _mock.time(index),
}));

// ----------------------------------------------------------------------

type EventsData = {
  events: ICalendarEvent[];
};

export function useGetEvents() {
  const { data, isLoading, error, isValidating } = useSWR<EventsData>('events', null, swrOptions);

  const memoizedValue = useMemo(() => {
    const events = data?.events.map((event) => ({ ...event, textColor: event.color })) ?? _events;

    return {
      events: events || [],
      eventsLoading: isLoading,
      eventsError: error,
      eventsValidating: isValidating,
      eventsEmpty: !isLoading && !isValidating && !events.length,
    };
  }, [data?.events, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function createEvent(eventData: ICalendarEvent) {
  /**
   * Work in local
   */
  mutate(
    'events',
    (currentData: EventsData | undefined) => {
      const currentEvents: ICalendarEvent[] = currentData?.events ?? _events;

      const events = [...currentEvents, eventData];

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function updateEvent(eventData: Partial<ICalendarEvent>) {
  /**
   * Work in local
   */
  mutate(
    'events',
    (currentData: EventsData | undefined) => {
      const currentEvents: ICalendarEvent[] = currentData?.events ?? _events;

      const events = currentEvents.map((event) =>
        event.id === eventData.id ? { ...event, ...eventData } : event
      );

      return { ...currentData, events };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function deleteEvent(eventId: string) {
  /**
   * Work in local
   */
  mutate(
    'events',
    (currentData: EventsData | undefined) => {
      const currentEvents: ICalendarEvent[] = currentData?.events ?? _events;

      const events = currentEvents.filter((event) => event.id !== eventId);

      return { ...currentData, events };
    },
    false
  );
}
