document.addEventListener('DOMContentLoaded', () => {

    // --- 1. ПОИСК НАЦИОНАЛЬНЫХ ДУХОВ ---
    const searchInput = document.getElementById('spiritSearch');
    const spiritList = document.getElementById('spiritList');
    const spiritCount = document.getElementById('spiritCount');
    const spiritEmpty = document.getElementById('spiritEmpty');

    // Запускаем поиск только если мы на странице мира (где есть эти элементы)
    if (searchInput && spiritList) {
        const spirits = Array.from(spiritList.querySelectorAll('.spirit'));

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

            if (spiritCount) spiritCount.textContent = `Найдено: ${visibleCount}`;
            if (spiritEmpty) spiritEmpty.hidden = visibleCount > 0;
        };

        searchInput.addEventListener('input', (e) => {
            filterSpirits(e.target.value.toLowerCase().trim());
        });

        filterSpirits(''); // Начальная инициализация
    }

    // --- 2. КОПИРОВАНИЕ IP (Работает на любой странице) ---
    document.addEventListener('click', (e) => {
        // Проверяем, нажали ли мы на кнопку с атрибутом data-copy-ip
        if (e.target && e.target.hasAttribute('data-copy-ip')) {
            const btn = e.target;
            // Ищем текст IP на странице
            const ipElement = document.querySelector('.server-ip');

            if (!ipElement) {
                alert('Ошибка: текст IP (.server-ip) не найден на странице');
                return;
            }

            const ipText = ipElement.textContent.trim();

            navigator.clipboard.writeText(ipText).then(() => {
                const originalText = btn.textContent;
                btn.textContent = 'Скопировано!';
                btn.style.background = 'var(--lime)';
                btn.style.color = '#000';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 2000);
            }).catch(err => {
                alert('Ошибка копирования: ' + err);
            });
        }
    });
});