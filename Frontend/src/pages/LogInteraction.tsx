import Header from "../components/Header";
import InteractionDetails from "../components/InteractionDetails";
import AIAssistant from "../components/AIAssistant";

const LogInteraction = () => {
  return (
    <div className="h-screen bg-[#F8FAFC] overflow-hidden">
      <div className="h-full px-6 py-6">
        <div className="mx-auto h-full w-full max-w-[1400px] flex flex-col">
          <Header />

          <div className="mt-4 flex gap-4 overflow-y-scroll w-full justify-between">
            <div className="flex w-full p-4 pr-0">
              {" "}
              <InteractionDetails />
            </div>

            <div className="w-[480px] p-4 pl-0 shrink-0 h-full">
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
