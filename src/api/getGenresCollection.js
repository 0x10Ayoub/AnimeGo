import getDataByQuery from "./DataRequester"
export default async function getGenresCollection() {
    var query =
        `{  
            genres: GenreCollection
            tags: MediaTagCollection {
                name
                category
                isAdult
            }
        }
        `;
    return getDataByQuery(query)
}