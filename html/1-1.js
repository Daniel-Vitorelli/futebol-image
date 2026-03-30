export const template_1_1 = ({
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
        height: 1080px;
        width: 1080px;
        position: relative;
    ">
    <div style="
        position: absolute;
        height: 247.2px;
        width: 1080px;
        left: 0;
        top: 30px;
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
        width: 369.2px;
        height: 369.2px;
        top: 50%;
        transform: translateY(-50%);
        left: 10px;
        object-fit: contain;
    ">
    <img src="${url2}" style="
        position: absolute;
        width: 369.2px;
        height: 369.2px;
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
        bottom: 30px;
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