"use client";
import Link from "next/link";
import { Input } from "@/components";
import { CiSearch } from "react-icons/ci";
import { FaFilter } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchPlants } from "@/api/plants";
import { Filter, SuggestionList } from "@/components/plants";
import clsx from "clsx";

export default function Searchbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [queryFilter, setQueryFilter] = useState("");
  const [plantList, setPlantList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [filterError, setFilterError] = useState(false);
  const [showSuggestion, setShowSuggestion] = useState(false);


  function handleQuery(e) {
    setQuery(e);
    if (!filter) setShowSuggestion(true);
  }

  function handleQueryFilter(e) {
    setQueryFilter(e);
  }

  function handleSearch() {
    setFilterError(false);
    if (filter === "scientific_name") {
      router.push(`/plants?scientific-name=${query}`);
    } else if (filter === "common_name") {
      if (queryFilter) {
        router.push(`/plants?common-name=${query}&code=${queryFilter}`);
      }
      if (!queryFilter) {
        setFilterError("Language code required");
      }
    } else if (filter === "local_name") {
      if (queryFilter) {
        router.push(`/plants?local-name=${query}&ethnic=${queryFilter}`);
      }
      if (!queryFilter) {
        setFilterError("Ethnic required");
      }
    } else router.push(`/plants?q=${query}`);
  }

  const handleKeyPress = (e) => {
    setFilterError(false);
    if (e.key === "Enter" && query) {
      if (filter === "scientific_name") {
        router.push(`/plants?scientific-name=${query}`);
      } else if (filter === "common_name") {
        if (queryFilter) {
          router.push(`/plants?common-name=${query}&code=${queryFilter}`);
        }
        if (!queryFilter) {
          setFilterError("Language code required");
        }
      } else if (filter === "local_name") {
        if (queryFilter) {
          router.push(`/plants?local-name=${query}&ethnic=${queryFilter}`);
        }
        if (!queryFilter) {
          setFilterError("Ethnic required");
        }
      } else router.push(`/plants?q=${query}`);
    }
    setShowSuggestion(false);
  };

  useEffect(() => {
    if (!filter) {
      const getPlants = async () => {
        const plants = await searchPlants(query);
        setPlantList(plants?.nodes);
      };
      if (query) {
        getPlants();
      }
    }
  }, [query]);


  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        <Input
          placeholder="Search medicinal plant..."
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
          handleButton={handleSearch}
          onKeyDown={handleKeyPress}
          Icon={CiSearch}
          style={`${
            showSuggestion && "rounded-t-[20px] rounded-b border-green-700"
          }`}
        />
        <div className="absolute md:-translate-x-16 -translate-x-12 right-0 flex items-center">
          <button onClick={() => setShowFilter(!showFilter)}>
            <FaFilter
              className={clsx(
                "w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-gray-900 mr-2 md:mr-3",
                {
                  "text-green-600": filter,
                }
              )}
            />
          </button>
          <span className="text-gray-400">|</span>
        </div>
      </div>

      {!filter && (
        <SuggestionList
          query={query}
          plantList={plantList}
          showSuggestion={showSuggestion}
        />
      )}

      <Filter
        showFilter={showFilter}
        closeFilter={() => setShowFilter(!showFilter)}
        filter={filter}
        setFilter={setFilter}
      />

      {filter === "common_name" && (
        <div className="pt-2">
          <Input
            placeholder="Language code of medicinal plant name (ex: eng for english)"
            value={queryFilter}
            onChange={(e) => handleQueryFilter(e.target.value)}
            handleButton={handleSearch}
            onKeyDown={handleKeyPress}
            error={filterError}
          />
          <Link href="https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes" target="_blank" rel="noopener noreferrer">
            <p className="md:text-sm text-[11px] underline pt-2 text-green-700">
              See language code here
            </p>
          </Link>
        </div>
      )}

      {filter === "local_name" && (
        <div className="pt-2">
          <Input
            placeholder="Ethnic of medicinal plant name (ex: Bali Aga)"
            value={queryFilter}
            onChange={(e) => handleQueryFilter(e.target.value)}
            handleButton={handleSearch}
            onKeyDown={handleKeyPress}
            error={filterError}
          />
        </div>
      )}
    </div>
  );
}
