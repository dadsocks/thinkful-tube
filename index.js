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
		<a href="https://www.youtube.com/embed/${result.id.videoId}" class="open-lightbox" target="_blank">
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

function renderLightBox(vidID) {
	return `
	<div class="lightbox">
		<p>CLick Anywhere to Close</p>
    	<div class="content">
        	<iframe src="${vidID}"  width="641" height="360" frameborder="0" allow="autoplay; encrypted-media"></iframe>
    	</div>
	</div>`
}

function closeLightBox() {
	$("html").on("click",".lightbox", function(event) {
		event.preventDefault();
		$(".lightbox").hide();
	});
}

function lightBoxDisplay() {
	$("main").on("click", ".open-lightbox", function(event) {
		event.preventDefault();
		const videoHref = $(event.currentTarget).attr("href");
		const lightbox = renderLightBox(videoHref);
		$('body').append(lightbox);
	});
	closeLightBox();
}



$(lightBoxDisplay);
$(searchSubmit);






