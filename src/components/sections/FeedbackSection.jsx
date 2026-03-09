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
      <Card className="feedback-panel p-6 sm:p-8">
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
          <div className="feedback-marquee-intro-copy">
            <span className="feedback-marquee-chip">
              Live Reviews
              <span className="feedback-marquee-live-dot" aria-hidden="true" />
            </span>
            <div>
              <h3 className="feedback-marquee-title">Recent reactions from portfolio reviewers</h3>
              <p className="feedback-marquee-copy">
                Social proof first. Short, current feedback stays visible before the form.
              </p>
            </div>
          </div>
          <div className="feedback-marquee-stats" aria-label="Live review summary">
            <div className="feedback-marquee-stat">
              <span className="feedback-marquee-stat-value">{averageRating.toFixed(1)}</span>
              <span className="feedback-marquee-stat-label">Avg rating</span>
            </div>
            <div className="feedback-marquee-stat">
              <span className="feedback-marquee-stat-value">{entries.length}</span>
              <span className="feedback-marquee-stat-label">Responses</span>
            </div>
          </div>
        </div>
        <div className="feedback-marquee-viewport">
          <div className="feedback-marquee-track-horizontal">
            {marqueeEntries.map((entry, index) => (
              <Card
                key={`${entry.id}-${index}`}
                className="feedback-entry-card feedback-entry-marquee-card p-6"
              >
                <div className="feedback-entry-header flex items-start justify-between gap-4">
                  <div className="feedback-entry-meta min-w-0">
                    <p className="feedback-entry-name text-lg font-semibold text-[var(--color-text)]">
                      {entry.name}
                    </p>
                    <p className="feedback-entry-date mt-1 text-xs uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
                      {formatDate(entry.createdAt)}
                    </p>
                  </div>
                  <div className="feedback-entry-rating-shell">
                    <FeedbackStars rating={entry.rating} />
                  </div>
                </div>
                <p className="feedback-entry-copy mt-4 text-sm leading-7 text-[var(--color-text-soft)]">
                  {entry.comment}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>

      <Card className="feedback-panel p-6 sm:p-8">
        <form className="feedback-form space-y-5" onSubmit={handleSubmit}>
          <div className="feedback-form-header">
            <div>
              <span className="feedback-form-cta-pill">Your Turn</span>
              <h3 className="feedback-form-title mt-4">{feedbackSectionContent.formTitle}</h3>
              <p className="feedback-form-description mt-3">
                {feedbackSectionContent.formDescription}
              </p>
              <div className="feedback-form-live-row mt-5">
                <div className="feedback-form-live-pill">
                  <span className="feedback-form-live-dot" aria-hidden="true" />
                  Feedback opens instantly
                </div>
                <div className="feedback-form-rating-mini">
                  <FeedbackStars rating={Math.round(averageRating)} />
                  <span>{averageRating.toFixed(1)} average</span>
                </div>
              </div>
            </div>
            <div className="feedback-form-tip">
              <span className="feedback-form-tip-label">Best results</span>
              <p className="feedback-form-tip-copy">Keep feedback short, specific, and useful.</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="feedback-field-panel">
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

            <div className="feedback-rating-panel">
              <span className="feedback-label">Rating</span>
              <div className="feedback-star-row mt-3 flex flex-wrap items-center gap-2">
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
              <p className="feedback-rating-hint mt-3">Tap a star to rate the experience.</p>
            </div>
          </div>

          <div className="feedback-field-panel">
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

          <div className="feedback-form-actions">
            <p className="feedback-form-actions-copy">
              Your response is stored in this browser instantly.
            </p>
            <button type="submit" className="primary-button">
              {feedbackSectionContent.submitLabel}
            </button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default FeedbackSection;
