const iplocate = require("node-iplocate");
export const getLocation = async (ipv4: string) => {
    if (ipv4) {
        const data = await iplocate(ipv4)
        return data;
    }
}