(function () {
  window.addEventListener('load', main);
  
  /** 
   * When a submit event happens this handler occurs. 
   * The default submit event gets canceled in preference 
   * to this one. 
   * @param event The event triggered 
   */
  function handleSubmit(event) {
    event.preventDefault(); 
  
    let alert = document.getElementById('alert');

    let url = ''; // event.target.action;
    let formData = new FormData(event.target);
    
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
    }).then(function(data) {
      event.target.reset();
      showAlert(alert, true);
    }).catch(function(err) {
      showAlert(alert, false);
    });
  }

  /**
   * Shows an alert indicating to the user 
   * the form was submitted.
   * @param alert_id HTML id of the alert to target.
   * @param success Boolean indicating success or not.
   */
  function showAlert(alert, success) {
    if (success) {
      alert.classList.add('success');
      alert.innerHTML = 'Thank you for contacting me, I will get back to you as soon as I can!';
    } else {
      alert.classList.add('error');
      alert.innerHTML = "I'm sorry, something went wrong, try again later";
    }

    alert.classList.add('active');

    current_timer = setTimeout(function () {
      alert.classList.remove('active');
      alert.classList.remove(success ? 'success' : 'error');
    }, 4000);
  }

  function main() {
    let form = document.getElementById('contact_form');
    form.addEventListener('submit', handleSubmit);
  }
})();
