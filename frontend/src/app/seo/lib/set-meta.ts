export function setMeta(name: string, content: string) {
    let el = document.querySelector<HTMLMetaElement>(
        `meta[name="${name}"], meta[property="${name}"]`,
    );

    if (!el) {
        el = document.createElement("meta");

        if (name.startsWith("og:")) {
            el.setAttribute("property", name);
        } else {
            el.setAttribute("name", name);
        }

        document.head.appendChild(el);
    }

    el.content = content;
}
