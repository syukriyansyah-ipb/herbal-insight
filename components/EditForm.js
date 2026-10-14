import Input from "./Input";

export default function EditForm({ attribute, modalValue }) {
  return (
    <div>
      <h2 className="font-bold h2 text-base md:text-lg text-gray-900 pb-3 md:pb-4 break-words">
        Edit <span className="text-green-700">{modalValue?.label}</span> data
      </h2>
      <div className="space-y-3 text-sm md:text-base">
        {attribute?.map(
          (item, index) =>
            item?.label !== "Action" && (
              <div key={index} className="flex space-x-2 items-center">
                <div className="font-semibold w-1/3 break-words">
                  {item?.label}
                </div>
                <div>:</div>
                <div className="w-2/3 break-words">
                  <Input
                    placeholder={Object.values(modalValue)[index]}
                    style="bg-gray-100 focus:bg-white"
                    value={Object.values(modalValue)[index]}
                  />
                </div>
              </div>
            )
        )}
      </div>
      <p className="text-base text-center pt-5 md:pt-10 font-semibold">
        Are you sure want to save the changes?
      </p>
      <div className="flex justify-center pt-2 space-x-4">
        <button className="bg-red-400 py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-red-500 transition-colors duration-300 shadow-md">
          Yes
        </button>
        <button className="bg-yellow-400 py-2 px-8 rounded-full text-sm md:text-base font-medium hover:bg-orange-400 transition-colors duration-300 shadow-md">
          Cancel
        </button>
      </div>
    </div>
  );
}
