export default function isPhone() {
    return matchMedia("(max-width:1024px)").matches;
}
