document.addEventListener("DOMContentLoaded", () => {
  // Elementos del carrusel
  const track = document.getElementById("carouselTrack")
  const slides = Array.from(track.getElementsByClassName("carousel-slide"))
  const prevButton = document.getElementById("prevButton")
  const nextButton = document.getElementById("nextButton")
  const indicators = document.getElementById("carouselIndicators")
  const indicatorDots = Array.from(indicators.getElementsByClassName("indicator"))

  let currentIndex = 0
  const slideWidth = 100 // Porcentaje

  // Función para actualizar la posición del carrusel
  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}%)`

    // Actualizar indicadores
    indicatorDots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active")
      } else {
        dot.classList.remove("active")
      }
    })
  }

  // Evento para el botón anterior
  prevButton.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1
    updateCarousel()
  })

  // Evento para el botón siguiente
  nextButton.addEventListener("click", () => {
    currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1
    updateCarousel()
  })

  // Eventos para los indicadores
  indicatorDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index
      updateCarousel()
    })
  })

  // Efecto de hover para los botones cyber
  const cyberButtons = document.querySelectorAll(".cyber-button")
  cyberButtons.forEach((button) => {
    button.addEventListener("mouseover", function () {
      if (this.classList.contains("primary")) {
        this.style.boxShadow = "0 0 20px var(--primary)"
      }
    })

    button.addEventListener("mouseout", function () {
      if (this.classList.contains("primary")) {
        this.style.boxShadow = "none"
      }
    })
  })

  // Autoplay del carrusel (opcional)
  let autoplayInterval

  function startAutoplay() {
    autoplayInterval = setInterval(() => {
      currentIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1
      updateCarousel()
    }, 5000) // Cambiar cada 5 segundos
  }

  function stopAutoplay() {
    clearInterval(autoplayInterval)
  }

  // Iniciar autoplay
  startAutoplay()

  // Detener autoplay al interactuar con el carrusel
  track.addEventListener("mouseenter", stopAutoplay)
  prevButton.addEventListener("mouseenter", stopAutoplay)
  nextButton.addEventListener("mouseenter", stopAutoplay)
  indicators.addEventListener("mouseenter", stopAutoplay)

  // Reanudar autoplay al dejar de interactuar
  track.addEventListener("mouseleave", startAutoplay)
  prevButton.addEventListener("mouseleave", startAutoplay)
  nextButton.addEventListener("mouseleave", startAutoplay)
  indicators.addEventListener("mouseleave", startAutoplay)

  // Inicializar el carrusel
  updateCarousel()

  // Efecto de glitch aleatorio en el título
  const title = document.querySelector(".title")

  function glitchEffect() {
    title.style.textShadow = "2px 0 var(--primary), -2px 0 cyan"
    title.style.transform = "skewX(2deg)"

    setTimeout(() => {
      title.style.textShadow = "-2px 0 magenta, 2px 0 var(--primary)"
      title.style.transform = "skewX(-2deg)"

      setTimeout(() => {
        title.style.textShadow = "0 0 10px var(--primary-dark)"
        title.style.transform = "skewX(0)"
      }, 100)
    }, 100)
  }

  // Ejecutar efecto de glitch aleatoriamente
  setInterval(() => {
    if (Math.random() > 0.9) {
      glitchEffect()
    }
  }, 3000)
})
