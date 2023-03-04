
export function copyToClipboard(data, e) {
    const btnEl = e.target;
    const textArea = document.createElement('textarea');
    textArea.value = data;
    textArea.style.position = 'fixed'; // avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
        btnEl.innerText = 'Copied';
        setTimeout(() => {
            btnEl.innerText = 'Copy';
        }, 5000);
    } catch (err) {
        console.error('Unable to copy', err); // eslint-disable-line no-console
    }
    document.body.removeChild(textArea);
}
