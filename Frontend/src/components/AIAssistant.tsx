import { Bot, CheckSquare } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { assistantChat } from "../api/interactionApi";
import { fillFormFromAI } from "../redux/interactionSlice";

import {
  setCurrentInput,
  addUserMessage,
  addAssistantMessage,
  setLoading,
} from "../redux/assistantSlice";

export default function AIAssistant() {
  const dispatch = useAppDispatch();

  const {
    messages,
    currentInput,
    isLoading,
    suggestions,
    summary,
    sentiment,
    followUp,
  } = useAppSelector((state) => state.assistant);

  // const handleLog = () => {
  //   if (!currentInput.trim()) return;

  //   dispatch(addUserMessage(currentInput));

  //   dispatch(setLoading(true));

  //   // setTimeout(() => {
  //   //   dispatch(
  //   //     addAssistantMessage(
  //   //       "Interaction logged successfully! The details have been extracted automatically.",
  //   //     ),
  //   //   );

  //   //   dispatch(setLoading(false));
  //   // }, 1000);
  // };

  const handleLog = async () => {
    if (!currentInput.trim()) return;

    dispatch(addUserMessage(currentInput));
    dispatch(setLoading(true));

    try {
      // Call backend AI parser
      const parsedData = await assistantChat(currentInput);

      // Fill interaction form automatically
      dispatch(fillFormFromAI(parsedData));

      // Show assistant confirmation
      dispatch(
        addAssistantMessage(
          `Interaction details extracted successfully for ${
            parsedData.hcp_name || "the interaction"
          }. Please review the form and click Save Interaction.`,
        ),
      );
    } catch (error) {
      console.error(error);

      dispatch(
        addAssistantMessage(
          "Sorry, I couldn't understand that interaction. Please try again.",
        ),
      );
    } finally {
      dispatch(setLoading(false));
      dispatch(setCurrentInput(""));
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-[#EAECF0] bg-white shadow-sm shadow-gray-900/50">
      {/* ================= Header ================= */}
      <div className="border-b border-[#F2F4F7] bg-white px-5 py-5 lg:px-6">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg bg-[#EFF8FF]">
            <Bot size={22} className="text-[#1570EF]" strokeWidth={2.2} />
          </div>

          <div className="min-w-0">
            <h2 className="text-xl font-bold text-[#1570EF] sm:text-2xl">
              AI Assistant
            </h2>

            <p className="mt-1 text-sm text-[#667085] sm:text-[15px]">
              Log interaction details here via chat
            </p>
          </div>
        </div>
      </div>

      {/* ================= Chat Area ================= */}
      <div className="flex-1 overflow-y-auto bg-[#FCFCFD] px-4 py-5 sm:px-5 lg:px-6">
        <div className="space-y-5">
          {/* Instruction */}
          <div className="rounded-2xl bg-[#E0F2FE] p-5 shadow-sm">
            <p className="text-[15px] leading-7 text-[#344054] sm:text-base">
              Log interaction details here (e.g.,{" "}
              <span className="font-medium">
                "Met Dr. Smith, discussed Prodo-X efficacy, positive sentiment,
                shared brochure"
              </span>{" "}
              ) or ask for help.
            </p>
          </div>

          {summary && (
            <div className="rounded-2xl border border-[#D0D5DD] bg-[#F9FAFB] p-5 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-[#1570EF]">
                AI Interaction Analysis
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[#344054]">
                    Summary
                  </p>
                  <p className="mt-1 text-sm text-[#667085]">{summary}</p>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#344054]">
                    Sentiment
                  </p>
                  <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {sentiment}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#344054]">
                    Suggested Follow-up
                  </p>
                  <p className="mt-1 text-sm text-[#667085]">{followUp}</p>
                </div>
              </div>
            </div>
          )}

          {/* User Bubble */}
          {/* <div className="mr-auto max-w-[98%] rounded-2xl border-l-4 border-[#1570EF] bg-[#F2F4F7] p-5 shadow-sm">
            <p className="text-[15px] leading-7 text-[#344054] sm:text-base">
              Today I met with Dr. Smith and discussed product X efficiency.
              <br />
              The sentiment was positive, and I shared the brochures.
            </p>
          </div> */}

          {/* AI Bubble */}
          {/* <div className="mr-auto max-w-[98%] rounded-2xl border border-[#C7F7D0] bg-[#ECFDF3] p-5 shadow-sm">
            <div className="flex items-start gap-3">
              <CheckSquare size={20} className="mt-1 shrink-0 text-[#22C55E]" />

              <p className="text-[15px] leading-7 text-[#344054] sm:text-base">
                <span className="font-semibold">
                  Interaction logged successfully!
                </span>{" "}
                The details (HCP Name, Date, Sentiment and Materials) have been
                automatically populated based on your summary. Would you like me
                to suggest a follow-up action, such as scheduling a meeting?
              </p>
            </div>
          </div> */}

          {messages.map((message) =>
            message.role === "user" ? (
              <div
                key={message.id}
                className="mr-auto max-w-[98%] rounded-2xl border-l-4 border-[#1570EF] bg-[#F2F4F7] p-5 shadow-sm"
              >
                <p className="text-[15px] leading-7 text-[#344054] sm:text-base">
                  {message.content}
                </p>
              </div>
            ) : (
              <div
                key={message.id}
                className="mr-auto max-w-[98%] rounded-2xl border border-[#C7F7D0] bg-[#ECFDF3] p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <CheckSquare
                    size={20}
                    className="mt-1 shrink-0 text-[#22C55E]"
                  />

                  <p className="text-[15px] leading-7 text-[#344054] sm:text-base">
                    {message.content}
                  </p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {isLoading && (
        <div className="px-5 pb-4">
          <p className="text-sm text-[#1570EF]">
            AI is analyzing interaction...
          </p>
        </div>
      )}

      {/* ================= Footer ================= */}
      <div className="border-t border-[#EAECF0] bg-white p-4 sm:p-5">
        <div className="flex items-end gap-3">
          <textarea
            rows={2}
            value={currentInput}
            onChange={(e) => dispatch(setCurrentInput(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleLog();
              }
            }}
            placeholder="Describe Interaction..."
            className="
              min-h-[64px]
              flex-1
              resize-none
              rounded-xl
              border
              border-[#D0D5DD]
              bg-white
              px-4
              py-3
              text-[15px]
              text-[#344054]
              outline-none
              transition-all
              placeholder:text-[#98A2B3]
              focus:border-[#1570EF]
              focus:ring-4
              focus:ring-[#D1E9FF]
            "
          />

          <button
            type="button"
            onClick={handleLog}
            disabled={isLoading || !currentInput.trim()}
            className="
              flex
              h-16
              w-28
              shrink-0
              flex-col
              items-center
              justify-center
              rounded-2xl
              bg-[#1570EF]
              text-base
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-200
              hover:bg-[#175CD3]
              hover:shadow-md
              active:scale-[0.98]
              focus:outline-none
              focus:ring-4
              focus:ring-[#D1E9FF]
              disabled:opacity-50
disabled:cursor-not-allowed
            "
          >
            <span>A</span>
            <span>Log</span>
          </button>
        </div>
      </div>
    </div>
  );
}
