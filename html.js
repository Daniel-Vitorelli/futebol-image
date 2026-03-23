export const html = (url1, url2, baseURL = '') => {
    const stadium = `${baseURL}/public/estadio.png`
    const vs = `${baseURL}/public/vs.png`
    const live = `${baseURL}/public/live.png`

    return `
    <html>
<head>
    <base href="${baseURL}/">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
</head>
<body>
    <div style="
        background-image: url('${stadium}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        height: 1350px;
        width: 1080px;
        position: relative;
    ">
    <div style="
        position: absolute;
        height: 247.2px;
        width: 1080px;
        left: 0;
        top: 183.4px;
        background: linear-gradient(to right, rgb(0, 10, 10), rgb(0, 130, 100));
        display: flex;
        justify-content: center;
        align-items: center;
    ">
        <h1 
            style="color: #e8eb28;
            font-size: 93px;
            line-height: 93px;
            text-align: center;
            font-family: 'Montserrat', sans-serif;
            margin: 0;
        ">
            Free app to watch football
        </h1>
    </div>
    <img src="${url1}" style="
        position: absolute;
        width: 369.2px;
        height: 369.2px;
        top: 478px;
        left: 10px;
        object-fit: contain;
    ">
    <img src="${vs}" style="
        position: absolute;
        width: 317.5px;
        height: 369.2px;
        top: 478px;
        left: 50%;
        transform: translateX(-50%);
    ">
    <img src="${url2}" style="
        position: absolute;
        width: 369.2px;
        height: 369.2px;
        top: 478px;
        right: 10px;
        object-fit: contain;
    ">
    <img src="${live}" style="
        position: absolute;
        width: 184.9px;
        height: 78.6px;
        top: 929.3px;
        left: 15.6px;
        object-fit: contain;
    ">
    <div style="
        position: absolute;
        height: 162px;
        width: 1080px;
        left: 0;
        top: 1038.5px;
        background: linear-gradient(to right, rgb(0, 10, 10), rgb(0, 130, 100));
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
            Download the application
        </h1>
    </div>
</div>
</body>
</html>
    `
}