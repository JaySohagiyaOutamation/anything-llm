import useGetProviderModels, {
  DISABLED_PROVIDERS,
} from "@/hooks/useGetProvidersModels";
import paths from "@/utils/paths";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

// These models do NOT support function calling
function supportedModel(provider, model = "") {
  if (provider !== "openai") return true;
  return (
    ["gpt-3.5-turbo-0301", "gpt-4-turbo-2024-04-09", "gpt-4-turbo"].includes(
      model
    ) === false
  );
}

export default function AgentModelSelection({
  provider,
  workspace,
  setHasChanges,
}) {
  const { slug } = useParams();
  const { defaultModels, customModels, loading } =
    useGetProviderModels(provider);

  const { t } = useTranslation();
  if (DISABLED_PROVIDERS.includes(provider)) {
    return (
      <div className="w-full h-10 justify-center items-center flex">
        <p className="text-sm font-base text-black text-opacity-60 text-center">
          Multi-model support is not supported for this provider yet.
          <br />
          Agent's will use{" "}
          <Link
            to={paths.workspace.settings.chatSettings(slug)}
            className="underline"
          >
            the model set for the workspace
          </Link>{" "}
          or{" "}
          <Link to={paths.settings.llmPreference()} className="underline">
            the model set for the system.
          </Link>
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div>
        <div className="flex flex-col">
          <label htmlFor="name" className="block input-label">
            {t("agent.mode.chat.title")}
          </label>
          <p className="text-black text-opacity-60 text-xs font-medium py-1.5">
            {t("agent.mode.chat.description")}
          </p>
        </div>
        <select
          name="agentModel"
          required={true}
          disabled={true}
          className="bg-white text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        >
          <option disabled={true} selected={true}>
            {t("agent.mode.wait")}
          </option>
        </select>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="name" className="block input-label">
          {t("agent.mode.title")}
        </label>
        <p className="text-black text-opacity-60 text-xs font-medium py-1.5">
          {t("agent.mode.description")}
        </p>
      </div>

      <select
        name="agentModel"
        required={true}
        onChange={() => {
          setHasChanges(true);
        }}
        className="bg-black bg-opacity-55 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        {defaultModels.length > 0 && (
          <optgroup label="General models">
            {defaultModels.map((model) => {
              if (!supportedModel(provider, model)) return null;
              return (
                <option
                  key={model}
                  value={model}
                  selected={workspace?.agentModel === model}
                >
                  {model}
                </option>
              );
            })}
          </optgroup>
        )}
        {Array.isArray(customModels) && customModels.length > 0 && (
          <optgroup label="Custom models">
            {customModels.map((model) => {
              if (!supportedModel(provider, model.id)) return null;

              return (
                <option
                  key={model.id}
                  value={model.id}
                  selected={workspace?.agentModel === model.id}
                >
                  {model.id}
                </option>
              );
            })}
          </optgroup>
        )}
        {/* For providers like TogetherAi where we partition model by creator entity. */}
        {!Array.isArray(customModels) &&
          Object.keys(customModels).length > 0 && (
            <>
              {Object.entries(customModels).map(([organization, models]) => (
                <optgroup key={organization} label={organization}>
                  {models.map((model) => {
                    if (!supportedModel(provider, model.id)) return null;
                    return (
                      <option
                        key={model.id}
                        value={model.id}
                        selected={workspace?.agentModel === model.id}
                      >
                        {model.name}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </>
          )}
      </select>
    </div>
  );
}
