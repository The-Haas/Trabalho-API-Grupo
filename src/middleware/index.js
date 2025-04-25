const logMonitor = (req) => {
    const horario = new Date().toLocaleString();
    const rota = req.originalUrl;
    const query = JSON.stringify(req.query);
    const body = JSON.stringify(req.body);
    let ip = req.ip || req.connection.remoteAddress;

    if (ip && ip.startsWith('::ffff:')) {
        ip = ip.replace('::ffff:', '');
    }

    const userAgent = req.headers['user-agent'];
    let dispositivo = 'Desconhecido';
    if (userAgent) {
        if (userAgent.includes('iPhone')) {
            dispositivo = 'iPhone';
        } else if (userAgent.includes('Android')) {
            dispositivo = 'Android';
        } else if (userAgent.includes('Windows NT')) {
            dispositivo = 'Windows';
        } else if (userAgent.includes('Macintosh')) {
            dispositivo = 'Mac';
        }
    }

    console.log('--------------------------------');
    console.log(`[LOG ${horario}]`);
    console.log(`→ Rota: ${rota}`);
    console.log(`→ Query Params: ${query}`);
    console.log(`→ Body: ${body}`);
    console.log(`→ IP: ${ip}`);
    console.log(`→ Dispositivo: ${dispositivo}`);
};

module.exports = {
    logMonitor,
};