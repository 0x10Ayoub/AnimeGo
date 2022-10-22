import getDataByQuery from "./DataRequester"
export default async function getFormats() {

    var query =`
    {
    __type (name: "MediaFormat") {
        enumValues {
          name
        }
      }
    }
    `;
    return getDataByQuery(query);
}