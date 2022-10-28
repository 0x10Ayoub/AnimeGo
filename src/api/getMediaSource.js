import getDataByQuery from "./DataRequester";
export default  async function getMediaSource(){

    var query =`
        {
            __type(name:"MediaSource"){
                enumValues {
                name
                description
                deprecationReason
                }
            }
        }
    
    `;
    return getDataByQuery(query);
}