import { explore } from "@/constants/floorData";
import { exploreMarker } from "@/constants/markerConfig";
import { map } from "es-toolkit/compat";
import MemoExploreMapMarker from "./ExploreMapMarker";

export default function ExploreMarkers() {
    return (
        map(explore, (exploreData) => {

            return (
                <MemoExploreMapMarker
                    key={exploreData.id}
                    exploreData={exploreData}
                    markerImg={exploreMarker}
                />
            );
        })
    );
}