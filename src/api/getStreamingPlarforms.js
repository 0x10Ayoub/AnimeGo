import getDataByQuery from "./DataRequester"
export default async function getStreamingPlarforms() {

    var query =`
    query ($type: ExternalLinkMediaType) {
      ExternalLinkSourceCollection(mediaType: $type, type: STREAMING) {
        id
        url
        site
        type
        language
        color
        icon
      }
    }  
    `;
    return getDataByQuery(query,{type:"ANIME"});
}