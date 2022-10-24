import getDataByQuery from "./DataRequester"
export default async function GetTopFive() {
    var query = 
        `query ($page: Int, $perPage: Int) {
            Page(page:$page	, perPage:$perPage){       
                media(sort: TRENDING_DESC, type: ANIME, isAdult: false) {
                id
                title {
                    romaji
                    english
                    native
                    userPreferred
                }
                coverImage {
                    extraLarge
                    large
                    medium
                    color
                }
                }
            }
        }
        `;

    var variables = {
        page: 1,
        perPage: 5
    };

   return getDataByQuery(query,variables);
}