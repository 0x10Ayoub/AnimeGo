
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

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

   return await fetch(url, options).then(handleResponse)
        .then(handleData)
        .catch(handleError);

    function handleResponse(response) {
        return response.json();
    }
    function handleData(Data) {
        var pages = Data.data;
        return pages;
    }
    function handleError(Error) {

        return Error;
    }
}