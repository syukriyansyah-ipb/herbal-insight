import { Information } from "@/components";

export default function RelationshipGraph() {
  return (
    <div className="pt-8 md:pt-10">
      <h3 className="font-semibold text-base md:text-lg pb-2">Relationship</h3>
      <ul className="space-y-1 md:space-y-2 text-sm md:text-base">
        <li className="flex items-center">
          <div className="w-16 border-b-8 mr-3 border-blue-700 border-opacity-70"></div>
          <div className="flex">
            has part
            <Information
              id="part"
              text="Relationship between 'plant' and 'plant part'. Plants have certain parts that can be utilized."
            />
          </div>
        </li>
        <li className="flex items-center">
          <div className="w-16 border-b-8 mr-3 border-green-500 border-opacity-70"></div>
          <div className="flex">
            has compound
            <Information
              id="compound"
              text="Relationship between 'plant part' and 'compound'. Every plant and plant part has certain compounds."
            />
          </div>
        </li>
        <li className="flex items-center">
          <div className="w-16 border-b-8 mr-3 border-yellow-400 border-opacity-70"></div>
          <div className="flex">
            has side effect
            <Information
              id="sideEffect"
              text="Relationship between 'compound' and 'Disease'/'Phenotype'/'Symptom'. Compound has side effect."
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
