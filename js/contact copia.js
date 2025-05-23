var scriptURL = 'https://script.google.com/macros/s/AKfycbxMOhUFI6Mux2x8k-1Cz1CeSjNyxhqgzV0JnSxoBvcL2M5YyXrConxfDkKKwRrLimGn/exec'


var form = document.forms['submit-to-google-sheet']
var successMessage = document.getElementById('success-message');
var sendingMessage = document.getElementById('sending-message');
var errorMessage = document.getElementById('error-message');

document.forms[0].onsubmit = async(e) => {
    e.preventDefault()
    form.style.display = 'none'; // hide the form immediately
    errorMessage.style.display = 'none'; // hide the error message
    sendingMessage.style.display = 'block'; // show the sending message
      const formData = new URLSearchParams([...new FormData(e.currentTarget).entries()])
      const formObject = Object.fromEntries(formData.entries())
      fetch(scriptURL, {redirect: "follow", method:"POST", body:formData})
        .then(function(response) {
            console.log('Success!', response)
            sendingMessage.style.display = 'none'; // hide the sending message
            successMessage.style.display = 'block'; // show the success message
        })
        .catch(function(error) {
            console.error('Error!', error.message)
            form.style.display = 'block'; // show the form again in case of error
            sendingMessage.style.display = 'none'; // hide the sending message
            errorMessage.style.display = 'block'; // show the error message
        })


      // capturamos los datos del formulario
      var formOut = new FormData(form);

      // Mostramos las [claves, valores] capturados en consola
      for(var pair of formOut.entries()) {
        console.log(pair[0]+ ': '+ pair[1]);
      }


}

