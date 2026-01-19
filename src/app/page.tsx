import { supabase } from '@/utils/supabase';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import CasesCarousel from '@/components/CasesCarousel';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const revalidate = 0;

export default async function Home() {
  const { data: settings } = await supabase.from('site_settings').select('*').single();
  const { data: services } = await supabase.from('services').select('*').order('id');
  const { data: cases } = await supabase.from('cases').select('*').order('id');

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero settings={settings} />
      <About settings={settings} />
      <Services services={services || []} />
      <CasesCarousel cases={cases || []} />
      <Contact settings={settings} />
      <Footer />
    </main>
  );
}
