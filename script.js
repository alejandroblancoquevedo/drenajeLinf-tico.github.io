// Temporizador de escasez profesional con memoria de sesión (15 minutos)
const MINUTOS_TOTALES = 15;
const TIEMPO_EN_SEGUNDOS = MINUTOS_TOTALES * 60;

const minutosDisplay = document.getElementById('minutos');
const segundosDisplay = document.getElementById('segundos');

function iniciarTemporizador() {
    // Verificar si ya existe un tiempo guardado en el navegador del usuario
    let tiempoRestante = localStorage.getItem('drenaje_timer');

    if (tiempoRestante === null) {
        // Si es la primera vez que entra, iniciamos desde 15 minutos
        tiempoRestante = TIEMPO_EN_SEGUNDOS;
        localStorage.setItem('drenaje_timer', tiempoRestante);
    } else {
        tiempoRestante = parseInt(tiempoRestante, 10);
    }

    const cuentaRegresiva = setInterval(() => {
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;

        // Formato estético: añadir cero a la izquierda si es menor a 10
        minutos = minutos < 10 ? '0' + minutos : minutos;
        segundos = segundos < 10 ? '0' + segundos : segundos;

        // Inyectar de forma segura en el DOM
        if (minutosDisplay && segundosDisplay) {
            minutosDisplay.textContent = minutos;
            segundosDisplay.textContent = segundos;
        }

        // Lógica de reducción y reinicio automático
        if (tiempoRestante <= 0) {
            tiempoRestante = TIEMPO_EN_SEGUNDOS; 
            localStorage.setItem('drenaje_timer', tiempoRestante);
        } else {
            tiempoRestante--;
            localStorage.setItem('drenaje_timer', tiempoRestante);
        }
    }, 1000);
}

// Iniciar de forma segura cuando todo el DOM esté perfectamente cargado
document.addEventListener('DOMContentLoaded', () => {
    iniciarTemporizador();
});