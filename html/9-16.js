export const template_9_16 = ({
    url1,
    url2,
    fundo,
    texto1,
    texto2,
}) => {

    return `
<html>
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
    <style>
        /* Força a renderização mais nítida possível */
        img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
            transform-style: preserve-3d;
            backface-visibility: hidden;
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <div style="
        background-image: url('${fundo}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 1920px;
        width: 1080px;
        position: relative;
    ">
    <div style="
        position: absolute;
        height: 247px;
        width: 1080px;
        left: 0;
        top: 310px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    ">
        <h1 
            style="color: #e8eb28;
            font-size: ${texto1.length > 40 ? '80px' : '93px'};
            line-height: ${texto1.length > 40 ? '80px' : '93px'};
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            margin: 0;
        ">
            ${texto1 || "Free app to watch football"}
        </h1>
    </div>
    <img src="${url1}" style="
        position: absolute;
        width: 370px;
        height: 370px;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        object-fit: contain;
    ">
    <img src="${url2}" style="
        position: absolute;
        width: 370px;
        height: 370px;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
        object-fit: contain;
    ">
    <div style="
        position: absolute;
        height: 162px;
        width: 1080px;
        left: 0;
        top: 1550px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    ">
        <h1 
            style="color: #e8eb28;
            font-size: 70px;
            line-height: 70px;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            margin: 0;
        ">
            ${texto2 || "Download the application"}
        </h1>
    </div>
</div>
</body>
</html>
    `
}