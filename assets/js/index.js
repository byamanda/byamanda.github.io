(function() {

  function createMediaElement(imgUrl, link) {
    let postElem = document.createElement('div');
    postElem.classList.add('ig-feed__post');

    let linkElem = document.createElement('a');
    let imageElem = document.createElement('img');
    imageElem.classList.add('ig-feed__media')

    imageElem.src = imgUrl;
    linkElem.href = link;

    linkElem.appendChild(imageElem);
    postElem.appendChild(linkElem);

    return postElem;
  }

  window.addEventListener('load', function() {
    const ACCESS_TOKEN = "1447508261.1677ed0.6ebb3172543d49c8a29fca4b7415fba7"
    const COUNT = 9;

    const URL = 'https://api.instagram.com/v1/users/self';
    
    let mediaRequest = URL + '/media/recent?access_token=' + ACCESS_TOKEN + '&count=' + COUNT;
    let userRequest = URL + '/?access_token=' + ACCESS_TOKEN;

    let feed = document.getElementById('js-ig-feed');
    
    fetch(mediaRequest)
      .then(data => data.json())
      .then((results) => {
        results.data.forEach((post) => {
          feed.appendChild(createMediaElement(
            post.images.standard_resolution.url,
            post.link
          ));
        });
      });

    fetch(userRequest)
      .then(data => data.json())
      .then((results) => {
        let handleElem = document.getElementById('js-ig-handle');
        let pictureElem = document.getElementById('js-ig-pic');
        let statsElem = document.getElementById('js-ig-stats');

        handleElem.innerHTML = '@' + results.data.username;
        pictureElem.src = results.data.profile_picture;

        let followers = results.data.counts.followed_by;
        let posts = results.data.counts.media;
        let statsString = `${followers} Followers - ${posts} Posts`;
        statsElem.innerHTML = statsString;
      });
  });
})();
