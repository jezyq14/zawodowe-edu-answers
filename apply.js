(function () {
    const SELECTOR = 'meta[itemprop="isCorrect"][content=true]+button span';

    function $(selector) {
        return document.querySelector(selector);
    }

    function highlightSecondLetter(element) {
        const text = element.innerText;
        if (text.length < 2) return;

        const updatedText =
            text[0] +
            `<span style="font-weight: 700;">${text[1]}</span>` +
            text.slice(2);

        element.innerHTML = updatedText;
    }

    function modifyPage() {
        const correctAnswer = $(SELECTOR);
        if (correctAnswer) {
            highlightSecondLetter(correctAnswer);
        }
    }

    function waitForElementAndModify() {
        const interval = setInterval(() => {
            const correctAnswer = $(SELECTOR);
            if (correctAnswer) {
                clearInterval(interval);
                modifyPage();
            }
        }, 50);
    }

    let lastUrl = location.href;

    const observer = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            waitForElementAndModify();
        }
    });

    observer.observe(document, { subtree: true, childList: true });

    waitForElementAndModify();
})();
