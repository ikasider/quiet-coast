// Ждем полной загрузки DOM перед выполнением скриптов
document.addEventListener('DOMContentLoaded', function() {

    // ========== ПЛАВНАЯ ПРОКРУТКА ДЛЯ НАВИГАЦИИ ==========
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Отменяем стандартное поведение
            
            const targetId = this.getAttribute('href'); // Получаем ID цели
            if (targetId === '#') return; // Игнорируем пустые ссылки
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Плавная прокрутка к секции
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, targetId);
            }
        });
    });
const authBtn = document.getElementById("authButton");
const authForm = document.getElementById("authForm");
const closeButton = document.getElementById("closeButton");

authBtn.addEventListener("click", function() {
    authForm.classList.toggle("hidden");
});
closeButton.addEventListener("click", function() {
    authForm.classList.add("hidden");
});

    // ========== АНИМАЦИЯ КАРТОЧЕК УДОБСТВ ==========
    const featureCards = document.querySelectorAll('.featureszz');
    
    featureCards.forEach(card => {
        // Анимация при наведении
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        // Анимация при загрузке (последовательное появление)
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
    });

    // Запускаем анимацию карточек с задержкой
    setTimeout(() => {
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 150 * index); // Задержка для каждой карточки
        });
    }, 500);

    // ========== ФОРМА БРОНИРОВАНИЯ ==========
    const bookingForm = document.querySelector('.form form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Отменяем стандартную отправку
            
            // Получаем значения полей
            const formData = {
                name: this.querySelector('#fio').value,
                phone: this.querySelector('#phone').value,
                email: this.querySelector('#email').value,
                date: this.querySelector('#date').value,
                tariff: this.querySelector('#tariff').value
            };
            
            // Валидация
            if (!formData.name || !formData.phone || !formData.date) {
                showAlert('Пожалуйста, заполните все обязательные поля!', 'error');
                return;
            }
            
            // Здесь обычно отправка на сервер, но для примера просто покажем сообщение
            showAlert('Бронирование успешно отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Очищаем форму
            this.reset();
            
            // Можно добавить отправку данных на сервер через fetch()
            // sendDataToServer(formData);
        });
    }

    // ========== ТАЙМЕР ДЛЯ АКЦИИ ==========
    const discountSection = document.querySelector('.discount');
    
    if (discountSection) {
        // Устанавливаем дату окончания акции (через 7 дней от текущей даты)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);
        
        function updateTimer() {
            const now = new Date();
            const diff = endDate - now;
            
            if (diff <= 0) {
                discountSection.innerHTML = '<h2>Акция завершена!</h2>';
                return;
            }
            
            // Рассчитываем оставшееся время
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // Обновляем содержимое
            discountSection.innerHTML = `
            <h2>Скидка 15% на все услуги!</h2>
            <p>До конца акции осталось: ${days}д ${hours}ч ${minutes}м ${seconds}с</p>`;
        }
        
        // Обновляем таймер каждую секунду
        updateTimer();
        setInterval(updateTimer, 1000);
    }

    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert ${type}`;
        alertDiv.textContent = message;
        
        // Стилизуем уведомление
        alertDiv.style.position = 'fixed';
        alertDiv.style.top = '20px';
        alertDiv.style.right = '20px';
        alertDiv.style.padding = '15px 25px';
        alertDiv.style.borderRadius = '5px';
        alertDiv.style.color = 'white';
        alertDiv.style.zIndex = '1000';
        alertDiv.style.opacity = '0';
        alertDiv.style.transition = 'opacity 0.3s';
        
        if (type === 'error') {
            alertDiv.style.backgroundColor = '#e74c3c';
        } else {
            alertDiv.style.backgroundColor = '#2ecc71';
        }
        
        document.body.appendChild(alertDiv);
        
        // Плавное появление
        setTimeout(() => {
            alertDiv.style.opacity = '1';
        }, 10);
        
        // Автоматическое исчезновение через 5 секунд
        setTimeout(() => {
            alertDiv.style.opacity = '0';
            setTimeout(() => {
                alertDiv.remove();
            }, 300);
        }, 5000);
    }
    
    // Для демонстрации - функция отправки данных на сервер
    function sendDataToServer(data) {
        fetch('/api/booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            showAlert('Бронирование успешно сохранено!', 'success');
        })
        .catch(error => {
            showAlert('Ошибка при отправке данных. Попробуйте позже.', 'error');
        });
    }
}); 