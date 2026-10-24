document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsItems = document.querySelectorAll('.news-item');

    if(filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Quitar estilos activos
                filterBtns.forEach(b => {
                    b.classList.remove('bg-uno-blue', 'text-white', 'shadow-md');
                    b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200');
                });

                // Activar botón clickeado
                btn.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200');
                btn.classList.add('bg-uno-blue', 'text-white', 'shadow-md');

                // Filtrar
                const filterValue = btn.getAttribute('data-filter');
                newsItems.forEach(item => {
                    item.classList.remove('animate-fadeIn');
                    if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('animate-fadeIn'), 10);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
});