"use client"

import React, { useEffect, useState } from 'react';
import { Bell, Fish, MapPin, Phone, Clock, ChevronRight, Star, DollarSign, ChevronLeft, Menu, X } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/utils/supabase/client';
import NavBar from '@/components/home/navbar';
import HeroCarousel from '@/components/home/hero-carousel';
import Sellers from '@/components/home/sellers';
import Services from '@/components/home/services';
import { Cta } from '@/components/home/cta';
import Footer from '@/components/home/footer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AboutUs from '@/components/home/about-us';

export default function Home() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>

    <div className="min-h-screen w-full bg-gray-50">
      {/* Hero Section */}
      <NavBar/>
      {/* Hero Section with Carousel */}
      <HeroCarousel/>
      {/* Rest of the content remains the same */}
      {/* Announcement Banner */}
      {/* <Alert className="border-blue-200 bg-blue-50 mt-4 mx-4">
        <Bell className="h-4 w-4" />
        <AlertDescription>
        New sustainable fishing guidelines are now in effect. Click here to learn more.
        </AlertDescription>
        </Alert> */}
      {/* Sellers Section */}
      {/* Announcement Banner */}
      {/* <Alert className="border-blue-200 bg-blue-50 mt-4 mx-4">
        <Bell className="h-4 w-4" />
        <AlertDescription>
        New sustainable fishing guidelines are now in effect. Click here to learn more.
        </AlertDescription>
        </Alert> */}
      {/* Sellers Section */}
      <AboutUs />
      
      <Sellers/>

      {/* Services Section */}
      <Services/>
      {/* CTA Section */}
      {/* <Cta/> */}
      {/* Footer */}
      <Footer/>
    </div>
    </QueryClientProvider>
  );
};

// export default LandingPageTemplate;