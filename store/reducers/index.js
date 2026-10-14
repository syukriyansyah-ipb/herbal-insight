import { combineReducers } from "redux";
import plants from "./plants";
import history from "./history"
import ethnics from "./ethnics";
import symptoms from "./symptoms";
import phenotypes from "./phenotypes";
import localNames from "./localNames";
import commonNames from "./commonNames";
import pharmacology from "./pharmacology";
import scientificNames from "./scientificNames";

export default combineReducers({
    plants,
    history,
    ethnics,
    symptoms,
    phenotypes,
    localNames,
    commonNames,
    pharmacology,
    scientificNames,
})