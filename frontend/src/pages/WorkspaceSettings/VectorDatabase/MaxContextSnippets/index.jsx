import { useTranslation } from "react-i18next";

export default function MaxContextSnippets({ workspace, setHasChanges }) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="name" className="block input-label">
          {t("vector-workspace.snippets.title")}
        </label>
        <p className="text-black text-opacity-60 text-xs font-medium py-1.5">
          {t("vector-workspace.snippets.description")}
          <br />
          <i>{t("vector-workspace.snippets.recommend")}</i>
        </p>
      </div>
      <input
        name="topN"
        type="number"
        min={1}
        max={200}
        step={1}
        onWheel={(e) => e.target.blur()}
        defaultValue={workspace?.topN ?? 4}
        className="bg-black bg-opacity-70 text-white placeholder:text-white/20 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-2"
        placeholder="4"
        required={true}
        autoComplete="off"
        onChange={() => setHasChanges(true)}
      />
    </div>
  );
}
