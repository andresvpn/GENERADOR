async function generateHTML() {
    const id = document.getElementById('id-input').value;
    const quality = document.getElementById('quality-input').value;
    const iframeUrl = document.getElementById('iframe-url-input').value;
    const languaje = "es-MX";
    const apiKey = '1f098c7d68777348425d008055475b88';

    try {
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=${languaje}`);
        
        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            const title = datos.title;
            const synopsis = datos.overview;
            const imageUrl = `https://image.tmdb.org/t/p/original/${datos.backdrop_path}`;
            const duration = convertMinutes(datos.runtime);

            const generatedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/estilosP.css">
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
    <title>VPN-MOVIE</title>
    <style type="text/css">
        #banner {
            background-image: url('${imageUrl}');
        }
    </style>
</head>
<body>
    <!-- Header -->
    <main>
        <div class="content-all">
            <header></header>
            <label>Película</label>
        </div>
    </main>

    <!-- Banner -->
    <div class="banner" id="banner">
        <div class="banner-contenedor">
            <center>
                <h1 class="banner-titulo">${title}</h1>
                <div class="botones">
                    Duración: ${duration}. <button class="hd">${quality}</button>
                </div>
                <div class="banner-sinopsis">${synopsis}</div>
            </center>
        </div>
        <div class="banner-fadeBottom"></div>
    </div>

    <br>
    <br>
    <br>
    <br>
    <br>
    <br>

    <!-- Video -->
    <div class="video-contenedor">
        <div class="video">
            <center>
                <iframe class="item-video" allowfullscreen="" frameborder="0" height="695px" id="iframe2" onload="$('.iframe-loading').css('background-image');" sandbox="allow-same-origin allow-scripts"
                    scrolling="no" src="${iframeUrl}" style="background-color: black; border-color: #fff; border-radius: 10px; border-style: solid; border-width: 2px;" width="100%"></iframe>
            </center>
        </div>
    </div>

    <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
</body>
</html>
            `;

            document.getElementById('generated-html').textContent = generatedHTML;
        } else {
            console.error('Error:', respuesta.status, respuesta.statusText);
        }
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
}

function copyToClipboard() {
    const generatedHTML = document.getElementById('generated-html').textContent;
    navigator.clipboard.writeText(generatedHTML).then(() => {
        document.getElementById('message').textContent = 'Código copiado al portapapeles';
        document.getElementById('message').style.color = 'green';
    }).catch(err => {
        document.getElementById('message').textContent = 'Error al copiar el código';
        document.getElementById('message').style.color = 'red';
        console.error('Error al copiar el código: ', err);
    });
}

function convertMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}