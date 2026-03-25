function getEmailFromText(text: string): string | null {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/;
    const match = text.match(emailRegex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}

function getDomainFromEmail(email: string): string | null {
    const atIndex = email.indexOf("@");
    if (atIndex === -1) return null;
    return email.slice(atIndex); // e.g. "@doe.com"
}

const BUTTON_BASE_STYLE = `
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 0px 3px;
    background-color: #dbeafe;
    color: #1e40af;
    border: 1px solid #3b82f6;
    border-radius: 5px;
    font-size: 9px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.01em;
    transition: background-color 0.15s ease, box-shadow 0.15s ease;
    box-shadow: 0 1px 2px rgba(59,130,246,0.10);
    vertical-align: middle;
`.trim();

function createSearchButton(
    labelText: string,
    searchQuery: string,
): HTMLButtonElement {
    const button = document.createElement("button");

    const label = document.createElement("span");
    label.textContent = labelText;
    label.style.cssText = "pointer-events: none;";

    const icon = document.createElement("span");
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin-top:-1px"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`;
    icon.style.cssText = "pointer-events: none;";

    button.appendChild(icon);
    button.appendChild(label);
    button.style.cssText = BUTTON_BASE_STYLE;

    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#bfdbfe";
        button.style.boxShadow = "0 2px 6px rgba(59,130,246,0.18)";
    });
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#dbeafe";
        button.style.boxShadow = "0 1px 2px rgba(59,130,246,0.10)";
    });

    button.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const searchUrl = `https://mail.google.com/mail/u/0/#search/from%3A${encodeURIComponent(
            searchQuery,
        )}`;
        window.location.href = searchUrl;
    });

    return button;
}

function replaceGoSpans() {
    const spans = document.querySelectorAll("span.go");
    spans.forEach((span) => {
        // Check if already processed to avoid infinite loops or double buttons
        if (span.getAttribute("data-processed") === "true") {
            return;
        }

        const email = getEmailFromText(span.innerHTML);
        if (!email) {
            return;
        }

        const domain = getDomainFromEmail(email);

        const wrapper = document.createElement("span");
        wrapper.style.cssText =
            "display: inline-flex; align-items: center; gap: 4px; vertical-align: middle;";
        wrapper.setAttribute("data-processed", "true");

        const senderButton = createSearchButton("Search Sender", email);
        wrapper.appendChild(senderButton);

        if (domain) {
            const domainButton = createSearchButton("Search Domain", domain);
            wrapper.appendChild(domainButton);
        }

        span.replaceWith(wrapper);
    });
}

// Observer to handle dynamic loading in Gmail
const observer = new MutationObserver((mutations) => {
    let shouldRun = false;
    for (const mutation of mutations) {
        if (mutation.addedNodes.length > 0) {
            shouldRun = true;
            break;
        }
    }

    if (shouldRun) {
        replaceGoSpans();
    }
});

// Start observing
observer.observe(document.body, {
    childList: true,
    subtree: true,
});

// Initial run
replaceGoSpans();
