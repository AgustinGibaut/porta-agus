    window.addEventListener('DOMContentLoaded', () => {
        const dots = document.querySelectorAll('#loading-dots .dot');
        let dotIndex = 0;
        let direction = 1;
        let dotInterval = setInterval(() => {
            dots.forEach((dot, i) => dot.style.opacity = (i === dotIndex ? '1' : '0.3'));
            dotIndex += direction;
            if (dotIndex === dots.length) {
                dotIndex = 0;
            }
        }, 400);

        const loading = document.getElementById('loading-message');
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
                clearInterval(dotInterval);
                createBubbleEffect();
            }, 700);
        }, 2500);
    });

    function createBubbleEffect() {
        const bubbleContainer = document.createElement('div');
        bubbleContainer.style.position = 'fixed';
        bubbleContainer.style.left = 0;
        bubbleContainer.style.top = 0;
        bubbleContainer.style.width = '100vw';
        bubbleContainer.style.height = '100vh';
        bubbleContainer.style.pointerEvents = 'none';
        bubbleContainer.style.zIndex = 9998;
        document.body.appendChild(bubbleContainer);

        let bubblesFinished = 0;
        const totalBubbles = 25;

        for (let i = 0; i < totalBubbles; i++) {
            const bubble = document.createElement('div');
            const size = Math.random() * 30 + 20;
            bubble.style.position = 'absolute';
            bubble.style.left = `${Math.random() * 100}vw`;
            bubble.style.bottom = '-60px';
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.borderRadius = '50%';
            bubble.style.background = 'rgba(162,89,255,0.15)';
            bubble.style.boxShadow = '0 0 10px 2px rgba(162,89,255,0.3)';
            bubble.style.opacity = Math.random() * 0.5 + 0.5;
            bubble.style.transition = 'transform 2.2s cubic-bezier(.17,.67,.83,.67), opacity 2.2s';
            bubbleContainer.appendChild(bubble);

            setTimeout(() => {
                bubble.style.transform = `translateY(-${window.innerHeight + 100}px) scale(${Math.random() * 0.7 + 0.7})`;
                bubble.style.opacity = 0;
            }, 10 + i * 60);

            setTimeout(() => {
                bubble.remove();
                bubblesFinished++;
                if (bubblesFinished === totalBubbles) bubbleContainer.remove();
            }, 2300 + i * 60);
        }
    }

        const linusQuotes = [
        "La inteligencia es la habilidad de evitar hacer trabajo, y conseguir que el trabajo se haga.",
        "Hablar es barato. Muéstrame el código.",
        "La mayoría de la gente simplemente no entiende lo que es hacer software.",
        "Las buenas personas no necesitan reglas para decirles que deben actuar responsablemente.",
        "El software es como el sexo: es mejor cuando es libre.",
        "No soy una persona agradable y no pretendo serlo.",
        "La perfección es enemiga de lo bueno.",
        "El software es un gas: se expande hasta llenar su contenedor.",
        "No te preocupes por lo que piensan los demás, haz lo que creas correcto.",
        "La simplicidad es la clave de la brillantez."
    ];

    // Mostrar/ocultar chatbot
    const toggleBtn = document.getElementById('chatbot-toggle');
    const chatWindow = document.getElementById('chatbot-window');
    const sound = document.getElementById('chatbot-sound');
    const messages = document.getElementById('chatbot-messages');
    toggleBtn.onclick = () => {
        chatWindow.style.display = chatWindow.style.display === 'flex' ? 'none' : 'flex';
        chatWindow.style.flexDirection = 'column';
        if (chatWindow.style.display === 'flex' && messages.childElementCount === 0) {
            startTerminalWelcome();
        }
    };

    // Mensaje de bienvenida y menú de opciones
    function startTerminalWelcome() {
        addMessage('¡Hola! Soy el asistente de Agustin.', 'bot');
        setTimeout(() => {
            addMessage('Opciones disponibles:\n1) Contacto\n2) Ver proyectos\n3) Sobre mí\n4) Ayuda\nO escribe "salir" para cerrar el chat.', 'bot');
            setTimeout(() => {
                // Frase aleatoria de Linus
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
        }, 400);
    }

    // Añadir mensaje estilo terminal
    function addMessage(text, from='user') {
        const msg = document.createElement('div');
        msg.style.alignSelf = from === 'user' ? 'flex-end' : 'flex-start';
        msg.style.background = from === 'user' ? '#232323' : '#232323';
        msg.style.color = from === 'user' ? '#a259ff' : '#fff';
        msg.style.padding = '0.5em 1em';
        msg.style.borderRadius = '10px';
        msg.style.border = from === 'user' ? '1.5px solid #a259ff' : '1.5px solid #444';
        msg.style.maxWidth = '90%';
        msg.style.whiteSpace = 'pre-line';
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
        sound.currentTime = 0;
        sound.play();
    }

    function randomLinusQuote() {
        return linusQuotes[Math.floor(Math.random() * linusQuotes.length)];
    }

    // Opciones del menú principal
    function handleMenuOption(option) {
        switch(option) {
        case '1':
            addMessage('Contacto:', 'bot');
            setTimeout(() => {
                addMessage(
                    'WhatsApp: +54 3512580435\nGitHub: AgustinGibaut\nLinkedIn: agustin-gibaut\nGmail: agusgibaut693@gmail.com\n¿Quieres los enlaces directos? (sí/no)', 'bot'
                );
                setTimeout(() => {
                    addMessage(randomLinusQuote(), 'bot');
                }, 700);
            }, 500);
            break;
        case '2':
            addMessage('Puedes ver mis proyectos en la sección "proyectos" de la web o en mi GitHub.', 'bot');
            setTimeout(() => {
                addMessage('¿Quieres el enlace a mi portfolio o GitHub? (portfolio/github)', 'bot');
                setTimeout(() => {
                    addMessage(randomLinusQuote(), 'bot');
                }, 700);
            }, 700);
            break;
        case '3':
            addMessage('Sobre mí:', 'bot');
            setTimeout(() => {
                addMessage('Soy Agustin Gibaut, estudiante de desarrollo de software apasionado por la tecnología y el aprendizaje constante.', 'bot');
                setTimeout(() => {
                    addMessage(randomLinusQuote(), 'bot');
                }, 700);
            }, 500);
            break;
        case '4':
            addMessage('Opciones disponibles:\n1) Contacto\n2) Ver proyectos\n3) Sobre mí\n4) Ayuda\nO escribe "salir" para cerrar el chat.', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
            break;
        default:
            addMessage('Opción no reconocida. Escribe un número del menú o "4" para ayuda.', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
        }
    }

    // Llama a la API de OpenAI (requiere tu propia clave y endpoint)
    async function callOpenAI(prompt) {
        // Reemplaza 'TU_API_KEY' por tu clave real de OpenAI
        const apiKey = 'TU_API_KEY';
        const endpoint = 'https://api.openai.com/v1/chat/completions';
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + apiKey
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        { role: 'system', content: 'Eres el asistente de Agustin Gibaut.' },
                        { role: 'user', content: prompt }
                    ],
                    max_tokens: 200,
                    temperature: 0.7
                })
            });
            const data = await response.json();
            if (data.choices && data.choices.length > 0) {
                return data.choices[0].message.content.trim();
            } else {
                return 'No se pudo obtener respuesta de la IA.';
            }
        } catch (e) {
            return 'Error al conectar con OpenAI.';
        }
    }

    // Respuestas interactivas
    async function botReply(userText) {
        const text = userText.trim().toLowerCase();
        // Menú principal
        if(['1','2','3','4'].includes(text)) {
            handleMenuOption(text);
            return;
        }
        // Enlaces directos de contacto
        if(text === 'sí' || text === 'si' || text === 'enlaces') {
            addMessage(
                'WhatsApp: https://wa.me/3512580435\nGitHub: https://github.com/AgustinGibaut\nLinkedIn: https://www.linkedin.com/in/agustin-gibaut-61baa5327/\nGmail: agusgibaut693@gmail.com', 'bot'
            );
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
            return;
        }
        // Enlaces a portfolio o github
        if(text === 'portfolio') {
            addMessage('Portfolio: https://github.com/AgustinGibaut/portfolio', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
            return;
        }
        if(text === 'github') {
            addMessage('GitHub: https://github.com/AgustinGibaut', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
            return;
        }
        // Salir
        if(text === 'salir' || text === 'exit' || text === 'cerrar') {
            addMessage('¡Hasta luego! Puedes volver a abrir el terminal cuando quieras.', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
                setTimeout(() => {
                    chatWindow.style.display = 'none';
                }, 1200);
            }, 700);
            return;
        }
        // Ayuda
        if(text === 'ayuda' || text === 'help') {
            addMessage('Opciones:\n1) Contacto\n2) Ver proyectos\n3) Sobre mí\n4) Ayuda\nO escribe "salir" para cerrar el chat.', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
            return;
        }
        // Saludo
        if(text.includes('hola')) {
            addMessage('¡Hola! Escribe un número del menú para continuar.', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
            return;
        }
        // Gracias
        if(text.includes('gracias')) {
            addMessage('¡De nada! 😊', 'bot');
            setTimeout(() => {
                addMessage(randomLinusQuote(), 'bot');
            }, 700);
            return;
        }
        // Si no es ninguna opción, pregunta a OpenAI
        addMessage('Pensando...', 'bot');
        const aiResponse = await callOpenAI(userText);
        // Reemplaza el último mensaje "Pensando..." por la respuesta real
        messages.lastChild.textContent = aiResponse;
        messages.scrollTop = messages.scrollHeight;
        sound.currentTime = 0;
        sound.play();
        setTimeout(() => {
            addMessage(randomLinusQuote(), 'bot');
        }, 700);
    }

    // Formulario de envío
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    form.onsubmit = e => {
        e.preventDefault();
        const text = input.value.trim();
        if(!text) return;
        addMessage(text, 'user');
        input.value = '';
        setTimeout(() => {
            botReply(text);
        }, 600);
    };
