
type TabsProps = {
  tabs: string[];
  activeTab: string;
  onChange: (tab: "videos" | "images") => void;
};

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex gap-4 border-b border-white/20 text-black">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 font-medium capitalize transition-colors duration-300 ${
            activeTab === tab
              ? "text-white border-b-2 border-white"
              : "text-white/60 hover:text-white"
          }`}
          onClick={() => onChange(tab as "videos" | "images")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
