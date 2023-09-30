export default function isPhone() {
    if (typeof matchMedia === "undefined") {
        return false;
    }
    return matchMedia("(max-width:1024px)").matches;
}
