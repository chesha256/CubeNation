

document.addEventListener('DOMContentLoaded', () => {

    const searchInput = document.getElementById('spiritSearch');
    const spiritList = document.getElementById('spiritList');
    const spiritCount = document.getElementById('spiritCount');
    const spiritEmpty = document.getElementById('spiritEmpty');

    if (!searchInput || !spiritList) return;

   
    const spirits = Array.from(spiritList.querySelectorAll('.spirit'));

    /**
      @param {string} 
     */
    const filterSpirits = (query) => {
        let visibleCount = 0;

        spirits.forEach(spirit => {
        
            const name = spirit.querySelector('h3')?.textContent.toLowerCase() || '';
            const country = spirit.querySelector('.country')?.textContent.toLowerCase() || '';

            if (name.includes(query) || country.includes(query)) {
                spirit.style.display = 'block';
                visibleCount++;
            } else {
                spirit.style.display = 'none';
            }
        });

     
        if (spiritCount) {
            spiritCount.textContent = `Найдено: ${visibleCount}`;
        }

        if (spiritEmpty) {
            spiritEmpty.hidden = visibleCount > 0;
        }
    };


    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        filterSpirits(query);
    });


    filterSpirits('');


    const copyBtn = document.querySelector('[data-copy-ip]');
    const ipText = document.querySelector('.server-ip');

    if (copyBtn && ipText) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(ipText.textContent.trim());


                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Скопировано!';
                copyBtn.style.background = 'var(--lime)';

                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            } catch (err) {
                console.error('Ошибка при копировании IP:', err);
                alert('Не удалось скопировать IP');
            }
        });
    }
});