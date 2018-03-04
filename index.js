const YOUTUBE_SEARCH_URL ='https://www.googleapis.com/youtube/v3/search';

function getDataFromYouTube(criteria, callback) {
	const searchQuery = {
		part: 'snippet',
		maxResults: 25,
		q: criteria,
		key: 'AIzaSyCSWmkSbWWBVMOke76KasHlgxY4CMmmjUQ'
	}
	$.getJSON(YOUTUBE_SEARCH_URL,searchQuery,callback);
}

function renderResults(result) {
	return `
	<div class="result">
		<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
			<img src="${result.snippet.thumbnails.medium.url}">
		</a>
	</div>`
}

function youTubeSearchData(data) {
	const results = data.items.map((item,index) => renderResults(item));
	$(".search-results").html(results);
}

function searchSubmit() {
	$(".search-form").submit(event => {
		event.preventDefault();
		const searchQuery = $(event.currentTarget).find(".search-query");
		const query = searchQuery.val();
		searchQuery.val("");
		getDataFromYouTube(query,youTubeSearchData);
	});
}

$(searchSubmit);