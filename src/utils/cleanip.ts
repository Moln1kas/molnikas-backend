export default (ip: any) => {
    return ip.startsWith('::ffff:') ? ip.substring(7) : ip;
}