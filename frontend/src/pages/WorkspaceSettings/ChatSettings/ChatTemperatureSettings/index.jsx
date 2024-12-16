import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function recommendedSettings(provider = null) {
  switch (provider) {
    case "mistral":
      return { temp: 0 };
    default:
      return { temp: 0 }; // Set default to 0
  }
}

export default function ChatTemperatureSettings({
  settings,
  workspace,
  setHasChanges,
}) {
  const { t } = useTranslation();
  const defaults = recommendedSettings(settings?.LLMProvider);

  const [temperature, setTemperature] = useState(workspace?.openAiTemp ?? defaults.temp);

  useEffect(() => {
    setTemperature(workspace?.openAiTemp ?? defaults.temp);
  }, [workspace?.openAiTemp, defaults.temp]);

  const handleTemperatureChange = (e) => {
    const newTemp = parseFloat(e.target.value);
    setTemperature(newTemp);
    setHasChanges(true);
  };

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="name" className="block input-label">
          {t("chat.temperature.title")}
        </label>
        <p className="text-black text-opacity-60 text-xs font-medium py-1.5">
          {t("chat.temperature.desc-start")}
          <br />
          {t("chat.temperature.desc-end")}
          <br />
          <br />
          <i>{t("chat.temperature.hint")}</i>
        </p>
      </div>
      <input
        name="openAiTemp"
        type="number"
        min={0.0}
        step={0.1}
        onWheel={(e) => e.target.blur()}
        value={temperature}
        className="bg-black bg-opacity-70 text-white placeholder:text-white/20 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="0.7"
        required={true}
        autoComplete="off"
        onChange={handleTemperatureChange}
      />
    </div>
  );
}
