
export default async function getDataByQuery(query,variables={}) {

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables
            })
        };

    return await fetch(url, options)
                .then(handleResponse)
                .then(handleData)
                .catch(handleError);

    function handleResponse(response) {
        return response.json();
    }
    function handleData(Data) {
        var collection = Data.data;
        return collection;
    }
    function handleError(Error) {

        return Error;
    }
}