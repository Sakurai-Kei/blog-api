import { ProfilePageData } from "../pages/user/[id]";

interface DeleteAccountModalComponentProps {
  data: ProfilePageData;
  handleDelete: () => Promise<void>;
  closeWarning: () => void;
}

export default function DeleteAccountModal(
  props: DeleteAccountModalComponentProps
) {
  const { data, handleDelete, closeWarning } = props;
  return (
    <div className="w-full absolute top-0">
      <div className="h-screen w-full z-10 inset-0 overflow-y-auto">
        <div className="absolute w-full h-full inset-0 bg-gray-500 opacity-75"></div>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          ></span>
          <div
            className="inline-block relative overflow-hidden transform transition-all sm:align-middle sm:max-w-lg"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div>
              <div className="rounded-t-lg p-8 bg-white shadow">
                <div className="p-4">
                  <div className="text-center">
                    <p className="text-2xl text-gray-800">
                      {data.user.fullName}
                    </p>
                    <p className="text-xl text-gray-500">
                      {data.user.username}
                    </p>
                    <p className="text-md text-gray-500"></p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-lg">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  DELETE
                </button>
                <button
                  type="button"
                  onClick={closeWarning}
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
