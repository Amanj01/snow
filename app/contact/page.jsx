import ContactForm from '@/components/Contact-us'
import { Suspense } from 'react';

export const metadata = {
  title: 'Snow  || Contact',
  description: 'Contact snow medical.',
  keywords: 'contact, snow medical, snow medical community',
};

  const Loading = () => (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-pulse text-2xl font-mansory uppercase text-black">
        Loading Contact Form...
      </div>
    </div>
  );

 const ContactPage = () => {
  return(
    <Suspense fallback={<Loading />}>
      <ContactForm />
    </Suspense>
  )
}

export default ContactPage