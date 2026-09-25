import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Leaf,
  Quote,
  Star,
} from "lucide-react";

import ProjectPlanner from "@/components/project-planner";
import SiteHeader, { Brand } from "@/components/site-header";
import StarBorder from "@/components/star-border";
import WaterEntryLoader from "@/components/water-entry-loader";
import {
  benefits,
  footerLinks,
  portfolio,
  processSteps,
  testimonials,
  trustPoints,
} from "@/lib/content";

export default function Home() {
  return (
    <main id="top" className="overflow-hidden">
      <WaterEntryLoader />
      <section className="relative min-h-[46rem] bg-forest text-white sm:min-h-[50rem] lg:min-h-[52rem]">
        <Image
          src="/images/liberty-hero.png"
          alt="Elegant landscaped backyard with natural stone terraces, water, and layered planting"
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,31,23,0.88)_0%,rgba(11,31,23,0.68)_42%,rgba(11,31,23,0.18)_78%),linear-gradient(0deg,rgba(11,31,23,0.5)_0%,transparent_45%)]" />
        <SiteHeader />

        <div className="site-container relative flex min-h-[46rem] items-end pb-14 pt-32 sm:min-h-[50rem] sm:pb-20 lg:min-h-[52rem] lg:pb-24 lg:pt-40">
          <div className="max-w-4xl">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-sage-100 sm:mb-8">
              <span className="h-px w-8 bg-brass" /> Thoughtful landscapes, beautifully built
            </div>
            <h1 className="max-w-[15ch] font-display text-[clamp(3.7rem,10vw,7.8rem)] font-semibold leading-[0.82] tracking-[-0.055em] text-cream">
              Make more of life outside.
            </h1>
            <div className="mt-8 flex max-w-3xl flex-col gap-7 border-t border-white/20 pt-7 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-10 sm:pt-8">
              <p className="max-w-xl text-base leading-7 text-white/72 sm:text-lg sm:leading-8">
                Distinctive gardens and outdoor spaces, designed around the way you live and
                crafted to feel at home for years to come.
              </p>
              <StarBorder
                as="a"
                href="#services"
                className="shrink-0 rounded-full focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 focus-visible:ring-offset-forest"
                color="#f6e3ad"
                speed="4.5s"
                thickness={1}
                backgroundColor="#d7b56d"
                textColor="#0d241b"
                borderColor="rgba(255,255,255,0.2)"
              >
                Explore your project <ArrowDownRight className="size-4" />
              </StarBorder>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 hidden items-center gap-4 bg-cream px-7 py-5 text-forest lg:flex">
          <div className="flex -space-x-2" aria-hidden="true">
            {["CM", "ST", "JR"].map((initials) => (
              <span
                key={initials}
                className="grid size-9 place-items-center rounded-full border-2 border-cream bg-sage-200 text-[0.6rem] font-bold"
              >
                {initials}
              </span>
            ))}
          </div>
          <div>
            <div className="flex gap-0.5 text-brass-dark" aria-label="Rated 4.9 out of 5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-1 text-xs font-semibold">Loved by local homeowners</p>
          </div>
        </div>
      </section>

      <section aria-label="Our credentials" className="border-b border-forest/10 bg-white">
        <div className="site-container grid grid-cols-2 divide-x divide-y divide-forest/10 sm:grid-cols-4 sm:divide-y-0">
          {trustPoints.map((item) => (
            <div key={item.label} className="px-4 py-7 text-center sm:px-6 sm:py-9">
              <p className="font-sans text-3xl font-semibold tracking-tight text-forest tabular-nums sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.17em] text-ink/48">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <ProjectPlanner />

      <section id="work" className="section-pad bg-white">
        <div className="site-container">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Selected transformations</p>
              <h2 className="section-title mt-5 max-w-2xl text-forest">
                Spaces with a sense of belonging.
              </h2>
            </div>
            <p className="max-w-md text-base leading-7 text-ink/58 sm:text-right">
              Every project is rooted in its setting, its architecture, and the people who call
              it home.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-12 lg:mt-16">
            {portfolio.map((project, index) => (
              <article key={project.title} className={project.className}>
                <div
                  className={`group relative overflow-hidden rounded-[1.5rem] bg-sage-100 ${index === 2 ? "aspect-[16/7]" : "aspect-[4/5] sm:aspect-[5/4]"}`}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes={index === 2 ? "(min-width: 768px) 100vw, 100vw" : "(min-width: 768px) 58vw, 100vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 text-white sm:p-8">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
                        {project.category}
                      </p>
                      <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                    <span className="hidden size-12 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm sm:grid">
                      <ArrowDownRight className="size-5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="section-pad bg-forest text-white">
        <div className="site-container grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-24">
          <div>
            <p className="eyebrow text-sage-200 before:bg-brass">Why Liberty</p>
            <h2 className="section-title mt-5 max-w-xl text-cream">
              Considered in every season.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              The best outdoor spaces feel effortless. Behind that feeling is careful planning,
              skilled hands, and a team that sees the whole picture.
            </p>
          </div>
          <div className="divide-y divide-white/12 border-y border-white/12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={benefit.title} className="grid gap-5 py-7 sm:grid-cols-[4rem_1fr] sm:py-9">
                  <div className="flex items-start justify-between sm:block">
                    <span className="grid size-11 place-items-center rounded-full bg-white/8 text-brass">
                      <Icon className="size-5" strokeWidth={1.5} />
                    </span>
                    <span className="text-xs font-semibold tracking-[0.18em] text-white/30 sm:hidden">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="sm:grid sm:grid-cols-[1fr_1.2fr] sm:gap-8">
                    <h3 className="font-display text-2xl font-semibold text-cream sm:text-3xl">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 leading-7 text-white/58 sm:mt-0">{benefit.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="process" className="section-pad bg-stone-100">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow">A clear path forward</p>
              <h2 className="section-title mt-5 max-w-lg text-forest">
                From first thought to first evening outside.
              </h2>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[1.75rem] border border-forest/10 bg-forest/10 sm:grid-cols-2">
              {processSteps.map((item) => (
                <article key={item.number} className="min-h-64 bg-cream p-7 sm:p-8">
                  <p className="text-xs font-semibold tracking-[0.2em] text-brass-dark">{item.number}</p>
                  <h3 className="mt-12 font-display text-3xl font-semibold text-forest">{item.title}</h3>
                  <p className="mt-4 leading-7 text-ink/58">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad bg-cream">
        <div className="site-container">
          <div className="text-center">
            <p className="eyebrow justify-center before:hidden">In their own words</p>
            <h2 className="section-title mx-auto mt-5 max-w-2xl text-forest">The feeling lasts.</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <figure key={testimonial.name} className="rounded-[1.75rem] border border-forest/10 bg-white p-7 sm:p-10">
                <Quote className="size-9 fill-sage-100 text-sage-300" strokeWidth={1.2} />
                <blockquote className="mt-8 font-display text-[1.7rem] font-medium leading-[1.22] text-forest sm:text-3xl">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-forest/10 pt-6">
                  <span className="grid size-10 place-items-center rounded-full bg-sage-100 text-forest">
                    <Leaf className="size-4" />
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{testimonial.name}</span>
                    <span className="mt-0.5 block text-xs text-ink/48">{testimonial.detail}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brass py-16 sm:py-20">
        <div className="site-container flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest/58">Ready when you are</p>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight text-forest sm:text-5xl">
              Let&apos;s grow something remarkable.
            </h2>
          </div>
          <a href="#plan" className="button-dark shrink-0">
            Start your project <ArrowRight className="size-4" />
          </a>
        </div>
      </section>

      <footer className="bg-forest pb-28 pt-14 text-white sm:pb-14 sm:pt-16">
        <div className="site-container">
          <div className="grid gap-10 border-b border-white/12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
            <div>
              <Brand inverse />
              <p className="mt-6 max-w-sm leading-7 text-white/55">
                Design-led landscaping for beautiful, enduring outdoor spaces across the western
                suburbs of Philadelphia.
              </p>
            </div>
            <div>
              <p className="footer-heading">Explore</p>
              <nav className="mt-5 flex flex-col gap-3" aria-label="Footer navigation">
                {footerLinks.map((item, index) => {
                  const href = ["#services", "#work", "#process", "#plan"][index];
                  return (
                    <a key={item} href={href} className="w-fit text-sm text-white/62 transition-colors hover:text-white">
                      {item}
                    </a>
                  );
                })}
              </nav>
            </div>
            <div>
              <p className="footer-heading">Service area</p>
              <p className="mt-5 text-sm leading-7 text-white/62">
                Main Line<br />Chester County<br />Delaware County
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Liberty Landscapes. Mockup concept.</p>
            <p className="flex items-center gap-2"><Check className="size-3.5" /> Thoughtfully designed, locally rooted.</p>
          </div>
        </div>
      </footer>

      <a
        href="#plan"
        className="fixed inset-x-4 bottom-4 z-40 flex min-h-14 items-center justify-center gap-3 rounded-full bg-brass px-6 font-semibold text-forest shadow-[0_12px_40px_rgba(13,38,28,0.28)] sm:hidden"
      >
        Start your project <ArrowRight className="size-4" />
      </a>
    </main>
  );
}
