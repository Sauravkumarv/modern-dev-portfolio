import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import useFeedback from "../../hooks/useFeedback";
import { feedbackSectionContent } from "../../data/feedback";
import { createSoftScaleIn, createStaggerContainer } from "../../utils/animation";

const initialFormState = {
  name: "",
  comment: "",
  rating: 5,
};

const formatDate = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));

const FeedbackStars = ({ rating }) => (
  <div className="flex items-center gap-1 text-amber-400">
    {Array.from({ length: 5 }, (_, starIndex) => (
      <FaStar key={starIndex} className={starIndex < rating ? "" : "opacity-25"} />
    ))}
  </div>
);

const FeedbackSection = () => {
  const { entries, addEntry, averageRating } = useFeedback();
  const [formState, setFormState] = useState(initialFormState);
  const marqueeEntries = useMemo(() => [...entries, ...entries, ...entries], [entries]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.comment.trim()) {
      return;
    }

    addEntry(formState);
    setFormState(initialFormState);
  };

  return (
    <section id="feedback" className="content-section grid gap-6">
      <Card className="feedback-panel p-8">
        <SectionHeader
          eyebrow={feedbackSectionContent.eyebrow}
          heading={feedbackSectionContent.heading}
          description={feedbackSectionContent.description}
        />
      </Card>

      <motion.div
        className="feedback-marquee-shell"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={createSoftScaleIn(false)}
      >
        <div className="feedback-marquee-intro">
          <span className="feedback-marquee-chip">Live Reviews</span>
          <p className="feedback-marquee-copy">
            Recent reactions from people reviewing the portfolio
          </p>
        </div>
        <div className="feedback-marquee-track-horizontal">
          {marqueeEntries.map((entry, index) => (
            <Card
              key={`${entry.id}-${index}`}
              className="feedback-entry-card feedback-entry-marquee-card p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="feedback-entry-name text-lg font-semibold text-[var(--color-text)]">
                    {entry.name}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                    {formatDate(entry.createdAt)}
                  </p>
                </div>
                <FeedbackStars rating={entry.rating} />
              </div>
              <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
                {entry.comment}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <Card className="feedback-panel p-8">
          <motion.div
            className="grid gap-4 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={createStaggerContainer(false)}
          >
            <motion.div
              className="feedback-summary-card"
              variants={createSoftScaleIn(false)}
            >
              <div className="feedback-summary-label">{feedbackSectionContent.stats.averageLabel}</div>
              <div className="mt-3">
                <FeedbackStars rating={Math.round(averageRating)} />
              </div>
              <div className="feedback-summary-value mt-3">
                {averageRating.toFixed(1)}
              </div>
              <div className="feedback-summary-subtext">Based on recent visitor ratings</div>
            </motion.div>

            <motion.div
              className="feedback-summary-card feedback-summary-card-accent"
              variants={createSoftScaleIn(false, 0.04)}
            >
              <div className="feedback-summary-label">{feedbackSectionContent.stats.totalLabel}</div>
              <div className="feedback-summary-value feedback-summary-value-accent mt-3">
                {entries.length}
              </div>
              <div className="feedback-summary-subtext">Stored locally in this browser</div>
            </motion.div>
          </motion.div>

          <form className="feedback-form mt-8 space-y-4" onSubmit={handleSubmit}>
            <div className="feedback-form-cta">
              <span className="feedback-form-cta-pill">Your Turn</span>
              <p className="feedback-form-cta-copy">
                Leave a quick rating and one short comment. Honest feedback makes the portfolio better.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-[0.95fr,1.05fr]">
              <div>
                <label className="feedback-label" htmlFor="feedback-name">
                  Name
                </label>
                <input
                  id="feedback-name"
                  className="feedback-input"
                  type="text"
                  value={formState.name}
                  onChange={(event) =>
                    setFormState((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder={feedbackSectionContent.placeholderName}
                />
              </div>

              <div>
                <span className="feedback-label">Rating</span>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {Array.from({ length: 5 }, (_, index) => {
                    const ratingValue = index + 1;

                    return (
                      <button
                        key={ratingValue}
                        type="button"
                        className={`feedback-star ${ratingValue <= formState.rating ? "is-active" : ""}`}
                        onClick={() =>
                          setFormState((current) => ({ ...current, rating: ratingValue }))
                        }
                        aria-label={`Rate ${ratingValue} stars`}
                      >
                        <FaStar />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <label className="feedback-label" htmlFor="feedback-comment">
                Comment
              </label>
              <textarea
                id="feedback-comment"
                className="feedback-input min-h-32 resize-none"
                value={formState.comment}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, comment: event.target.value }))
                }
                placeholder={feedbackSectionContent.placeholderComment}
              />
            </div>

            <button type="submit" className="primary-button">
              {feedbackSectionContent.submitLabel}
            </button>
          </form>
        </Card>

        <Card className="feedback-side-panel p-8">
          <span className="section-eyebrow">Live Signal</span>
          <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-[var(--color-text)]">
            Keep the comments short, specific, and useful.
          </h3>
          <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
            This layout brings the testimonials to the top so social proof shows first, then
            the form gives visitors an obvious place to respond.
          </p>

          <div className="mt-8 space-y-4">
            <div className="feedback-note-card">
              <span className="feedback-note-kicker">Best Practice</span>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                Surface proof before asking for input. It increases trust and makes the section
                feel intentional.
              </p>
            </div>
            <div className="feedback-note-card">
              <span className="feedback-note-kicker">Performance</span>
              <p className="mt-2 text-sm leading-7 text-[var(--color-text-soft)]">
                The marquee uses CSS transform animation only, so it stays cheaper than a JS-driven
                carousel.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FeedbackSection;
