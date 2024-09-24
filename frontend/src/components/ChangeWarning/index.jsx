import { Warning } from "@phosphor-icons/react";

export default function ChangeWarningModal({
  warningText = "",
  onClose,
  onConfirm,
}) {
  return (
    <div className="relative w-full max-w-2xl max-h-full">
      <div className="relative bg-white rounded-lg shadow">
        <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-500/50">
          <div className="flex items-center gap-2">
            <Warning
              className="text-yellow-300 text-lg w-6 h-6"
              weight="fill"
            />
            <h3 className="text-xl font-semibold text-yellow-300">Warning</h3>
          </div>
        </div>
        <div className="w-[550px] p-6 text-black">
          <p>
            {warningText}
            <br />
            <br />
            Are you sure you want to proceed?
          </p>
        </div>

        <div className="flex w-full justify-between items-center p-6 space-x-2 border-t rounded-b border-gray-500/50">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg text-white bg-red-500 hover:bg-red-400 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="transition-all duration-300 border border-slate-200 px-4 py-2 rounded-lg  text-sm items-center flex gap-x-2 bg-slate-200 hover:bg-slate-100 text-black focus:ring-gray-800"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
