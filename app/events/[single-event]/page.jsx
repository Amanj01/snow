import React from 'react'
import { eventData } from '@/lib/singlePage-event-data'
import SingleItem from '@/components/SingleItemPattern'
const SingleEventPage = () => {
  return <SingleItem data={eventData} type="event" />;
}

export default SingleEventPage