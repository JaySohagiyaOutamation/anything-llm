import { useState } from "react";
import { X } from "@phosphor-icons/react";
import ModalWrapper from "@/components/ModalWrapper";
import { CMD_REGEX } from ".";

export default function AddPresetModal({ isOpen, onClose, onSave }) {
  const [command, setCommand] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const sanitizedCommand = command.replace(CMD_REGEX, "");
    const saved = await onSave({
      command: `/${sanitizedCommand}`,
      prompt: form.get("prompt"),
      description: form.get("description"),
    });
    if (saved) setCommand("");
  };

  const handleCommandChange = (e) => {
    const value = e.target.value.replace(CMD_REGEX, "");
    setCommand(value);
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-2xl max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-500/50">
            <h3 className="text-xl font-semibold text-black">Add New Preset</h3>
            <button
              onClick={onClose}
              type="button"
              className="transition-all duration-300 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-[#e4ecf6] border-black/80"
            >
              <X className="text-black text-lg" />
            </button>
          </div>
          <div className="p-6 space-y-6 flex h-full w-full">
            <div className="w-full flex flex-col gap-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Command
                </label>
                <div className="flex items-center">
                  <span className="text-black text-sm mr-2 font-bold">/</span>
                  <input
                    name="command"
                    type="text"
                    placeholder="your-command"
                    value={command}
                    onChange={handleCommandChange}
                    maxLength={25}
                    autoComplete="off"
                    required={true}
                    className="border-none bg-black/70 placeholder:text-white/45 border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-black">
                  Prompt
                </label>
                <textarea
                  name="prompt"
                  autoComplete="off"
                  placeholder="This is the content that will be injected in front of your prompt."
                  required={true}
                  className="border-none bg-black/70 placeholder:text-white/45 border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                ></textarea>
              </div>
              <div>
                <label className="border-none block mb-2 text-sm font-medium text-black">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Responds with a poem about LLMs."
                  maxLength={80}
                  autoComplete="off"
                  required={true}
                  className="border-none bg-black/70 placeholder:text-white/45 border-gray-500 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-between items-center p-6 space-x-2 border-t rounded-b border-gray-500/50">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 rounded-lg text-white bg-black/90 hover:bg-black/70 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="transition-all duration-300 text-white border border-slate-200 px-4 py-2 rounded-lg text-sm items-center flex gap-x-2 bg-black/90 hover:bg-black/70"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </ModalWrapper>
  );
}
