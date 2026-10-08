import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { WorkshopOverview } from "@/components/sections/workshop-overview";
import { WorkshopDetails } from "@/components/sections/workshop-details";
import { KeyTopics } from "@/components/sections/key-topics";
import { Audience } from "@/components/sections/audience";
import { Speakers } from "@/components/sections/speakers";
import { Registration } from "@/components/sections/registration";
import { ApplicationProcess } from "@/components/sections/application-process";
import { ImportantNotes } from "@/components/sections/important-notes";
import { Organizers } from "@/components/sections/organizers";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorkshopOverview />
       
        <KeyTopics />
        <Audience />
        <Speakers />
        <Registration />
      
        <ImportantNotes />
        <Organizers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
