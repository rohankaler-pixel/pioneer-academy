import type { Metadata } from 'next';
import ReviewGeneratorClient from './ReviewGeneratorClient';

export const metadata: Metadata = {
  title: 'Student & Parent Feedback | Pioneer Academy Bikaner',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function FeedbackPage() {
  return <ReviewGeneratorClient />;
}