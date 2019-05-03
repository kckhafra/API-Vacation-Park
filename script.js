const apiKey="Qn9vBUfeaYYHf41EaZZ2CuGFVJ9CfkNrdZAYVSMx"
const searchURL = "https://developer.nps.gov/api/v1/parks"

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    return queryItems.join('&')
    
}

function getParkInfo(query, maxResults) {
    const params = {
        stateCode: query,
        api_key: apiKey,
        limit: maxResults
    }
    console.log(params.stateCode)
    const queryString = formatQueryParams(params);
    const url = searchURL + '?' + queryString;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        
        .catch(err=>{
            $('#js-error-message').text(`something went wrong ${err.message}`);
        })
}



function displayResults(responseJson){
    $("#results").empty();

    responseJson.data.forEach(function(parkObj){
        $("#results").append(`
        <li><h2>${parkObj.fullName}</h2></li>
        <li>${parkObj.description}</li>
        <li class="last-item"><a href="${parkObj.url}" target="_blank">${parkObj.url}</a></li>`)
        }
    )}

function watchForm() {
    $("form").submit(function(event){
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val()-1;
        getParkInfo(searchTerm, maxResults)
    })
}

$(watchForm())


// Requirements:
// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL
// The user must be able to make multiple searches and see only the results for the current search.