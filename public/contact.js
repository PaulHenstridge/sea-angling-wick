const form = document.querySelector('#contact-form')
let fullName = document.querySelector('#name')
let email = document.querySelector('#email')
let phone = document.querySelector('#phone')
let message = document.querySelector('#message')
let submit = document.querySelector('#submit')




form.addEventListener('submit', e => {
    e.preventDefault()
    console.log('form submitted', form)

    let formData = {
        name : fullName.value,
        email : email.value,
        phone : phone.value,
        message : message.value
        }

    console.log('form data:', JSON.stringify(formData))

    // let xhr = new XMLHttpRequest()
    // xhr.open('POST', '/')
    // xhr.setRequestHeader('content-type','application.json')

    // xhr.onload = () => {
    //     console.log('response text', xhr.responseText)
    //     if() {
    //         alert('message sent')
    //         fullName.value = ''
    //         email.value = ''
    //         phone.value = ''
    //         message.value = ''
    //     } else {
    //         alert('Error.  Message not sent!')
    //     }
    // }
    // xhr.send(JSON.stringify(formData))

    fetch("http://localhost:3000/", {  //this has to be deployed URL once deployed
        method: "post", 
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
          },
    
      }).then((response) => {   //  this .then doesnt seem to be working anymore...??
        console.log('response:', response)
        if(response.status === 200) {
            alert('message sent')
            fullName.value = ''
            email.value = ''
            phone.value = ''
            message.value = ''
        } else {
            alert(`Issue...response status ${response.status}`)
        }
      })


})


 


