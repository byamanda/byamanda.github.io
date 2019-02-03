(function() {
  window.addEventListener('load', function() {
num_posts: 8
    const ACCESS_TOKEN = "1447508261.1677ed0.6ebb3172543d49c8a29fca4b7415fba7"
    const COUNT = 8;

    const URL = 'https://api.instagram.com/v1/users/self';
    
    let mediaRequest = URL + '/media/recent?access_token=' + ACCESS_TOKEN + '&count=' + COUNT;
    let userRequest = URL + '/?access_token=' + ACCESS_TOKEN;

    let profile = document.getElementById('ig-profile');
    let feed = document.getElementById('ig-feed');
    
    fetch(mediaRequest)
      .then(data => data.json())
      .then((results) => {
        results.data.forEach((post) => {
          let postElem = document.createElement('a');
          let imageElem = document.createElement('img');

          imageElem.src = post.images.standard_resolution.url;
          postElem.href = post.link;

          postElem.appendChild(imageElem);
          feed.appendChild(postElem);
        });
      });

    fetch(userRequest)
      .then(data => data.json())
      .then((results) => {
        let handleElem = document.getElementById('ig-handle');
        let pictureElem = document.getElementById('ig-profilepic');
        let followersElem = document.getElementById('ig-followers');
        let postsElem = document.getElementById('ig-posts');

        handleElem.innerHTML = '@' + results.data.username;
        pictureElem.src = results.data.profile_picture;
        followersElem.innerHTML = results.data.counts.followed_by;
        postsElem.innerHTML = results.data.counts.media;
      });
  });
})();
