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

const initialFormErrors = {
  name: "",
  comment: "",
  rating: "",
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
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [submitMessage, setSubmitMessage] = useState("");
  const marqueeEntries = useMemo(() => [...entries, ...entries, ...entries], [entries]);
  const commentLength = formState.comment.trim().length;

  const validateForm = () => {
    const nextErrors = {
      name: "",
      comment: "",
      rating: "",
    };

    const trimmedName = formState.name.trim();
    const trimmedComment = formState.comment.trim();

    if (trimmedName.length === 0) {
      nextErrors.name = "Name is required.";
    } else if (trimmedName.length > 48) {
      nextErrors.name = "Name must be 48 characters or fewer.";
    }

    if (trimmedComment.length < 12) {
      nextErrors.comment = "Comment must be at least 12 characters.";
    } else if (trimmedComment.length > 320) {
      nextErrors.comment = "Comment must be 320 characters or fewer.";
    }

    if (formState.rating < 1 || formState.rating > 5) {
      nextErrors.rating = "Select a rating between 1 and 5.";
    }

    setFormErrors(nextErrors);
    return !nextErrors.name && !nextErrors.comment && !nextErrors.rating;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitMessage("");

    if (!validateForm()) {
      return;
    }

    const result = addEntry(formState);

    setSubmitMessage(
      result.persisted
        ? "Feedback posted successfully."
        : "Feedback posted, but your browser blocked local saving."
    );
    setFormErrors(initialFormErrors);
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
                className={`feedback-input ${formErrors.name ? "is-invalid" : ""}`}
                type="text"
                value={formState.name}
                maxLength={48}
                onChange={(event) => {
                  setFormState((current) => ({ ...current, name: event.target.value }));
                  if (formErrors.name) {
                    setFormErrors((current) => ({ ...current, name: "" }));
                  }
                }}
                placeholder={feedbackSectionContent.placeholderName}
                aria-invalid={Boolean(formErrors.name)}
                aria-describedby={formErrors.name ? "feedback-name-error" : undefined}
              />
              {formErrors.name ? (
                <p id="feedback-name-error" className="feedback-field-error">
                  {formErrors.name}
                </p>
              ) : (
                <p className="feedback-field-helper">Required. Use your real name or professional title.</p>
              )}
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
                      onClick={() => {
                        setFormState((current) => ({ ...current, rating: ratingValue }));
                        if (formErrors.rating) {
                          setFormErrors((current) => ({ ...current, rating: "" }));
                        }
                      }}
                      aria-label={`Rate ${ratingValue} stars`}
                      aria-pressed={ratingValue === formState.rating}
                    >
                      <FaStar />
                    </button>
                  );
                })}
              </div>
              <p className="feedback-rating-hint mt-3">Tap a star to rate the experience.</p>
              {formErrors.rating ? (
                <p className="feedback-field-error">{formErrors.rating}</p>
              ) : null}
            </div>
          </div>

          <div className="feedback-field-panel">
            <label className="feedback-label" htmlFor="feedback-comment">
              Comment
            </label>
            <textarea
              id="feedback-comment"
              className={`feedback-input min-h-32 resize-none ${formErrors.comment ? "is-invalid" : ""}`}
              value={formState.comment}
              maxLength={320}
              onChange={(event) => {
                setFormState((current) => ({ ...current, comment: event.target.value }));
                if (formErrors.comment) {
                  setFormErrors((current) => ({ ...current, comment: "" }));
                }
              }}
              placeholder={feedbackSectionContent.placeholderComment}
              aria-invalid={Boolean(formErrors.comment)}
              aria-describedby="feedback-comment-meta"
            />
            <div id="feedback-comment-meta" className="feedback-field-meta">
              <span className={formErrors.comment ? "feedback-field-error" : "feedback-field-helper"}>
                {formErrors.comment || "Keep it short and specific."}
              </span>
              <span className="feedback-field-counter">{commentLength}/320</span>
            </div>
          </div>

          <div className="feedback-form-actions">
            <p
              className={`feedback-form-actions-copy ${submitMessage ? "is-success" : ""}`}
              role="status"
            >
              {submitMessage || "Your response is stored in this browser instantly."}
            </p>
            <button
              type="submit"
              className="primary-button"
            >
              {feedbackSectionContent.submitLabel}
            </button>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default FeedbackSection;
