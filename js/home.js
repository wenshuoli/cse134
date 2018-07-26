window.onload = function () {
    var popup = document.getElementById('resolve-btn');
    if (popup) {
        popup.addEventListener('click', function () {
            if (this.classList.contains('hidden')) {
                this.classList.remove('hidden');
                this.classList.add('fadein');
            }
        });
    }
}