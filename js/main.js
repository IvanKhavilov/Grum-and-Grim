document.addEventListener('DOMContentLoaded', () => {
  /*Burger Menu */
  const burgerBtn = document.querySelector('.burger__btn')
  const navMenu = document.querySelector('.nav__menu')

  if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('active')
      burgerBtn.classList.toggle('active')
      burgerBtn.setAttribute('aria-expanded', isOpen)
    })
  }

  /*Smooth Scroll (Hero button)*/
  const heroBtn = document.querySelector('.hero__btn')

  if (heroBtn) {
    heroBtn.addEventListener('click', () => {
      const concertsSection = document.getElementById('concerts')
      if (concertsSection) {
        concertsSection.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  /*Popup*/
  const popup = document.getElementById('popup')
  const popupClose = document.querySelector('.popup__close')

  if (popup && popupClose) {
    const openPopup = () => {
      popup.hidden = false
      document.body.style.overflow = 'hidden'
      popupClose.focus()
    }

    const closePopup = () => {
      popup.hidden = true
      document.body.style.overflow = ''
    }

    // Open by ticket buttons
    document.querySelectorAll('.ticket-btn').forEach((btn) => {
      btn.addEventListener('click', openPopup)
    })

    // Close button
    popupClose.addEventListener('click', closePopup)

    // Close by overlay click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closePopup()
      }
    })

    // Close by Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !popup.hidden) {
        closePopup()
      }
    })

    /* Form + GET */
    const form = document.getElementById('contactForm')
    const formMessage = document.getElementById('formMessage')

    if (form && formMessage) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault()

        formMessage.textContent = ''
        formMessage.className = 'form__message'

        if (!form.checkValidity()) {
          formMessage.textContent = 'Будь ласка, заповніть всі поля коректно.'
          formMessage.classList.add('form__message--error')
          form.reportValidity()
          return
        }

        const submitBtn = form.querySelector('button[type="submit"]')
        if (submitBtn) submitBtn.disabled = true

        const formData = new FormData(form)
        const params = new URLSearchParams(formData).toString()

        try {
          // GET request to current page (без CORS)
          await fetch(`?${params}`, {
            method: 'GET',
          })

          formMessage.textContent = 'Повідомлення успішно надіслано!'
          formMessage.classList.add('form__message--success')

          form.reset()
          openPopup()
        } catch (error) {
          formMessage.textContent = 'Сталася помилка. Спробуйте пізніше.'
          formMessage.classList.add('form__message--error')
        } finally {
          if (submitBtn) submitBtn.disabled = false
        }
      })
    }
  }
})
