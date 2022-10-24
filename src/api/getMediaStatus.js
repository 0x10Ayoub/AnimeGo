import getDataByQuery from "./DataRequester";
export default  async function getMediaStatus(){

    var query =`
        {
            __type (name: "MediaStatus") {
                enumValues {
                    name
                    description
                }
            }
        }   
    `;
    return getDataByQuery(query);
}