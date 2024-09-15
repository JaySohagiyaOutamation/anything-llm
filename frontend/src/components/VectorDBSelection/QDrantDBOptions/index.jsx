export default function QDrantDBOptions({ settings }) {
  return (
    <div className="w-full flex flex-col gap-y-7">
      <div className="w-full flex items-center gap-[36px] mt-1.5">
        <div className="flex flex-col w-60">
          <label className="text-black text-sm font-semibold block mb-3">
            QDrant API Endpoint
          </label>
          <input
            type="url"
            name="QdrantEndpoint"
            className="bg-black bg-opacity-55 text-white placeholder:text-white/70 text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none block w-full p-2.5"
            placeholder="http://localhost:6633"
            defaultValue={settings?.QdrantEndpoint}
            required={true}
            autoComplete="off"
            spellCheck={false}
          />
        </div>

        <div className="flex flex-col w-60">
          <label className="text-black text-sm font-semibold block mb-3">
            API Key
          </label>
          <input
            type="password"
            name="QdrantApiKey"
            className="bg-black bg-opacity-55 text-white placeholder:text-white/70 text-sm rounded-lg focus:outline-primary-button active:outline-primary-button outline-none block w-full p-2.5"
            placeholder="wOeqxsYP4....1244sba"
            defaultValue={settings?.QdrantApiKey}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
