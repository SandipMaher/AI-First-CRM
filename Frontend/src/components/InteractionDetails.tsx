import { useState } from "react";
import { createInteraction } from "../api/interactionApi";
import { Search, Users, ChevronDown, Plus } from "lucide-react";
import type { InteractionForm } from "../redux/interactionSlice";
import { setAIResponse } from "../redux/assistantSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  updateField,
  resetForm,
  addMaterial,
  removeMaterial,
  addSample,
  removeSample,
} from "../redux/interactionSlice";

const inputClass =
  "h-11 w-full rounded-lg border border-gray-400 bg-white px-3 text-sm text-[#344054] placeholder:text-[#98A2B3] outline-none transition-all duration-200 focus:border-[#1570EF] focus:ring-4 focus:ring-[#D1E9FF]";
const labelClass = "mb-2 block text-sm font-medium text-[#344054] ";

const InteractionDetails = () => {
  const dispatch = useAppDispatch();

  const formData = useAppSelector((state) => state.interaction.formData);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    dispatch(
      updateField({
        field: name as keyof InteractionForm,
        value,
      }),
    );
  };

  // Validation state for form fields
  const [errors, setErrors] = useState({
    hcpName: "",
    date: "",
    time: "",
  });

  // Validation
  const validateForm = () => {
    const newErrors = {
      hcpName: "",
      date: "",
      time: "",
    };

    if (!formData.hcpName.trim()) {
      newErrors.hcpName = "Please select or enter an HCP name.";
    }

    if (!formData.date) {
      newErrors.date = "Please select the interaction date.";
    }

    if (!formData.time) {
      newErrors.time = "Please select the interaction time.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(Boolean);
  };

  // Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const aiSuggestions = [
  //   "Discuss the latest clinical evidence.",
  //   "Mention patient adherence benefits.",
  //   "Share recent product updates.",
  //   "Ask about current prescribing challenges.",
  // ];

  return (
    <div className="flex h-full w-full flex-col rounded-lg border border-[#E4E7EC] shadow-sm shadow-gray-900/50 bg-white">
      {/* Header */}

      <div className="px-6 lg:px-4 pt-4 pb-2">
        <h2 className="text-[22px] font-semibold">Interaction Details</h2>
      </div>

      <div className="border-t border-gray-400" />

      {/* Body */}

      <div
        className="
flex-1
min-h-0
overflow-y-auto
bg-gray-100
rounded-lg
px-4
py-5
sm:px-6
lg:px-8
xl:px-10
"
      >
        {/* <div className="mx-auto max-w-[680px]"> */}
        <form
          className="flex flex-col gap-6 lg:gap-8"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!validateForm()) return;

            try {
              setIsSubmitting(true);

              const savedInteraction = await createInteraction(formData);

              dispatch(
                setAIResponse({
                  summary: savedInteraction.summary,
                  sentiment: savedInteraction.sentiment,
                  followUp: savedInteraction.follow_up,
                }),
              );

              dispatch(resetForm());
              console.log("Interaction saved successfully");
            } catch (error) {
              console.error("Error saving interaction:", error);
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          {/* ========================= */}
          {/* HCP + Interaction Type */}
          {/* ========================= */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
            {/* HCP */}

            <div>
              <label className={labelClass}>HCP Name</label>

              <div className="flex h-11 items-center rounded-lg border border-gray-400 bg-white px-3 transition-all duration-200 focus-within:border-black focus-within:ring-2 focus-within:ring-[#D9E8FF]">
                <Search size={18} className="text-[#667085]" />

                <input
                  type="text"
                  name="hcpName"
                  value={formData.hcpName}
                  onChange={handleInputChange}
                  placeholder="Search or select HCP..."
                  className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#98A2B3]"
                />
              </div>
            </div>

            {/* Interaction Type */}

            <div>
              <label className={labelClass}>Interaction Type</label>

              <div className="relative">
                <select
                  name="interactionType"
                  value={formData.interactionType}
                  onChange={handleInputChange}
                  className={`${inputClass} appearance-none pr-10`}
                >
                  <option value="Meeting">Meeting</option>
                  <option value="Visit">Visit</option>
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Conference">Conference</option>
                </select>

                <ChevronDown
                  size={18}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]"
                />
              </div>
            </div>
          </div>

          {/* ========================= */}
          {/* Date + Time */}
          {/* ========================= */}

          <div className="grid grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8 gap-x-8 gap-y-7">
            <div>
              <label className={labelClass}>Date</label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className={inputClass}
              />{" "}
            </div>
          </div>

          {/* ========================= */}
          {/* Attendees */}
          {/* ========================= */}

          <div>
            <label className={labelClass}>Attendees</label>

            <div className="flex h-11 items-center rounded-lg border border-gray-400 bg-white px-3 transition-all duration-200 focus-within:border-black focus-within:ring-2 focus-within:ring-[#D9E8FF]">
              <Users size={18} className="text-[#667085]" />

              <input
                type="text"
                name="attendees"
                value={formData.attendees}
                onChange={handleInputChange}
                placeholder="Enter names or search..."
                className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          {/* ========================= */}
          {/* Topics Discussed */}
          {/* ========================= */}

          <div className="flex flex-col gap-2">
            <label className={labelClass}>Topics Discussed</label>

            <textarea
              name="topics"
              value={formData.topics}
              onChange={handleInputChange}
              placeholder="Enter key discussion points..."
              className="
    h-18
    w-full
    resize-y
    rounded-lg
    border
    border-gray-400
    bg-white
    px-4
    py-3
    text-sm
    text-[#344054]
    placeholder:text-[#98A2B3]
    outline-none
    transition
    duration-200
    focus:border-[#2563EB]
    focus:ring-2
    focus:ring-[#D9E8FF]
  "
            />

            <button
              type="button"
              className="
      w-fit
      text-sm
      font-medium
      text-[#2563EB]
      hover:underline
      transition
    "
            >
              🎙️ Summarize from Voice Note (Requires Consent)
            </button>
          </div>

          {/* ========================= */}
          {/* Materials & Samples */}
          {/* ========================= */}

          <div className="flex flex-col gap-8">
            <h3 className="text-lg font-semibold text-[#344054]">
              Materials Shared / Samples Distributed
            </h3>

            {/* Materials */}
            {/* <div className="border-b border-[#EAECF0] pb-5"> */}
            <div className="flex h-11 items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-4">
              <div className="flex flex-wrap gap-2">
                {formData.materials.length === 0 ? (
                  <span className="text-sm text-gray-500">
                    No materials added.
                  </span>
                ) : (
                  formData.materials.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1"
                    >
                      <span>{item}</span>

                      <button
                        type="button"
                        onClick={() => dispatch(removeMaterial(item))}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
              <button
                type="button"
                onClick={() => dispatch(addMaterial("Clinical Brochure"))}
                className="flex items-center gap-2 rounded-md border border-[#D0D5DD] bg-white w-full justify-center sm:w-auto text-sm font-medium text-[#344054] hover:bg-[#F9FAFB]"
              >
                <Search size={16} />
                Search / Add
              </button>
              {/* </div> */}
            </div>

            {/* Samples */}

            {/* <div className="border-b border-[#EAECF0] pb-5"> */}
            <div className="flex h-11 items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-4">
              <div className="flex flex-wrap gap-2">
                {formData.samples.length === 0 ? (
                  <span className="text-sm text-gray-500">
                    No samples added.
                  </span>
                ) : (
                  formData.samples.map((sample) => (
                    <div
                      key={sample}
                      className="flex items-center gap-2 rounded bg-gray-100 px-2 py-1"
                    >
                      <span>{sample}</span>

                      <button
                        type="button"
                        onClick={() => dispatch(removeSample(sample))}
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={() => dispatch(addSample("Sample Kit"))}
                className="flex items-center gap-2 rounded-md border border-[#D0D5DD] bg-white w-full
justify-center sm:w-auto text-sm font-medium text-[#344054] hover:bg-[#F9FAFB]"
              >
                <Plus size={16} />
                Add Sample
              </button>
            </div>
            {/* </div> */}
          </div>
          {/* ========================= */}
          {/* Observed / Inferred HCP Sentiment */}
          {/* ========================= */}

          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-[#344054]">
              Observed / Inferred HCP Sentiment
            </label>

            <div
              className="
flex
flex-col
gap-4

sm:flex-row
sm:flex-wrap
sm:gap-8
"
            >
              {" "}
              {/* Positive */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="sentiment"
                  value="positive"
                  checked={formData.sentiment === "positive"}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-[#8B5CF6]"
                />

                <span className="flex items-center gap-2 text-[15px] font-medium text-[#344054]">
                  😊 Positive
                </span>
              </label>
              {/* Neutral */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="sentiment"
                  value="neutral"
                  checked={formData.sentiment === "neutral"}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-[#8B5CF6]"
                />

                <span className="flex items-center gap-2 text-[15px] font-medium text-[#344054]">
                  😐 Neutral
                </span>
              </label>
              {/* Negative */}
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="radio"
                  name="sentiment"
                  value="negative"
                  checked={formData.sentiment === "negative"}
                  onChange={handleInputChange}
                  className="h-4 w-4 accent-[#8B5CF6]"
                />

                <span className="flex items-center gap-2 text-[15px] font-medium text-[#344054]">
                  ☹️ Negative
                </span>
              </label>
            </div>
          </div>

          {/* ========================= */}
          {/* Outcomes */}
          {/* ========================= */}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#344054]">
              Outcomes
            </label>

            <textarea
              name="outcomes"
              value={formData.outcomes}
              onChange={handleInputChange}
              placeholder=" Key outcomes or agreements..."
              className="
      h-18
      w-full
      resize-y
      rounded-lg
      border
      border-gray-400
      bg-white
      px-4
      py-3
      text-sm
      text-[#344054]
      placeholder:text-[#98A2B3]
      outline-none
      transition
      focus:border-[#2563EB]
      focus:ring-2
      focus:ring-[#D9E8FF]
    "
            />
          </div>

          {/* ========================= */}
          {/* Follow-up Actions */}
          {/* ========================= */}

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#344054]">
              Follow-up Actions
            </label>

            <textarea
              name="followUpActions"
              value={formData.followUpActions}
              onChange={handleInputChange}
              placeholder=" Enter next steps or tasks..."
              className="
      h-18
      w-full
      resize-y
      rounded-lg
      border
      border-gray-400
      bg-white
      px-4
      py-3
      text-sm
      text-[#344054]
      placeholder:text-[#98A2B3]
      outline-none
      transition
      focus:border-[#2563EB]
      focus:ring-2
      focus:ring-[#D9E8FF]
    "
            />

            {/* AI Suggestions */}

            <div className="mt-2 flex flex-col gap-2">
              <p className="text-sm font-semibold text-[#344054]">
                AI Suggested Follow-ups:
              </p>

              <button
                type="button"
                className="w-fit text-left text-sm text-[#2563EB] hover:underline"
              >
                + Schedule follow-up meeting in 2 weeks
              </button>

              <button
                type="button"
                className="w-fit text-left text-sm text-[#2563EB] hover:underline"
              >
                + Send OncoBoost Phase III PDF
              </button>

              <button
                type="button"
                className="w-fit text-left text-sm text-[#2563EB] hover:underline"
              >
                + Add Dr. Sharma to advisory board invite list
              </button>
            </div>
          </div>

          {/* Divider

          <div className="h-px bg-[#EAECF0]" /> */}

          {/* ========================= */}
          {/* Footer */}
          {/* ========================= */}

          <div className="flex items-center justify-center lg:justify-end gap-4 border-t border-[#EAECF0] pt-6 mt-2">
            {/* Cancel
  <button
    type="button"
    className="
      inline-flex
      h-11
      items-center
      justify-center
      rounded-lg
      border
      border-[#D0D5DD]
      bg-white
      px-6
      text-sm
      font-medium
      text-[#344054]
      shadow-sm
      transition-all
      duration-200
      hover:bg-[#F9FAFB]
      hover:border-[#98A2B3]
      focus:outline-none
      focus:ring-2
      focus:ring-[#D9E8FF]
    "
  >
    Cancel
  </button> */}

            {/* Save */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
    inline-flex
    h-11
    items-center
    justify-center
    rounded-lg
    bg-[#2563EB]
    px-8
    text-sm
    font-semibold
    text-white
    shadow-sm
    transition-all
    duration-200
    hover:bg-[#1D4ED8]
    active:scale-[0.98]
    focus:outline-none
    focus:ring-2
    focus:ring-[#B2CCFF]
    disabled:cursor-not-allowed
    disabled:opacity-60
  "
            >
              {isSubmitting ? "Saving..." : "Save Interaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
};

export default InteractionDetails;
