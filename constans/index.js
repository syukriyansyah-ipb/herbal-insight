import { PiPlant } from "react-icons/pi";
import { IoBody } from "react-icons/io5";
import { MdMenuBook } from "react-icons/md";
import { FaDisease } from "react-icons/fa";
import { TfiShield } from "react-icons/tfi";
import { GiPlantSeed } from "react-icons/gi";
import { GrHomeRounded } from "react-icons/gr";
import { RiHandCoinFill } from "react-icons/ri";
import { FaHeadSideCough } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaCreativeCommonsShare } from "react-icons/fa";
import { MdLocalFlorist } from "react-icons/md";
// import { FaUserEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { PiPottedPlant } from "react-icons/pi";
import { MdEditLocationAlt } from "react-icons/md";
import { GoCrossReference } from "react-icons/go";
import { FaHouseUser } from "react-icons/fa";
import { RiLogoutBoxFill } from "react-icons/ri";

export const reasoningNav = [
  { label: "Plant Names", url: "plant-names" },
  { label: "Taxonomy", url: "taxonomy" },
  { label: "Traditional Use", url: "traditional-use" },
  { label: "Pharmacology", url: "pharmacology" },
];

export const sidebarItem = [
  { title: "Home", url: "/", Icon: GrHomeRounded },
  { title: "Dashboard", url: "/management", Icon: LuLayoutDashboard },
  { title: "Plant", url: "/management/plant", Icon: PiPlant },
  { title: "Scientific Names", url: "/management/scientificNames", Icon: MdMenuBook },
  { title: "Common Names", url: "/management/commonNames", Icon: FaCreativeCommonsShare },
  { title: "Local Names", url: "/management/localNames", Icon: MdLocalFlorist },
  { title: "Ethnic", url: "/management/ethnic", Icon: TfiShield },
  {
    title: "Traditional Uses",
    url: "/management/traditionalUses",
    Icon: GiPlantSeed,
  },
  { title: "Methode of Use", url: "/management/method-of-use", Icon: RiHandCoinFill },
  { title: "Diseases", url: "/management/diseases", Icon: FaDisease },
  { title: "Symptom", url: "/management/symptom", Icon: FaHeadSideCough },
  { title: "Phenotype", url: "/management/phenotype", Icon: IoBody },
  { title : "Plant Part", url: "/management/plant-part", Icon: PiPottedPlant },
  { title: "Location", url: "/management/location", Icon: MdEditLocationAlt },
  { title: "Reference", url: "/management/reference", Icon: GoCrossReference },
  { title: "Traditional Path All", url: "/management/path-all", Icon: FaUsers },
  // { title: "User Profile", url: "/management/profileUser", Icon: FaUserEdit },
  { title: "User", url: "/management/user", Icon: FaHouseUser },
  { title: "Logout", url: "/management/logout", Icon: RiLogoutBoxFill },
];
