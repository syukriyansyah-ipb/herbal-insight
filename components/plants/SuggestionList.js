import Link from "next/link";

export default function SuggestionList({
  showSuggestion,
  query,
  plantList,
}) {
  return (
    showSuggestion &&
    query && (
      <div className="absolute bg-white w-full -translate-y-2 rounded-b-[20px] border-x border-b border-green-700">
        <ul className="pt-2 pb-5 text-sm md:text-base">
          {query.length >= 3 ? (
            plantList?.length > 0 ? (
              <>
                {plantList?.slice(0, 4).map((item) => (
                  <li key={item?.id}>
                    <Link href={`/plants/${item?.properties?.label}`}>
                      <div className="px-5 hover:bg-gray-200 py-2">
                        {item?.properties?.label}
                      </div>
                    </Link>
                  </li>
                ))}
                <li className="text-yellow-500 underline text-[11px] md:text-sm">
                  <Link href={`/plants?q=${query}`}>
                    <div className="px-5">View more</div>
                  </Link>
                </li>
              </>
            ) : (
              <li className="text-gray-600 py-2">
                <div className="px-5">Medicinal plant not found</div>
              </li>
            )
          ) : (
            <li className="text-gray-600 py-2">
              <div className="px-5">Ketikan 3 huruf...</div>
            </li>
          )}
        </ul>
      </div>
    )
  );
}
