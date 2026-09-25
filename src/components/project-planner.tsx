"use client";

import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  LockKeyhole,
  Sparkles,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import {
  budgetOptions,
  projectOptions,
  scopeOptions,
  timelineOptions,
  type ProjectType,
  type QualificationAnswers,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const projectValues = [
  "landscape design",
  "patios hardscaping",
  "outdoor living",
  "garden care",
] as const;

const formSchema = z.object({
  projectType: z
    .union([z.enum(projectValues), z.literal("")])
    .refine((value) => value !== "", {
      message: "Choose the kind of project you have in mind.",
    }),
  propertyScope: z.string().min(1, "Choose the scope that feels closest."),
  budget: z.string().min(1, "Choose an approximate investment range."),
  timeline: z.string().min(1, "Choose your ideal timing."),
  name: z.string().trim().min(2, "Enter your name."),
  email: z.email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a phone number where we can reach you."),
  postcode: z.string().trim().min(4, "Enter your ZIP or postal code."),
  notes: z.string().max(500, "Keep notes under 500 characters."),
});

const stepFields: Record<number, (keyof QualificationAnswers)[]> = {
  1: ["projectType"],
  2: ["propertyScope"],
  3: ["budget", "timeline"],
  4: ["name", "email", "phone", "postcode", "notes"],
};

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-2 text-sm font-medium text-red-700" role="alert">
      {message}
    </p>
  );
}

function ChoiceCard({
  checked,
  title,
  description,
  onClick,
}: {
  checked: boolean;
  title: string;
  description?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onClick}
      className={cn(
        "group relative flex min-h-20 w-full items-start gap-4 rounded-2xl border p-4 text-left outline-none transition-all focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 sm:p-5",
        checked
          ? "border-forest bg-sage-100 shadow-[0_12px_30px_rgba(22,50,38,0.08)]"
          : "border-forest/12 bg-white hover:border-forest/35 hover:bg-cream",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
          checked ? "border-forest bg-forest text-white" : "border-forest/25 bg-white",
        )}
      >
        {checked ? <Check className="size-3.5" strokeWidth={2.5} /> : null}
      </span>
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        {description ? (
          <span className="mt-1 block text-sm leading-6 text-ink/58">{description}</span>
        ) : null}
      </span>
    </button>
  );
}

export default function ProjectPlanner() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<QualificationAnswers>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      projectType: "",
      propertyScope: "",
      budget: "",
      timeline: "",
      name: "",
      email: "",
      phone: "",
      postcode: "",
      notes: "",
    },
  });

  const values = useWatch({ control });

  const focusStep = () => {
    window.setTimeout(() => headingRef.current?.focus(), 80);
  };

  const chooseProject = (value: ProjectType, jumpToForm = false) => {
    setValue("projectType", value, { shouldDirty: true, shouldValidate: true });
    setStep(1);
    if (jumpToForm) {
      document.getElementById("plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
      focusStep();
    }
  };

  const nextStep = async () => {
    const valid = await trigger(stepFields[step], { shouldFocus: true });
    if (!valid) return;
    setStep((current) => Math.min(4, current + 1));
    focusStep();
  };

  const previousStep = () => {
    setStep((current) => Math.max(1, current - 1));
    focusStep();
  };

  return (
    <>
      <section id="services" className="section-pad bg-cream">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end lg:gap-16">
            <div>
              <p className="eyebrow">How can we help?</p>
              <h2 className="section-title mt-5 max-w-xl text-forest">
                Start with what you want to change.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-7 text-ink/62 sm:text-lg sm:leading-8">
              You don&apos;t need a finished plan. Choose the idea closest to yours and
              we&apos;ll help shape the rest during a complimentary first conversation.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {projectOptions.map((option, index) => {
              const Icon = option.icon;
              const selected = values.projectType === option.value;
              return (
                <motion.button
                  key={option.value}
                  type="button"
                  onClick={() => chooseProject(option.value, true)}
                  initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: reduceMotion ? 0 : index * 0.06 }}
                  className={cn(
                    "group flex min-h-72 flex-col rounded-[1.75rem] border p-6 text-left outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-4 sm:min-h-80",
                    selected
                      ? "border-forest bg-forest text-white shadow-[0_24px_60px_rgba(22,50,38,0.18)]"
                      : "border-forest/12 bg-white text-ink hover:-translate-y-1 hover:border-forest/25 hover:shadow-[0_20px_50px_rgba(22,50,38,0.1)]",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-12 place-items-center rounded-full",
                      selected ? "bg-white/12 text-brass" : "bg-sage-100 text-forest",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <span className="mt-auto">
                    <span className="mb-5 block text-xs font-semibold uppercase tracking-[0.2em] opacity-45">
                      0{index + 1}
                    </span>
                    <span className="font-display block text-3xl font-semibold leading-none">
                      {option.title}
                    </span>
                    <span
                      className={cn(
                        "mt-4 block text-sm leading-6",
                        selected ? "text-white/65" : "text-ink/58",
                      )}
                    >
                      {option.description}
                    </span>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                      Tell us more <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      <section id="plan" className="scroll-mt-4 bg-sage-100 py-20 sm:py-28 lg:py-36">
        <div className="site-container">
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_90px_rgba(22,50,38,0.12)] lg:grid-cols-[0.78fr_1.22fr] lg:rounded-[2.5rem]">
            <div className="relative overflow-hidden bg-forest p-7 text-white sm:p-10 lg:p-12">
              <div className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10" />
              <div className="absolute -right-10 -top-10 size-40 rounded-full border border-white/10" />
              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-sage-100">
                  <Sparkles className="size-3.5 text-brass" /> Complimentary project review
                </span>
                <h2 className="mt-7 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
                  Let&apos;s imagine what&apos;s possible.
                </h2>
                <p className="mt-6 max-w-md leading-7 text-white/64">
                  Tell us a little about your space. We&apos;ll review the details and follow up
                  with thoughtful next steps—no pressure, no generic sales pitch.
                </p>

                <div className="mt-10 space-y-4 border-t border-white/12 pt-8 text-sm text-white/72 lg:mt-16">
                  <p className="flex items-center gap-3">
                    <Clock3 className="size-4 text-brass" /> Takes about two minutes
                  </p>
                  <p className="flex items-center gap-3">
                    <LockKeyhole className="size-4 text-brass" /> Your details stay private
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-[38rem] p-6 sm:p-10 lg:p-12">
              {submitted ? (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex h-full min-h-[30rem] flex-col items-start justify-center"
                  role="status"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-sage-100 text-forest">
                    <CheckCircle2 className="size-8" strokeWidth={1.6} />
                  </span>
                  <p className="eyebrow mt-8">
                    Thank you, {values.name?.split(" ")[0] ?? "there"}
                  </p>
                  <h3 className="mt-4 max-w-xl font-display text-4xl font-semibold leading-tight text-forest sm:text-5xl">
                    Your garden&apos;s next chapter starts here.
                  </h3>
                  <p className="mt-5 max-w-lg leading-7 text-ink/62">
                    This mockup doesn&apos;t send data, but the experience is complete. In a live
                    build, the Liberty team would review your details and be in touch within two
                    business days.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(() => setSubmitted(true))} noValidate>
                  <div className="flex items-center justify-between gap-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-forest/55">
                      Step {step} of 4
                    </p>
                    <div className="flex gap-1.5" aria-label={`Step ${step} of 4`}>
                      {[1, 2, 3, 4].map((item) => (
                        <span
                          key={item}
                          className={cn(
                            "h-1.5 rounded-full transition-all",
                            item <= step ? "w-8 bg-brass" : "w-5 bg-forest/10",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={step}
                      initial={reduceMotion ? false : { opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -18 }}
                      transition={{ duration: 0.22 }}
                      className="mt-8"
                    >
                      {step === 1 ? (
                        <fieldset>
                          <legend className="sr-only">Choose your project type</legend>
                          <h3 ref={headingRef} tabIndex={-1} className="form-title">
                            What are you dreaming of?
                          </h3>
                          <p className="form-help">Choose the option that feels closest.</p>
                          <div className="mt-7 grid gap-3 sm:grid-cols-2" role="radiogroup">
                            {projectOptions.map((option) => (
                              <ChoiceCard
                                key={option.value}
                                checked={values.projectType === option.value}
                                title={option.title}
                                description={option.description}
                                onClick={() => chooseProject(option.value)}
                              />
                            ))}
                          </div>
                          <ErrorMessage message={errors.projectType?.message} />
                        </fieldset>
                      ) : null}

                      {step === 2 ? (
                        <fieldset>
                          <legend className="sr-only">Choose the scope of your project</legend>
                          <h3 ref={headingRef} tabIndex={-1} className="form-title">
                            How much of the property are we considering?
                          </h3>
                          <p className="form-help">An estimate is perfect at this stage.</p>
                          <div className="mt-7 grid gap-3" role="radiogroup">
                            {scopeOptions.map((option) => (
                              <ChoiceCard
                                key={option}
                                checked={values.propertyScope === option}
                                title={option}
                                onClick={() =>
                                  setValue("propertyScope", option, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                  })
                                }
                              />
                            ))}
                          </div>
                          <ErrorMessage message={errors.propertyScope?.message} />
                        </fieldset>
                      ) : null}

                      {step === 3 ? (
                        <div>
                          <h3 ref={headingRef} tabIndex={-1} className="form-title">
                            Help us recommend the right next step.
                          </h3>
                          <p className="form-help">These ranges keep the first conversation useful.</p>
                          <fieldset className="mt-7">
                            <legend className="mb-3 font-semibold text-ink">Approximate investment</legend>
                            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
                              {budgetOptions.map((option) => (
                                <ChoiceCard
                                  key={option}
                                  checked={values.budget === option}
                                  title={option}
                                  onClick={() =>
                                    setValue("budget", option, {
                                      shouldDirty: true,
                                      shouldValidate: true,
                                    })
                                  }
                                />
                              ))}
                            </div>
                            <ErrorMessage message={errors.budget?.message} />
                          </fieldset>
                          <fieldset className="mt-7">
                            <legend className="mb-3 font-semibold text-ink">Ideal timing</legend>
                            <div className="grid gap-3 sm:grid-cols-2" role="radiogroup">
                              {timelineOptions.map((option) => (
                                <ChoiceCard
                                  key={option}
                                  checked={values.timeline === option}
                                  title={option}
                                  onClick={() =>
                                    setValue("timeline", option, {
                                      shouldDirty: true,
                                      shouldValidate: true,
                                    })
                                  }
                                />
                              ))}
                            </div>
                            <ErrorMessage message={errors.timeline?.message} />
                          </fieldset>
                        </div>
                      ) : null}

                      {step === 4 ? (
                        <div>
                          <h3 ref={headingRef} tabIndex={-1} className="form-title">
                            Where should we send your project review?
                          </h3>
                          <p className="form-help">A few final details, then you&apos;re all set.</p>
                          <div className="mt-7 grid gap-5 sm:grid-cols-2">
                            <label className="field-label sm:col-span-2">
                              Name
                              <input className="field-input" autoComplete="name" {...register("name")} />
                              <ErrorMessage message={errors.name?.message} />
                            </label>
                            <label className="field-label">
                              Email
                              <input
                                className="field-input"
                                type="email"
                                autoComplete="email"
                                {...register("email")}
                              />
                              <ErrorMessage message={errors.email?.message} />
                            </label>
                            <label className="field-label">
                              Phone
                              <input
                                className="field-input"
                                type="tel"
                                autoComplete="tel"
                                {...register("phone")}
                              />
                              <ErrorMessage message={errors.phone?.message} />
                            </label>
                            <label className="field-label sm:col-span-2">
                              ZIP or postal code
                              <input
                                className="field-input"
                                autoComplete="postal-code"
                                {...register("postcode")}
                              />
                              <ErrorMessage message={errors.postcode?.message} />
                            </label>
                            <label className="field-label sm:col-span-2">
                              Anything else we should know? <span className="text-ink/40">(optional)</span>
                              <textarea className="field-input min-h-28 resize-y" {...register("notes")} />
                              <ErrorMessage message={errors.notes?.message} />
                            </label>
                          </div>
                        </div>
                      ) : null}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-9 flex items-center justify-between border-t border-forest/10 pt-6">
                    {step > 1 ? (
                      <button type="button" onClick={previousStep} className="button-secondary px-4 sm:px-6">
                        <ArrowLeft className="size-4" /> Back
                      </button>
                    ) : (
                      <span />
                    )}
                    {step < 4 ? (
                      <button type="button" onClick={nextStep} className="button-primary px-5 sm:px-7">
                        Continue <ArrowRight className="size-4" />
                      </button>
                    ) : (
                      <button type="submit" className="button-primary px-5 sm:px-7">
                        Send my project <ArrowRight className="size-4" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
