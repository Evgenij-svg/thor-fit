export function BtnBig(text, callback) {
    const btn = document.createElement('button')
    btn.innerText = text
    btn.className = 'bigBtn'
    btn.onclick = callback
    return btn
}