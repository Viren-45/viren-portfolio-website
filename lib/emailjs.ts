'use client';

import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

export const initEmailJS = () => {
  useEffect(() => {
    // Initialize EmailJS with your public key
    const publicKey = process.env.EmailJS_PUBLIC_KEY as string;
    emailjs.init(publicKey);
  }, []);
};