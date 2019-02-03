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
        let unameElem = document.createElement('h2')
        let statsElem = document.createElement('h3');
        let profilePicture = document.createElement('img');

        profilePicture.src = results.data.profile_picture;
        unameElem.innerHTML = '@' + results.data.username;
        statsElem.innerHTML = results.data.counts.followed_by + ' - ' + results.data.counts.media;

        // profile.appendChild(profilePicture);
        // profile.appendChild(unameElem);
        // profile.appendChild(statsElem);
      });
  });
})();
