"use client";
import { ClickOutside } from "@/components";

export default function Filter({ showFilter, closeFilter, filter, setFilter }) {
  const name = [
    { label: "Scientific Name", id: "scientific_name" },
    { label: "Common Name", id: "common_name" },
    { label: "Local Name", id: "local_name" },
  ];

  return (
    showFilter && (
      <ClickOutside
        setShow={closeFilter}
        styles="relative w-full flex flex-col items-end z-20"
      >
        <div className="absolute bg-white md:w-1/3 w-2/3 rounded-lg mr-12 md:mr-16 px-5 py-2 text-[11px] md:text-sm divide-y text-gray-600 shadow-md">
          <h4 className="font-medium pb-1">Search by</h4>
          <div className="pt-2 space-y-1 md:space-y-2">
            {name.map((item) => (
              <div key={item.id}>
                <label className="flex items-center hover:bg-green-100 hover:bg-opacity-60">
                  <input
                    type="radio"
                    name="name"
                    value={item.id}
                    onChange={() => setFilter(item.id)}
                    checked={item.id === filter}
                  />
                  <span className="pl-2">{item.label}</span>
                </label>
              </div>
            ))}
            {filter && (
              <button
                onClick={() => setFilter(false)}
                className="text-yellow-500 underline"
              >
                Remove filter
              </button>
            )}
          </div>
        </div>
      </ClickOutside>
    )
  );
}
