const panels = document.querySelectorAll('.panel')

const about = document.querySelector('.about')
const prices = document.querySelector('.prices')
const contact = document.querySelector('.contact')

const dropdown = document.querySelector('.dropdown')

panels.forEach( panel => {
    panel.addEventListener('click', () => {
        console.dir(panel)
        removeActive()
        panel.classList.add('active')
    })

    panel.children[1].addEventListener('mouseover', () => {
        if(panel.classList.contains('active')) { 
            panel.children[0].classList.remove('hidden')
            panel.children[0].style.opacity = 1;
        }      
    })

    panel.children[1].addEventListener('mouseleave', () => {
        panel.children[0].classList.add('hidden')
    })
})

function removeActive () {
    panels.forEach( panel => {
        panel.classList.remove('active')
    })
}

about.addEventListener('click', () => {
    dropdown.classList.remove('dropdown-hidden')
    dropdown.innerHTML = ` 
    <p>The Cheryl Ann was launched in August of 2014.  Here is a video of the launch (you can skip to 4:25 if you just want to see dolphins!) </p> 
    <iframe width="300" height="145" src="https://www.youtube.com/embed/94v6E1aWWVU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
     <button class="close-dropdown">close</button>`
    closeDrop()
  
})

prices.addEventListener('click', () => {
    dropdown.classList.remove('dropdown-hidden')
    dropdown.innerHTML = ` <h3> prices and options .........</h3> 
    <p> 3 hour trip........ ££5000/
    6 hour trip ..........£9000/
    champagne ............£900/
    Lobster.............50p
     </p> 
     <button class="close-dropdown">close</button>`
    closeDrop()
})

contact.addEventListener('click', () => {
    dropdown.classList.remove('dropdown-hidden')
    dropdown.innerHTML = `  <div class="form-container">  
    <h3>Please use the form to get in touch, or give us a call on 01234 567 890</h3>
    <form id="contact-form" >
        <input type="text" name="name" id="name" placeholder="Full Name"><br>
        <input type="text" name="email" id="email" placeholder="Email Address"><br>
        <input type="text" name="phone" id="phone" placeholder="Phone Number"> <br>
        <textarea name="message" id="message" placeholder="Please write your message here" cols="30" rows="5"></textarea>
        <button class="submit"> Send Message </button>
    </form>
</div>
     <button class="close-dropdown">close</button>`

    formLogic()
    closeDrop()
})

function closeDrop() {
      let closeDropdown = document.querySelector('.close-dropdown')
    closeDropdown.addEventListener('click', () => {
        dropdown.classList.add('dropdown-hidden')
        dropdown.innerHTML = ''
    })
}

function formLogic() {
    let form = document.querySelector('#contact-form')
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
    //this has to be deployed URL once deployed
        fetch("http://localhost:3000/", {  
            method: "post", 
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
              }       //  this .then doesnt seem to be working anymore...??
        }).then((response) => {   
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
}

    




    


