import { NavBar } from './components/layout/nav-bar'
import { AboutSistem } from './sections/about-sitem'
import { SectionBenefits } from './sections/benefits'
import { Footer } from './sections/footer'
import { SectionFormContact } from './sections/form-contact'
import { SectionFunctionality } from './sections/functionality'
import { SectionHero } from './sections/hero'

export const HomePage = () => {
  return (
    <section className="bg-primargreen relative z-10 min-h-[100vh] w-full">
      <NavBar />
      <SectionHero />
      <AboutSistem />
      <SectionFunctionality />
      <SectionBenefits />
      <SectionFormContact />
      <Footer />
    </section>
  )
}
