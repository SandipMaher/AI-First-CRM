import Header from "../components/Header";
import InteractionDetails from "../components/InteractionDetails";
import AIAssistant from "../components/AIAssistant";

const LogInteraction = () => {
  return (
    <div className="h-screen bg-[#F8FAFC] overflow-hidden">
      <div className="h-full px-6 py-6">
        <div className="mx-auto h-full w-full max-w-[1400px] flex flex-col">
          <Header />

          <div className="mt-4 flex gap-8 overflow-hidden">
            <div className="flex-1 min-w-0">
              {" "}
              <InteractionDetails />
            </div>

            <div className="w-[480px] shrink-0 h-full">
              {" "}
              <AIAssistant />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInteraction;
