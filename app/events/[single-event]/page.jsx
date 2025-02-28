import React from 'react'
import { eventData } from '@/lib/singlePage-event-data'
import SingleItem from '@/components/SingleItemPattern'
import Head from 'next/head';
const SingleEventPage = () => {
  return(
    <>
      <Head>
      <title>Snow Events || Snow Medical</title>
      <meta name="description" content="Read our latest events on snow medical." />
      </Head>
     <SingleItem data={eventData} type="event" />;  
    </>
  ) 
}

export default SingleEventPage