document.getElementById('generateLinks').addEventListener('click', function() {
    const input = document.getElementById('domainInput').value;
    const domains = input.split('\n').map(domain => domain.trim()).filter(domain => domain);
    const outputContainer = document.getElementById('outputLinks');
    outputContainer.innerHTML = '';

    domains.forEach(domain => {
        const encodedDomain = encodeURIComponent(`site:${domain}`);
        const link = `https://news.google.com/search?q=${encodedDomain}&hl=en-IN&gl=IN&ceid=IN%3Aen`;
        
        const linkContainer = document.createElement('div');
        linkContainer.className = 'link-container';
        
        const linkText = document.createElement('div');
        linkText.className = 'link-text';
        linkText.textContent = link;
        
        const openButton = document.createElement('button');
        openButton.className = 'open-button';
        openButton.textContent = 'OPEN';
        openButton.onclick = function() {
            window.open(link, '_blank');
        };
        
        linkContainer.appendChild(linkText);
        linkContainer.appendChild(openButton);
        outputContainer.appendChild(linkContainer);
    });
});

document.getElementById('clearAll').addEventListener('click', function() {
    document.getElementById('domainInput').value = '';
    document.getElementById('outputLinks').innerHTML = '';
});

document.getElementById('copyLinks').addEventListener('click', function() {
    const links = Array.from(document.querySelectorAll('.link-text'))
        .map(el => el.textContent)
        .join('\n');
    
    navigator.clipboard.writeText(links).then(() => {
        alert('Links copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
});

document.getElementById('openAll').addEventListener('click', function() {
    const links = Array.from(document.querySelectorAll('.link-text')).map(el => el.textContent);
    
    if (links.length > 0) {
        if (confirm(`This will open ${links.length} tab(s). Do you want to continue?`)) {
            links.forEach(link => {
                const a = document.createElement('a');
                a.href = link;
                a.target = '_blank';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        }
    } else {
        alert('No links to open.');
    }
});