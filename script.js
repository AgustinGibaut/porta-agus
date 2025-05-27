// Git Terminal Simulator
class GitTerminalSimulator {
  constructor() {
    this.terminalSession = document.getElementById("terminalSession")
    this.startBtn = document.getElementById("startGitFlow")
    this.resetBtn = document.getElementById("resetGitFlow")
    this.skipBtn = document.getElementById("skipToEnd")
    this.currentStep = 0
    this.isRunning = false

    this.gitCommands = [
      {
        command: "git init",
        description: "📞 Contacto inicial - El cliente nos contacta con su idea",
        output: [
          "Initialized empty Git repository in /trabajo/.git/",
          "",
          "✓ Repositorio del proyecto inicializado",
          "✓ Primer contacto establecido con el cliente",
        ],
        type: "success",
      },
      {
        command: "git config user.name 'Agustin Gibaut'",
        description: "👥 Configuración del equipo - Nos presentamos y conocemos al cliente",
        output: ["✓ Configuración del desarrollador establecida"],
        type: "info",
      },
      {
        command: "git config user.email 'agusgibaut693@gmail.com'",
        description: "📧 Canal de comunicación - Establecemos vías de contacto",
        output: ["✓ Email de contacto configurado"],
        type: "info",
      },
      {
        command: "touch requirements.md",
        description: "📋 Análisis de requisitos - Documentamos las necesidades del cliente",
        output: ["✓ Archivo de requisitos creado"],
        type: "success",
      },
      {
        command: "git add requirements.md",
        description: "📝 Preparación de propuesta - Agregamos los requisitos al proyecto",
        output: ["✓ Requisitos agregados al staging area"],
        type: "success",
      },
      {
        command: 'git commit -m "Initial requirements and project setup"',
        description: "💼 Propuesta aceptada - El cliente aprueba la propuesta y firmamos contrato",
        output: [
          "[main (root-commit) a1b2c3d] Initial requirements and project setup",
          " 1 file changed, 25 insertions(+)",
          " create mode 100644 requirements.md",
          "",
          "✓ Contrato firmado y proyecto oficialmente iniciado",
        ],
        type: "success",
      },
      {
        command: "git checkout -b development",
        description: "⚡ Inicio del desarrollo - Creamos rama de desarrollo para trabajar",
        output: ["Switched to a new branch 'development'", "", "✓ Entorno de desarrollo preparado"],
        type: "info",
      },
      {
        command: "mkdir src components styles",
        description: "🏗️ Estructura del proyecto - Organizamos la arquitectura",
        output: ["✓ Estructura de directorios creada", "✓ Arquitectura del proyecto definida"],
        type: "success",
      },
      {
        command: "touch src/app.js components/header.js styles/main.css",
        description: "💻 Desarrollo activo - Creamos los archivos principales",
        output: ["✓ Archivos principales creados", "✓ Desarrollo en progreso..."],
        type: "success",
      },
      {
        command: "git add .",
        description: "📦 Preparación de entrega - Agregamos todas las funcionalidades desarrolladas",
        output: ["✓ Todos los archivos agregados al staging area"],
        type: "success",
      },
      {
        command: 'git commit -m "Feature development complete"',
        description: "🧪 Testing y QA - Realizamos pruebas exhaustivas",
        output: [
          "[development e4f5g6h] Feature development complete",
          " 15 files changed, 847 insertions(+), 12 deletions(-)",
          "",
          "✓ Todas las funcionalidades implementadas",
          "✓ Tests pasando correctamente",
        ],
        type: "success",
      },
      {
        command: "git checkout main",
        description: "🔄 Preparación para producción - Volvemos a la rama principal",
        output: ["Switched to branch 'main'", "", "✓ Preparando para merge a producción"],
        type: "info",
      },
      {
        command: "git merge development",
        description: "🔗 Integración final - Unimos el desarrollo con la rama principal",
        output: [
          "Updating a1b2c3d..e4f5g6h",
          "Fast-forward",
          " src/app.js        | 156 +++++++++++++++++++++++++++++++++",
          " components/       |  89 +++++++++++++++++++",
          " styles/main.css   |  67 +++++++++++++++",
          " 15 files changed, 847 insertions(+), 12 deletions(-)",
          "",
          "✓ Código integrado exitosamente",
        ],
        type: "success",
      },
      {
        command: "git tag v1.0.0",
        description: "🏷️ Versionado - Marcamos la versión estable para producción",
        output: ["✓ Tag v1.0.0 creado", "✓ Versión estable marcada"],
        type: "success",
      },
      {
        command: "git push origin main --tags",
        description: "🚀 Despliegue a producción - Proyecto listo y redes sociales activas",
        output: [
          "Enumerating objects: 25, done.",
          "Counting objects: 100% (25/25), done.",
          "Delta compression using up to 8 threads",
          "Compressing objects: 100% (18/18), done.",
          "Writing objects: 100% (25/25), 3.45 KiB | 3.45 MiB/s, done.",
          "Total 25 (delta 8), reused 0 (delta 0), pack-reused 0",
          "To production-server:/trabajo.git",
          "   a1b2c3d..e4f5g6h  main -> main",
          " * [new tag]         v1.0.0 -> v1.0.0",
          "",
          "✅ ¡PROYECTO DESPLEGADO EXITOSAMENTE!",
          "",
          "📱 SÍGUENOS EN NUESTRAS REDES:",
          "🐙 GitHub: github.com/diamondcode",
          "📧 Email: diamondcode10@gmail.com",
          "📸 Instagram: @diamond codee",
          "",
          "🎉 ¡Conecta con nosotros para más proyectos!",
        ],
        type: "success",
      },
      {
        command: "git status",
        description: "✅ Verificación final - Confirmamos que todo está en orden",
        output: [
          "On branch main",
          "Your branch is up to date with 'origin/main'.",
          "",
          "nothing to commit, working tree clean",
          "",
          "🎉 ¡PROYECTO COMPLETADO CON ÉXITO!",
          "🎉 Cliente satisfecho y proyecto entregado",
          "🎉 Listo para el siguiente desafío",
        ],
        type: "success",
      },
    ]

    this.init()
  }

  


  init() {
    this.startBtn.addEventListener("click", () => this.startGitFlow())
    this.resetBtn.addEventListener("click", () => this.resetGitFlow())
    this.skipBtn.addEventListener("click", () => this.skipToEnd())

    // Auto-start when section is visible
    this.setupIntersectionObserver()
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isRunning && this.currentStep === 0) {
            setTimeout(() => this.startGitFlow(), 1000)
          }
        })
      },
      { threshold: 0.3 },
    )

    const gitSection = document.getElementById("proceso")
    if (gitSection) {
      observer.observe(gitSection)
    }
  }

  startGitFlow() {
    if (this.isRunning) return

    this.isRunning = true
    this.startBtn.disabled = true
    this.skipBtn.disabled = false

    this.executeNextCommand()
  }

  executeNextCommand() {
    if (this.currentStep < this.gitCommands.length) {
      const command = this.gitCommands[this.currentStep]
      this.typeCommand(command)
      this.currentStep++
    } else {
      this.isRunning = false
      this.startBtn.disabled = false
      this.startBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Proceso Completado'
      this.skipBtn.disabled = true

      setTimeout(() => {
        this.startBtn.innerHTML = '<i class="bi bi-play-fill"></i> Iniciar Proceso'
      }, 3000)
    }
  }

  typeCommand(commandObj) {
    // Create command line
    const commandLine = document.createElement("div")
    commandLine.className = "git-line"

    const prompt = document.createElement("span")
    prompt.className = "git-prompt"
    prompt.textContent = "agustin-gibaut@WORKSTATION MINGW64 ~/trabajo"

    const dollarSign = document.createElement("span")
    dollarSign.className = "git-prompt"
    dollarSign.textContent = "$ "

    const commandSpan = document.createElement("span")
    commandSpan.className = "git-command"

    commandLine.appendChild(prompt)
    commandLine.appendChild(document.createElement("br"))
    commandLine.appendChild(dollarSign)
    commandLine.appendChild(commandSpan)

    this.terminalSession.appendChild(commandLine)

    // Type command with syntax highlighting
    this.typeText(commandSpan, commandObj.command, () => {
      // Add description
      const description = document.createElement("div")
      description.className = "git-description"
      description.textContent = commandObj.description
      this.terminalSession.appendChild(description)

      // Add output
      commandObj.output.forEach((line, index) => {
        setTimeout(() => {
          const outputLine = document.createElement("div")
          outputLine.className = `git-output ${commandObj.type}`
          outputLine.textContent = line
          this.terminalSession.appendChild(outputLine)

          // Scroll to bottom
          this.terminalSession.scrollTop = this.terminalSession.scrollHeight

          // Continue to next command after last output line
          if (index === commandObj.output.length - 1) {
            setTimeout(() => this.executeNextCommand(), 800)
          }
        }, index * 200)
      })
    })

    // Scroll to bottom
    this.terminalSession.scrollTop = this.terminalSession.scrollHeight
  }

  typeText(element, text, callback) {
    let i = 0
    const typeInterval = setInterval(() => {
      if (i < text.length) {
        // Add syntax highlighting
        const highlightedText = this.highlightGitSyntax(text.substring(0, i + 1))
        element.innerHTML = highlightedText
        i++
      } else {
        clearInterval(typeInterval)
        if (callback) callback()
      }
    }, 50)
  }

  highlightGitSyntax(text) {
    return text
      .replace(/(git\s+\w+)/g, '<span class="cmd">$1</span>')
      .replace(/(-\w+|--\w+)/g, '<span class="flag">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/(#.*)/g, '<span class="comment">$1</span>')
  }

  skipToEnd() {
    if (!this.isRunning) return

    // Clear current session
    this.terminalSession.innerHTML = ""

    // Add all commands instantly
    this.gitCommands.forEach((commandObj) => {
      // Command line
      const commandLine = document.createElement("div")
      commandLine.className = "git-line"
      commandLine.innerHTML = `
                <span class="git-prompt">agustin-gibaut@WORKSTATION MINGW64 ~/trabajo</span><br>
                <span class="git-prompt">$ </span>
                <span class="git-command">${this.highlightGitSyntax(commandObj.command)}</span>
            `
      this.terminalSession.appendChild(commandLine)

      // Description
      const description = document.createElement("div")
      description.className = "git-description"
      description.textContent = commandObj.description
      this.terminalSession.appendChild(description)

      // Output
      commandObj.output.forEach((line) => {
        const outputLine = document.createElement("div")
        outputLine.className = `git-output ${commandObj.type}`
        outputLine.textContent = line
        this.terminalSession.appendChild(outputLine)
      })
    })

    // Update state
    this.currentStep = this.gitCommands.length
    this.isRunning = false
    this.startBtn.disabled = false
    this.startBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Proceso Completado'
    this.skipBtn.disabled = true

    // Scroll to bottom
    this.terminalSession.scrollTop = this.terminalSession.scrollHeight

    setTimeout(() => {
      this.startBtn.innerHTML = '<i class="bi bi-play-fill"></i> Iniciar Proceso'
    }, 3000)
  }

  resetGitFlow() {
    this.isRunning = false
    this.currentStep = 0
    this.terminalSession.innerHTML = ""
    this.startBtn.disabled = false
    this.startBtn.innerHTML = '<i class="bi bi-play-fill"></i> Iniciar Proceso'
    this.skipBtn.disabled = true
  }
}

// Efectos de entrada minimalistas
function addMinimalistEntryEffects() {
  const elements = document.querySelectorAll(
    ".main-title, .subtitle, .service-card, .contact-form-container, .logo-img"
  )
  elements.forEach((el, idx) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.7s cubic-bezier(.4,0,.2,1), transform 0.7s cubic-bezier(.4,0,.2,1)"
    setTimeout(() => {
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, 300 + idx * 120)
  })
}

// Función para scroll suave
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    const offsetTop = element.offsetTop - 80 // Ajuste para el navbar fijo
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    })
  }
}

// Efectos de hover para las tarjetas de servicios mejorados
function addServiceCardEffects() {
  const serviceCards = document.querySelectorAll(".service-card")

  serviceCards.forEach((card) => {
    card.style.transition = "transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s cubic-bezier(.4,0,.2,1)"

    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.04)"
      this.style.boxShadow = "0 8px 32px rgba(34,197,94,0.15), 0 1.5px 6px rgba(0,0,0,0.08)"
      this.style.zIndex = "2"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = ""
      this.style.zIndex = ""
    })

    // Accesibilidad: efecto también con teclado
    card.addEventListener("focus", function () {
      this.style.transform = "translateY(-12px) scale(1.04)"
      this.style.boxShadow = "0 8px 32px rgba(34,197,94,0.15), 0 1.5px 6px rgba(0,0,0,0.08)"
      this.style.zIndex = "2"
    })
    card.addEventListener("blur", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = ""
      this.style.zIndex = ""
    })
  })
}

// Efecto parallax mejorado para el logo
function addParallaxEffect() {
  const logo = document.querySelector(".logo-img")
  let lastScrollY = window.scrollY
  let ticking = false

  function updateParallax() {
    const scrolled = window.scrollY
    const rate = scrolled * -0.35 // Menos agresivo y más suave

    if (logo) {
      logo.style.transform = `translateY(${rate}px) scale(${1 + Math.min(scrolled / 2000, 0.08)})`
      logo.style.transition = "transform 0.2s cubic-bezier(.4,0,.2,1)"
    }
    ticking = false
  }

  function onScroll() {
    lastScrollY = window.scrollY
    if (!ticking) {
      window.requestAnimationFrame(updateParallax)
      ticking = true
    }
  }

  window.addEventListener("scroll", onScroll)
}
