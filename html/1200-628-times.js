export const template_1200_628_times = ({
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
</head>
<body style="margin: 0; padding: 0;">
    <div style="
        background-image: url('${fundo}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 628px;
        width: 1200px;
        position: relative;
    ">
    <div style="
        position: absolute;
        height: 202.7px;
        width: 1200px;
        left: 0;
        top: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    ">
        <h1 
            style="color: #e8eb28;
            font-size: 73.7px;
            line-height: 73.7px;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            margin: 0;
        ">
            ${texto1 || "Free app to watch football"}
        </h1>
    </div>
    <img src="${url1}" style="
        position: absolute;
        width: 196px;
        height: 196px;
        top: 216px;
        left: 328.5px;
        object-fit: contain;
    ">
    <img src="${url2}" style="
        position: absolute;
        width: 196px;
        height: 196px;
        top: 216px;
        left: 675.6px;
        object-fit: contain;
    ">
    <div style="
        position: absolute;
        height: 130.2px;
        width: 1200px;
        left: 0;
        top: 497.8px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    ">
        <h1 
            style="color: #e8eb28;
            font-size: 70.4px;
            line-height: 70.4px;
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